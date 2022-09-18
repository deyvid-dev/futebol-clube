import { Request, Response, NextFunction } from 'express';
import LeaderService from '../services/leaderService';

class LeaderController {
  public leaderH = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result: never | any = await LeaderService.leaderHome();
      return res.status(200).json(result[0]);
    } catch (e) {
      next(e);
    }
  };

  public leaderA = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result: never | any = await LeaderService.leaderAway();
      return res.status(200).json(result[0]);
    } catch (e) {
      next(e);
    }
  };
}

export default LeaderController;
