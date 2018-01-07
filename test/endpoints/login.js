import expect from 'expect'
import chai from 'chai'
import chaiHttp from 'chai-http'
import token from './../../src/services/token'
import { User } from './../../src/models'
import bcrypt from 'bcrypt'
import Application from './../../src/application';

chai.use(chaiHttp);

const application = new Application;
application.init();

describe('Login', () => {

  describe('Get Access Token', () => {
    
    beforeEach((done) => {
      bcrypt.hash('MySuperPassword', 8).then((hash) => {
        User.truncate()
        .then(() => {
          User.create({
            email: 'user@example.com',
            password: hash,
            first_name: 'John',
            last_name: 'Doe'
          })
          .then((user) => {
            done();
          });
        })  
      });
    });

    it('Should generate a new access token for user', (done) => {
      chai.request(application.app)
        .post('/api/auth/login')
        .send({
          email: "user@example.com",
          password: "MySuperPassword"
        })
        .end(function (err, res) {
          expect(res.status).toEqual(200);
          const body = res.body;
          expect(body.access_token).toBeA('string');
          expect(body.ttl).toBeA('number');
          const decoded = token.verify(body.access_token);
          expect(decoded.email).toEqual("user@example.com");
          done();
        });
    });

    it('Should return 401 for wrong password', (done) => {
      chai.request(application.app)
        .post('/api/auth/login')
        .send({
          email: "user@example.com",
          password: "MySuperBadPassword"
        })
        .end(function (err, res) {
          const body = res.body;
          expect(res.status).toEqual(401);
          expect(body.status).toEqual(401);
          expect(body.code).toEqual('LOGIN_FAILED');
          expect(body.title).toEqual('Wrong credentials');
          done();
        });
    });

    it('Should return 401 for user not found', (done) => {
      chai.request(application.app)
        .post('/api/auth/login')
        .send({
          email: "user2@example.com",
          password: "MySuperBadPassword"
        })
        .end(function (err, res) {
          const body = res.body;
          expect(res.status).toEqual(401);
          expect(body.status).toEqual(401);
          expect(body.code).toEqual('USER_NOT_FOUND');
          expect(body.title).toEqual('User not found');
          done();
        });
    });

  });

});