import Match from '../database/models/match';

const queryHome = `SELECT tm.team_name AS 'name', (SUM(m.home_team_goals > m.away_team_goals)*3
 + SUM(m.home_team_goals = m.away_team_goals)) AS 'totalPoints',
COUNT(m.home_team) AS 'totalGames',
SUM(m.home_team_goals > m.away_team_goals) AS 'totalVictories',
SUM(m.home_team_goals = m.away_team_goals) AS 'totalDraws',
SUM(m.home_team_goals < m.away_team_goals) AS 'totalLosses',
SUM(m.home_team_goals) AS 'goalsFavor',
SUM(m.away_team_goals) AS 'goalsOwn',
(SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS 'goalsBalance',
ROUND(((SUM(m.home_team_goals > m.away_team_goals) * 3) 
+ SUM(m.home_team_goals = m.away_team_goals)) / (COUNT(m.home_team) * 3) * 100,2) AS 'efficiency'
FROM matches AS m
INNER JOIN teams AS tm ON m.home_team = tm.id
WHERE m.in_progress = 0
GROUP BY tm.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn;`;

const queryAway = `SELECT tm.team_name AS 'name', (SUM(m.away_team_goals > m.home_team_goals)*3
 + SUM(m.away_team_goals = m.home_team_goals)) AS 'totalPoints',
COUNT(m.away_team) AS 'totalGames',
SUM(m.away_team_goals > m.home_team_goals) AS 'totalVictories',
SUM(m.away_team_goals = m.home_team_goals) AS 'totalDraws',
SUM(m.away_team_goals < m.home_team_goals) AS 'totalLosses',
SUM(m.away_team_goals) AS 'goalsFavor',
SUM(m.home_team_goals) AS 'goalsOwn',
(SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS 'goalsBalance',
ROUND(((SUM(m.away_team_goals > m.home_team_goals) * 3) 
+ SUM(m.away_team_goals = m.home_team_goals)) / (COUNT(m.away_team) * 3) * 100,2) AS 'efficiency'
FROM matches AS m
INNER JOIN teams AS tm ON m.away_team = tm.id
WHERE m.in_progress = 0
GROUP BY tm.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn;`;

class LeaderService {
  static leaderHome = async () => {
    const result = await Match.sequelize?.query(queryHome);
    return result;
  };

  static leaderAway = async () => {
    const result = await Match.sequelize?.query(queryAway);
    return result;
  };
}

export default LeaderService;
