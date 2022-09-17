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

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CMatch = req.body;

      const matchs = await MatchService.create(CMatch);
      return res.status(201).json(matchs);
    } catch (e) {
      next(e);
    }
  };

  public finish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await MatchService.finish(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (e) {
      next(e);
    }
  };
}

export default MatchController;
