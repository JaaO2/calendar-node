import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Sequelize, Transaction } from "sequelize";
import { Event } from "../../models/event.model";
import { EventToUser } from "../../models/eventToUser.model";
import DatabaseSingleton from "../../database/database";

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;

const addEventController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const data : { 
        eventName: string,
        description: string,
        date: Date, 
        time_from: Date, 
        time_to: Date, 
        persons: number[] 
    } = req.body;
    
    const {
        eventName, 
        description, 
        date, 
        time_from, 
        time_to, 
        persons
    } = data as { 
        eventName: string,
        description: string, 
        date: Date, 
        time_from: Date, 
        time_to: Date, 
        persons: number[] 
    };

    const userId : number = req.cookies.login;
    
    const transaction: Transaction = await sequelize.transaction();
    try {
        const event = await Event.create({
            eventName,
            description,
            date,
            time_from,
            time_to,
            userId
        }, { transaction });

        await EventToUser.bulkCreate(
            persons.map((personId: number) => ({
                eventId: event.id,
                userId: personId
            })),
            { transaction }
        );

        await transaction.commit();
        res.status(200).json({ status: true });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: false });
    }
}

export default addEventController;