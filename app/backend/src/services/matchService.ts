import IMatch from '../interfaces/MatchInterface';
import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchService {
  static getAll = async (): Promise<IMatch[]> => {
    const matchs = await Match.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    console.log(matchs);
    return matchs as unknown as IMatch[];
  };
}

export default MatchService;
