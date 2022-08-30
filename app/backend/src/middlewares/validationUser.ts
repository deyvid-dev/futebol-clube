import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  if (!bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateUser;
