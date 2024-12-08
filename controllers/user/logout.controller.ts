import { Request, Response } from "express";

const logoutController = async (req: Request, res: Response) : Promise<void> => {
    res.clearCookie("login", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.send(true);
    return
  }
  
export default logoutController