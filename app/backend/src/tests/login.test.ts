import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({
     //   ...<Seu mock>
      } as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
 //   chaiHttpResponse = await chai
 //      .request(app)
 //      ...

 //   expect(...)
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
