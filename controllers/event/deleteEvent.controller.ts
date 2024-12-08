import { Request, Response } from "express";
import { Event } from "../../models/event.model";
import { User } from "../../models/user.model";
import { EventToUser } from "../../models/eventToUser.model";
import {  Sequelize, Transaction } from "sequelize";
import DatabaseSingleton from "../../database/database";

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;
const deleteEventController = async (req: Request, res: Response) : Promise<void> => {
    const id = req.body.id;

    if (!req.cookies.login) {
        res.status(401).json({ status: false });
        return;
    }

    const event = await Event.findOne({ where: { id: id }, include: [{ model: User, attributes: ['id'] }] });

    if (Number(event?.user?.id) !== Number(req.cookies.login)) {
        res.status(401).json({ status: false });
        return;
    }

    const transaction: Transaction = await sequelize.transaction();
    await EventToUser.destroy({ where: { eventId: id }, transaction });
    await Event.destroy({ where: { id }, transaction });
    await transaction.commit();
    res.status(200).json({ status: true });
    return;
}

export default deleteEventController;