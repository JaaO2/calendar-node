import  { Express} from "express";
import {  Sequelize } from "sequelize";
import DatabaseSingleton from "../database/database";
import "dotenv/config";
import EventValidator from "../validators/event.validator";
import addEventController from "./event/addEvent.controller";
import getUserEventController from "./event/getUserEvent.controller";
import getEventController from "./event/getEvent.controller";
import cancelEventController from "./event/cancelEvent.controller";
import recancelEventController from "./event/recancelEvent.controller";
import editEventController from "./event/editEvent.controller";
import deleteEventController from "./event/deleteEvent.controller";

const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;
const router : Express = require("express").Router();

router.post("/addEvent", [...EventValidator], addEventController);
router.get('/getUserEvents', getUserEventController);
router.get('/getEvent', getEventController)
router.post('/cancelEvent', cancelEventController);
router.post('/recancelEvent', recancelEventController);
router.patch('/editEvent', [...EventValidator], editEventController);
router.delete('/deleteEvent', deleteEventController);


export default router;