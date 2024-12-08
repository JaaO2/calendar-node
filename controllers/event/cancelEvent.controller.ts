import { Request, Response } from "express";
import { Sequelize, Transaction } from "sequelize";
import { EventToUser } from "../../models/eventToUser.model";
import DatabaseSingleton from "../../database/database";

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;
const cancelEventController = async (req: Request, res: Response) : Promise<void> => {
    const id = req.body.id;
    const transaction: Transaction = await sequelize.transaction();
    const eventToUser : EventToUser = await EventToUser.findOne({
        where: { eventId: id, userId: req.cookies.login },
        transaction
    });
    eventToUser.cancelled = true;
    await eventToUser.save();
    await transaction.commit();
    res.status(200).json({ status: true });
    return;
}

export default cancelEventController