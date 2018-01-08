import expect from 'expect'
import chai from 'chai'
import chaiHttp from 'chai-http'
import token from './../../src/services/token'
import { User } from './../../src/models'
import bcrypt from 'bcrypt'
import Application from './../../src/application';
import tokenService from './../../src/services/token'

chai.use(chaiHttp);

const application = new Application;
application.init();

let UserCreated = null;

describe('Users', () => {

  describe('Get Users Collection Route', () => {
    
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
            UserCreated = user;
            done();
          });
        })  
      });
    });

    it('Should respond with 401 for unauthenticated request', (done) => {
      chai.request(application.app)
        .get('/api/users')
        .end(function (err, res) {
          expect(res.status).toEqual(401);
          const body = res.body;
          expect(body.status).toEqual(401);
          expect(body.code).toEqual('UNAUTHENTICATED')
          expect(body.title).toEqual('Authentication Exception')
          done();
        });
    });

    it('Should get users with valid token', (done) => {
      const payload = {
        sub: UserCreated.id,
        iss: "https://api.nodejs.co",
        first_name: 'John',
        last_name: 'Doe',
        email: "user@example.com"
      }
      const accessToken = tokenService.sign(payload);
      chai.request(application.app)
        .get('/api/users')
        .set('Authorization', `Bearer ${accessToken.access_token}`)
        .end(function (err, res) {
          expect(res.status).toEqual(200);
          done();
        });
    });

  });

});