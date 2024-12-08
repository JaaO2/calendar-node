import { body, ValidationChain } from "express-validator";

const usernameValidator : ValidationChain = body("username")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Nazwa użytkownika jest wymagana");
    })
    .withMessage("Nazwa użytkownika jest wymagana");

export default usernameValidator;