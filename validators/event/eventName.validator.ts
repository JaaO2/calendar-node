import { body, ValidationChain } from "express-validator";

const eventNameValidator : ValidationChain = body("eventName")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Nazwa wydarzenia jest wymagana");
    })
    .withMessage("Nazwa wydarzenia jest wymagana");

export default eventNameValidator;