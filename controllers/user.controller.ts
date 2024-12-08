import  { Express } from "express";
import "dotenv/config";
import UserValidator from "../validators/user.validator";
import LoginController from './user/login.controller';
import LogoutController from './user/logout.controller';
import IsLoginController from "./user/isLogin.controller";
import GetUserDataController from "./user/getUserData.controller";
import getAllUsersController from "./user/getAllUsers.controller";

const router : Express = require("express").Router();

router.post('/login', [...UserValidator], LoginController);
router.get('/logout', LogoutController);
router.get("/islogin", IsLoginController);
router.get("/getUserData", GetUserDataController);
router.get("/getAllUsers", getAllUsersController);


export default router;