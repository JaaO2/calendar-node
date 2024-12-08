import { body, ValidationChain } from "express-validator";

const dateValidator : ValidationChain =  body("date")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Data wydarzenia jest wymagana");
    })
    .withMessage("Data wydarzenia jest wymagana")
    .custom(async (value, { req }) => {
        const date : Date = new Date(value);
        const today : Date = new Date();
        today.setHours(0,0,0,0);
        if (date < today) throw Error("Nie można dodawać wydarzenia z przeszłości");
    })
    .withMessage("Nie można dodawać wydarzenia z przeszłości");

export default dateValidator;