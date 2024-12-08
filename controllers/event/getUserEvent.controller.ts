import { Request, Response } from 'express';
import { Op, Sequelize, Transaction } from 'sequelize';
import { Event } from '../../models/event.model';
import { EventToUser } from '../../models/eventToUser.model';
import DatabaseSingleton from '../../database/database';

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;

const getUserEventController =  async (req: Request, res: Response) : Promise<void> => {
    try {
        const transaction: Transaction = await sequelize.transaction();
        const eventsToUser : EventToUser[] = (await EventToUser.findAll({
            where: { userId: req.cookies.login },
            attributes: ['eventId', 'cancelled'],
            transaction
        }))
        const eventIds : number[] = eventsToUser.map(eventToUser => eventToUser.eventId);
        const firstDay = new Date(req.query.firstDay as string);
        const lastDay = new Date(req.query.lastDay as string);
        const events : Event[] = await Event.findAll({
            where: { id: { [Op.in]: eventIds }, date: { [Op.between]: [firstDay, lastDay] } },
            order: [['time_from', 'ASC'], ['time_to', 'ASC'], ['date', 'ASC']],
            transaction
        });

        const eventsWithCancelled = events.map(event => {
            const eventToUser = eventsToUser.find(eventToUser => eventToUser.eventId === event.id);
            return { ...event.dataValues, cancelled: eventToUser?.cancelled };
        });

        await transaction.commit();
        res.send(eventsWithCancelled);
    } catch (error) {
        res.status(500).json({ status: false });
    }
  return;
}

export default getUserEventController;