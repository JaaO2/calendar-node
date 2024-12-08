import { Request, Response } from "express";

const isLogin = async (req : Request, res : Response) : Promise<void> => {
    if (req.cookies.login) {
       res.send({ result: true });
       return;
    } else {
       res.send({ result: false });
       return;
    }
  }

export default isLogin;