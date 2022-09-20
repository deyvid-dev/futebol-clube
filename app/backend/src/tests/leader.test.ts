import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Leader from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Home', () => {

const leaderHome = {
  leader: [
    {
      "name": "Santos",
      "totalPoints": 9,
      "totalGames": 3,
      "totalVictories": 3,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": "9",
      "goalsOwn": 3,
      "goalsBalance": Number(6),
      "efficiency": "100.00"
    },
    {
      "name": "Palmeiras",
      "totalPoints": 7,
      "totalGames": 3,
      "totalVictories": 2,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 10,
      "goalsOwn": 5,
      "goalsBalance": 5,
      "efficiency": "77.78"
    },
    {
      "name": "Corinthians",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 6,
      "goalsOwn": 1,
      "goalsBalance": 5,
      "efficiency": "100.00"
    },
    {
      "name": "Grêmio",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 4,
      "goalsOwn": 1,
      "goalsBalance": 3,
      "efficiency": "100.00"
    },
    {
      "name": "Real Brasília",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 2,
      "goalsOwn": 0,
      "goalsBalance": 2,
      "efficiency": "100.00"
    },
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 4,
      "goalsOwn": 1,
      "goalsBalance": 3,
      "efficiency": "66.67"
    },
    {
      "name": "Internacional",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 4,
      "goalsOwn": 6,
      "goalsBalance": -2,
      "efficiency": "44.44"
    },
    {
      "name": "Botafogo",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 2,
      "goalsOwn": 4,
      "goalsBalance": -2,
      "efficiency": "44.44"
    },
    {
      "name": "Ferroviária",
      "totalPoints": 3,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 3,
      "goalsOwn": 2,
      "goalsBalance": 1,
      "efficiency": "50.00"
    },
    {
      "name": "Napoli-SC",
      "totalPoints": 2,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 2,
      "goalsOwn": 2,
      "goalsBalance": 0,
      "efficiency": "33.33"
    },
    {
      "name": "Cruzeiro",
      "totalPoints": 1,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 2,
      "goalsOwn": 3,
      "goalsBalance": -1,
      "efficiency": "16.67"
    },
    {
      "name": "Flamengo",
      "totalPoints": 1,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 1,
      "goalsOwn": 2,
      "goalsBalance": -1,
      "efficiency": "16.67"
    },
    {
      "name": "Minas Brasília",
      "totalPoints": 1,
      "totalGames": 3,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 2,
      "goalsFavor": 3,
      "goalsOwn": 6,
      "goalsBalance": -3,
      "efficiency": "11.11"
    },
    {
      "name": "Avaí/Kindermann",
      "totalPoints": 1,
      "totalGames": 3,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 2,
      "goalsFavor": 3,
      "goalsOwn": 7,
      "goalsBalance": -4,
      "efficiency": "11.11"
    },
    {
      "name": "São José-SP",
      "totalPoints": 0,
      "totalGames": 3,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 3,
      "goalsFavor": 2,
      "goalsOwn": 5,
      "goalsBalance": -3,
      "efficiency": "0.00"
    },
    {
      "name": "Bahia",
      "totalPoints": 0,
      "totalGames": 3,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 3,
      "goalsFavor": 0,
      "goalsOwn": 4,
      "goalsBalance": -4,
      "efficiency": "0.00"
    }
  ]
}

const leaderAway = {
  leader: [
    {
      "name": "Palmeiras",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 7,
      "goalsOwn": 0,
      "goalsBalance": 7,
      "efficiency": "100.00"
    },
    {
      "name": "Corinthians",
      "totalPoints": 6,
      "totalGames": 3,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 6,
      "goalsOwn": 2,
      "goalsBalance": 4,
      "efficiency": "66.67"
    },
    {
      "name": "Internacional",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 0,
      "goalsBalance": 3,
      "efficiency": "100.00"
    },
    {
      "name": "São José-SP",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 1,
      "goalsBalance": 2,
      "efficiency": "100.00"
    },
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 5,
      "goalsOwn": 5,
      "goalsBalance": 0,
      "efficiency": "44.44"
    },
    {
      "name": "Ferroviária",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 4,
      "goalsOwn": 5,
      "goalsBalance": -1,
      "efficiency": "44.44"
    },
    {
      "name": "Real Brasília",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 3,
      "goalsOwn": 4,
      "goalsBalance": -1,
      "efficiency": "44.44"
    },
    {
      "name": "Grêmio",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 5,
      "goalsOwn": 7,
      "goalsBalance": -2,
      "efficiency": "44.44"
    },
    {
      "name": "Flamengo",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 1,
      "goalsOwn": 3,
      "goalsBalance": -2,
      "efficiency": "44.44"
    },
    {
      "name": "Avaí/Kindermann",
      "totalPoints": 3,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 1,
      "goalsOwn": 1,
      "goalsBalance": 0,
      "efficiency": "50.00"
    },
    {
      "name": "Cruzeiro",
      "totalPoints": 3,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 0,
      "totalLosses": 2,
      "goalsFavor": 6,
      "goalsOwn": 7,
      "goalsBalance": -1,
      "efficiency": "33.33"
    },
    {
      "name": "Santos",
      "totalPoints": 2,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 3,
      "goalsBalance": 0,
      "efficiency": "33.33"
    },
    {
      "name": "Bahia",
      "totalPoints": 2,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 2,
      "goalsOwn": 2,
      "goalsBalance": 0,
      "efficiency": "33.33"
    },
    {
      "name": "Minas Brasília",
      "totalPoints": 1,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 1,
      "goalsOwn": 3,
      "goalsBalance": -2,
      "efficiency": "16.67"
    },
    {
      "name": "Botafogo",
      "totalPoints": 0,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 2,
      "goalsFavor": 1,
      "goalsOwn": 4,
      "goalsBalance": -3,
      "efficiency": "0.00"
    },
    {
      "name": "Napoli-SC",
      "totalPoints": 0,
      "totalGames": 3,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 3,
      "goalsFavor": 1,
      "goalsOwn": 10,
      "goalsBalance": -9,
      "efficiency": "0.00"
    }
  ]
}

let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });

  it('1 - classificação times casa', async () => {
    sinon.stub(Leader, 'sequelize').resolves(leaderHome.leader as any);

    const response = await chai.request(app)
      .get('/leaderboard/home');

    expect(response.status).to.equal(200);
    expect(response.body).to.equal(leaderHome.leader);
  });

  it('2 - classificação times fora', async () => {
    sinon.stub(Leader, 'sequelize').resolves(leaderAway.leader as any);

    const response = await chai.request(app)
      .get('/leaderboard/away');

    expect(response.status).to.equal(200);
    expect(response.body).to.equal(leaderAway.leader);
  });

});