import express, {Express, Request, Response} from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import cookieParser from "cookie-parser";
import DatabaseSingleton from "./database/database";
import UserController from "./controllers/user.controller";
import EventController from "./controllers/event.controller";
import 'dotenv/config';

const app : Express = express();
const port : number = Number(process.env.PORT);
const sequelize : Sequelize = DatabaseSingleton.getInstance().connection;

const synchronizeModels : any = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("Wszystkie modele zostały zsynchronizowane");
    } catch (error) {
        console.error(`Błąd synchronizacji modeli ${error}`);
    }
}
synchronizeModels();

const corsOptions = {
    origin: ["http://localhost:3000", "https://calendar-react.test"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization,Access-Control-Allow-Origin",
  };
  
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  

app.use('/user', UserController);
app.use('/event', EventController);

app.listen(port, () => {
    console.log(`Serwer został uruchomiony na porcie ${port}`);
})

