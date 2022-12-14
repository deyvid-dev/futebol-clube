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

  static create = async (data: IMatch): Promise<IMatch | string> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;

    const homebypk = await Team.findByPk(homeTeam);
    const awaybypk = await Team.findByPk(awayTeam);

    if (!homebypk || !awaybypk) {
      return 'falsy';
    }
    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return match as unknown as IMatch;
  };

  static finish = async (id: number) => {
    const result = await Match.update({ inProgress: false }, { where: { id } });

    return result;
  };

  static update = async (id: number, homeTeamGoals: string, awayTeamGoals: string) => {
    const update = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return update;
  };
}

export default MatchService;
