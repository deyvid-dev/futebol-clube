import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {

const teamsMock = {
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

let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });

  it('1 - retonar todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as any);

    const response = await chai.request(app)
      .get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).deep.equal(teamsMock);
  });

  it('2 - retonar times pelo id', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamsMock as any);

    const response = await chai.request(app)
      .get('/teams/:id');

    expect(response.status).to.equal(200);
    expect(response.body).deep.equal(teamsMock);
  });

});