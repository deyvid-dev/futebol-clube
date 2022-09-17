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

    return matchs as unknown as IMatch[];
  };

  static create = async (data: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    console.log(match);
    return match as unknown as IMatch;
  };

  static finish = async (id: number) => {
    const result = await Match.update({ inProgress: false }, { where: { id } });
    return result;
  };
}

export default MatchService;
