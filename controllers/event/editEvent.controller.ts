import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {  Sequelize, Transaction } from "sequelize";
import { Event } from "../../models/event.model";
import { EventToUser } from "../../models/eventToUser.model";
import DatabaseSingleton from "../../database/database";

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;
const editEventController = async (req: Request, res: Response) : Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const data : { 
        id: number,
        eventName: string,
        description: string, 
        date: Date, 
        time_from: Date, 
        time_to: Date, 
        persons: number[] 
    } = req.body;


    const {
        id, 
        eventName, 
        description, 
        date, 
        time_from, 
        time_to, 
        persons
    } = data as {
        id: number,
        eventName: string,
        description: string, 
        date: Date, 
        time_from: Date, 
        time_to: Date,
        persons: number[]
    }

    const transaction: Transaction = await sequelize.transaction();
    try {
    const event : Event = await Event.findOne({ where: { id: id }, transaction });
    await event.update({eventName: eventName, description: description, date: date, time_from: time_from, time_to: time_to}, { transaction });
    await EventToUser.destroy({ where: { eventId: id }, transaction });
    await EventToUser.bulkCreate(
        persons.map((person: number) => ({
            eventId: id,
            userId: person
        })),
        { transaction }
    )
    await transaction.commit();
    res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({ status: false });
    }
    return;
}

export default editEventController;