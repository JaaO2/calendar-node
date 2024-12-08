import  {Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../../models/user.model";


const LoginController = async (req: Request, res: Response) : Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }
  
    let user : User = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      user = await User.create({ username: req.body.username, password: req.body.password, description: "Nowy pracownik"});
    }
  
    user.password = undefined;
  
    res.cookie("login", user.id, {
      maxAge: 3600 * 1000 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  
    res.send(true)
     return;
  };  
  
  export default LoginController;
