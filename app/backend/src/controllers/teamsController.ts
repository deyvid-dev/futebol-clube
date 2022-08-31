import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TeamsService.getAll();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default TeamsController;
