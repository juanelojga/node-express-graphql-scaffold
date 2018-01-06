import assert from 'assert'
import expect from 'expect'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/'


chai.use(chaiHttp);

describe('Api Version', function() {
  describe('Get Version', function() {
    it('Should get the API version response', function(done) {
      chai.request(app)
        .get('/api')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          expect(res.body.version).toBe('1.0.0');
          expect(res.body.status).toBe('online');
          done();
        });
    });
  });
});