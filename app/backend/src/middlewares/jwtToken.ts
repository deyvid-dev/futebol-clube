import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/UserInterface';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const result = jwt.verify(token, SECRET) as jwt.JwtPayload;
    req.body = { role: result.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const tokenGenerate = async (payload: IUser) => {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '3d',
  });
  return token;
};

const matchValidateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const result = jwt.verify(token as string, SECRET) as jwt.JwtPayload;
    req.body.user = result;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export {
  tokenMiddleware,
  tokenGenerate,
  matchValidateToken,
};
