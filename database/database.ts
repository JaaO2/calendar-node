import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';
import { User } from "../models/user.model";
import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";

class DatabaseSingleton {
    static instance : DatabaseSingleton;
    static retry : number = 1;
    connection !: Sequelize;

    constructor() {
        if (DatabaseSingleton.instance) return DatabaseSingleton.instance;

        this._initializeConnection();
        DatabaseSingleton.instance = this;

        return DatabaseSingleton.instance;
    }


    _initializeConnection() : void {
        const DATABASE_NAME : string = process.env.DATABASE_NAME  || 'calendar';
        const DATABASE_USER : string | undefined = process.env.DATABASE_USER;
        const DATABASE_PASSWORD : string | undefined = process.env.DATABASE_PASSWORD;
        const DATABASE_HOST : string | undefined = process.env.DATABASE_HOST;
        const DATABASE_PORT : number = Number(process.env.DATABASE_PORT) || 3306;
        const TIMEZONE : string | undefined= process.env.TIMEZONE; 

        if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST) throw new Error('Nie można zainicjalizować połączenia z bazą danych bez odpowiednich zmiennych środowiskowych');

        this.connection = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            dialect: 'mysql',
            timezone: TIMEZONE,
            models: [User, Event, EventToUser] 
        });

        this.connection.authenticate()
        .then(() => console.log("Połączenie z bazą danych zostało pomyślnie ustawione."))
        .catch(error => {
            console.error(`Nie można poączyć się z bazą danych: ${error.message}`)
            
            if (DatabaseSingleton.retry <= 5) {
                console.error(`Ponowna próba łączenia z bazą danych #${DatabaseSingleton.retry}`);
                setTimeout(() => {
                    DatabaseSingleton.retry++;
                    this._initializeConnection();
                }, 1500);
            }

            if (DatabaseSingleton.retry === 5) {
                console.error("Nie udało się połączyć z bazą danych podczas 5 prób");
                process.exit();
            }
        })

    }

    static getInstance() : DatabaseSingleton {
        return DatabaseSingleton.instance ? DatabaseSingleton.instance : new DatabaseSingleton();
    }
}

export default DatabaseSingleton;