import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {

  let chaiHttpResponse: Response;

  const userMock = {
    username: 'admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$12$bOzhZf2LlTgC06CLFY/XJOhNhfwAzt3LkGXkMd7FK/D2bnPwtF8uu'
  }

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjYzNjkyNTc0LCJleHAiOjE2NjM5NTE3NzR9.fTa9DwEclIH0XZwDSJfhoKvLcspKs-s9NNOUNpNTd4k';

  // before(async () => {
  //   sinon
  //     .stub(User, "findOne")
  //     .resolves(userMock as User);
  // });

  afterEach(()=>{
    sinon.restore();
  })

  it('1 - testa rota de login e retorna status(200)', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .set('authorization', token)
    .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse).to.be.json;
  });

  it('2 - testa rota de login com email e senha incorretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .send({ email: 'errado@admin.com' });

    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.be.json;
  });

  it('3 - rota de login com role certo', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
    .send({ role: 'admin' });

    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.be.json;
  });
});
