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
      if (CMatch.homeTeam === CMatch.awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const matchs = await MatchService.create(CMatch);
      if (matchs === 'falsy') {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
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

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return 'id not found';
      }
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await MatchService.update(Number(id), homeTeamGoals, awayTeamGoals);
      if (!result) return 'Not updated goals';
      return res.json({ message: 'Updated goals' });
    } catch (e) {
      next(e);
    }
  };
}

export default MatchController;
