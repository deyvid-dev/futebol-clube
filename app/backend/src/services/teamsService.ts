import Team from '../database/models/team';

class TeamsService {
  static getAll = async () => Team.findAll();
  static getByPk = async (id: string) => Team.findByPk(id);
}

export default TeamsService;
