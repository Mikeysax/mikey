var request = require('supertest');
var server = require('../../server');

describe('loading express', function() {

  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

});
