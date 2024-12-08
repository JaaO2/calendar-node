import {ValidationChain } from "express-validator";
import usernameValidator from "./user/username.validator";
import passwordValidator from "./user/password.validator";

const UserValidator : ValidationChain[] = [
  usernameValidator,
  passwordValidator
];

export default UserValidator;

