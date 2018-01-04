'use strict'

import expect from 'expect'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/'
import token from './../../src/services/token'
import { User } from './../../src/models'
import bcrypt from 'bcrypt-nodejs'

chai.use(chaiHttp);

describe('Login', () => {
  describe('Get Access Token', () => {
    
    beforeEach((done) => {
      User.truncate()
      .then(() => {
        User.create({
          email: "user@example.com",
          password: bcrypt.hashSync("MySuperPassword", bcrypt.genSaltSync(8), null),
          first_name: "John",
          last_name: "Doe"
        })
        .then((user) => {
          done();
        });
      })
    });

    it('Should generate a new access token for user', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({
          email: "user@example.com",
          password: "MySuperPassword"
        })
        .end(function (err, res) {
          expect(res.status).toEqual(200);
          const body = res.body;
          expect(body.token).toBeA('string');
          const decoded = token.verify(body.token);
          expect(decoded.email).toEqual("user@example.com");
          done();
        });
    });
  });
});