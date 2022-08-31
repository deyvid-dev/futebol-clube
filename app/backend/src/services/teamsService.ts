import Team from '../database/models/team';

class TeamsService {
  static getAll = async () => Team.findAll();
}

export default TeamsService;
