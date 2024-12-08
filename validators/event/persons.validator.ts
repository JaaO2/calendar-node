import { body, ValidationChain } from "express-validator";

const personsValidator : ValidationChain =  body("persons")
    .custom(async (value : number[]) : Promise<void> => {
        if (!value || !value.length) throw Error("Lista osób jest wymagana");
    })
    .withMessage("Lista osób jest wymagana");

export default personsValidator;