import {Request, Response} from "express";
import {User} from "../../models/user.model";

const getAllUsersController = async (req: Request, res: Response) : Promise<void> => {
    const users : User[] = await User.findAll({ attributes: ['id', 'username', 'description'] });
    res.send(users);
    return;
  }

export default getAllUsersController;