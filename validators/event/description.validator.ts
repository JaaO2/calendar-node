import {body, ValidationChain} from "express-validator";

const descriptionValidator : ValidationChain =  body("description")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Opis wydarzenia jest wymagany");
    })
    .withMessage("Opis wydarzenia jest wymagany");

export default descriptionValidator;