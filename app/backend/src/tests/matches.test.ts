import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {

const matchesMock = {
  allTeams: [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ],
};

const matcesUpdate = {
  id: {
    "message": "Updated goals",
  }
};

const matchesCreate = {
  match: {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
}

const finishi = {
  msg: {
    "message": "Finished",
  }
}
let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });

  it('1 - retonar todas as matchs', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);

    const response = await chai.request(app)
      .get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).deep.equal(matchesMock);
  });

  it('2 - update matches', async () => {
    sinon.stub(Matches, 'update').resolves(matcesUpdate.id as any);

    const response = await chai.request(app)
      .patch('/matches/:id');

    expect(response.status).to.equal(200);
    expect(response.body).deep.equal(matcesUpdate.id);
  });

  it('3 - Finish update matches', async () => {
    sinon.stub(Matches, 'update').resolves(finishi.msg as any);

    const response = await chai.request(app)
      .patch('/matches/:id/finish');

    expect(response.status).to.equal(200);
    expect(response.body).deep.equal(finishi.msg);
  });

  it('4 - Created matches', async () => {
    sinon.stub(Matches, 'create').resolves(matchesCreate.match as any);

    const response = await chai.request(app)
      .post('/matches');

    expect(response.status).to.equal(401);
    expect(response.body.message).deep.equal('Token must be a valid token');
  });


});
