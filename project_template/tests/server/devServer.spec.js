var request = require('supertest');
var devServer = require('../../devServer');

describe('loading express', function() {
  it('responds to /', function(done) {
    request(devServer)
      .get('/')
      .expect(200, done);
  });
});
