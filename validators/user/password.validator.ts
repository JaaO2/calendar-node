import { body, ValidationChain } from "express-validator";
import { User } from "../../models/user.model";

const passwordValidator : ValidationChain = body("password")
    .custom(async (value : string) : Promise<void> => {
        if (!value || !value.length) throw Error("Hasło jest wymagane");
    })
    .withMessage("Hasło jest wymagane")

    .custom(async (value, { req }) => {
        const user : User = await User.findOne({ where: { username: req.body.username } });
        if (user) {
            const checkPassword  : boolean = await user.checkPassword(value);
            if (!checkPassword) throw Error("Podane hasło jest nieprawidłowe");
        }
    })
    .withMessage("Podane hasło jest nieprawidłowe");

export default passwordValidator;