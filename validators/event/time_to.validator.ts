import { body, ValidationChain } from "express-validator";

const timeToValidator : ValidationChain =  body("time_to")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Czas zakończenia wydarzenia jest wymagany");
    })
    .withMessage("Czas zakończenia wydarzenia jest wymagany")
    .custom(async (value, { req }) => {
        const now : Date = new Date();
        const date_to : Date = new Date(req.body.date + " " + value);
        if (date_to.getTime() < now.getTime()) throw Error("Czas zakończenia wydarzenia jest mniejszy od aktualnego czasu");
    })
    .withMessage("Czas zakończenia wydarzenia jest mniejszy od aktualnego czasu");

export default timeToValidator;