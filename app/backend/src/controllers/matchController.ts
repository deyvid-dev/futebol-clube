import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await MatchService.getAll();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default MatchController;
