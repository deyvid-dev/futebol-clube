import { Request, Response } from 'express';
import loginService from '../services/loginService';

class LoginController {
  static login = async (req: Request, res: Response) => {
    const user = await loginService(req.body);
    // console.log(user);
    return res.status(200).json(user);
  };

  static role = async (req: Request, res: Response) => {
    const { role } = req.body;
    return res.status(200).json({ role });
  };
}

export default LoginController;
