import assert from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/'


chai.use(chaiHttp);


describe('Api Version', function() {
  describe('Get Version', function() {
    it('Should get the API version response', function() {
      chai.request(app)
        .get('/api')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
    });
  });
});