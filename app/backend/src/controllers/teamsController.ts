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

  public getByPk = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await TeamsService.getByPk(id);
      if (!result) return res.status(404).json({ message: 'Team does not exist' });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
