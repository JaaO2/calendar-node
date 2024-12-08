import { Request, Response } from "express";
import { User } from "../../models/user.model";

const GetUserDataController = async (req : Request, res : Response) : Promise<void> => {
    if (req.cookies.login) {
       const user : User = await User.findOne({ where: { id: req.cookies.login } });
       res.status(200).json({id: user.id, username: user.username});
       return;
    }
  }

export default GetUserDataController;;