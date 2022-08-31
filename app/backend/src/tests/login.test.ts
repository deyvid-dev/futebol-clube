import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', () => {
  describe('Post /login', () => {
    let mock ={
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
    }

    beforeEach(async () => {
      sinon.stub(UserModel, "findOne").resolves(mock as UserModel);
      sinon.restore()
    });

    it('Retorna 200 em caso de sucesso', async () => {
      const { body, status } = await chai.request(app).post('/login').send({
        "email": "user@user.com",
        "password": "secret_user"
      });


      expect(status).to.be.equal(200);
      expect(body).to.haveOwnProperty('token');
    });

    it('Retorna 400 e messagem de error: "Incorrect email or password"', async () => {
      const { body, status } = await chai.request(app)
        .post('/login').send({
          "email": "user@",
          "password": "secret_user"
        });

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Incorrect email or password');
    });

    it('Retorna 401 e messagem de error: "Incorrect email or password"', async () => {
      const { body, status } = await chai.request(app)
        .post('/login').send({
          "email": "user@trybe.com",
          "password": "secret"
        });

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Incorrect email or password');
    });


    it('Retorna 400 caso seja passado email vazio', async () => {
      const { body, status } = await chai.request(app)
        .post('/login').send({
          "password": "secret_user"
        });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('Retorna 400 caso seja passado password vazio', async () => {
      const { body, status } = await chai.request(app)
        .post('/login').send({
          "email": "user@trybe.com"
        });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Get /login/validate', () => {
    it('Em caso de token valido', async () => {
      const res = await chai.request(app).post('/login').send({
        "email": "user@user.com",
        "password": "secret_user"
      });

      const { body, status } = await chai.request(app)
        .get('/login/validate').set({
          "Authorization": res.body.token,
        });

      expect(status).to.be.equal(200);
      expect(body).to.haveOwnProperty("role", "user");
    });

    it('Em caso de token errado', async () => {
      const { body, status } = await chai.request(app)
        .get('/login/validate').set({
          "Authorization": 'tokenIncorreto',
        });

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Expired or invalid token");
    });


    it('Em caso de token vazio', async () => {
      const { body, status } = await chai.request(app)
        .get('/login/validate').set({
          "Authorization": '',
        });

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Token not found");
    });
  })
}); 
