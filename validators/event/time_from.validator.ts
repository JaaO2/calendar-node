import { body, ValidationChain } from "express-validator";

const timeFromValidator : ValidationChain = body("time_from")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Czas rozpoczęcia wydarzenia jest wymagany");
    })
    .withMessage("Czas rozpoczęcia wydarzenia jest wymagany")
    .custom(async (value, { req }) => {
        const date_from : Date = new Date(req.body.date + " " + value);
        const date_to : Date = new Date(req.body.date + " " + req.body.time_to);
        if (date_to.getTime() < date_from.getTime()) throw Error("Czas zakończenia wydarzenia jest mniejszy od czasu rozpoczęcia");
    })
    .withMessage("Czas zakończenia wydarzenia jest mniejszy od czasu rozpoczęcia")
    .custom(async (value, { req }) => {
        const now : Date = new Date();
        const date_from : Date = new Date(req.body.date + " " + value);
        if (date_from.getTime() < now.getTime()) throw Error("Czas rozpoczęcia wydarzenia jest mniejszy od aktualnego czasu");
    })
    .withMessage("Czas rozpoczęcia wydarzenia jest mniejszy od aktualnego czasu");;

export default timeFromValidator;