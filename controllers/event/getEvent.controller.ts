import { Request, Response } from 'express';
import { Op, Sequelize, Transaction } from 'sequelize';
import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventToUser } from '../../models/eventToUser.model';
import DatabaseSingleton from '../../database/database';

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;

const getEvent = async (req: Request, res: Response) : Promise<void> => {
    const transaction: Transaction = await sequelize.transaction();
    const event : Event = await Event.findOne({
        where: { id: req.query.id },
        include: [{
            model: User,
            attributes: ['id', 'username', 'description']
        }],
        transaction
    });

    const eventToUsers : EventToUser[] = (await EventToUser.findAll({
        where: { eventId: event.id },
        attributes: ['userId', 'cancelled'],
        transaction
    }));

    const personsIDs : number[] = eventToUsers.map(eventToUser => eventToUser.userId);
    
    const persons : User[] = await User.findAll({
        where: { id: { [Op.in]: personsIDs } },
        attributes: ['id', 'username', 'description'],
        transaction
    })

    const personsWithCancelled = persons.map(person => {
        const eventToUser = eventToUsers.find(eventToUser => eventToUser.userId === person.id);
        return { ...person.dataValues, cancelled: eventToUser?.cancelled };
    });

    const cancelled : boolean = personsWithCancelled.find(person => Number(person.id) === Number(req.cookies.login))?.cancelled;

    await transaction.commit();
    const response = {...event.dataValues, cancelled: cancelled, persons: personsWithCancelled || []};
    res.send(response);
  return;
}


export default getEvent;