//apiTest.js
const request = require('supertest');
const server = require('../server');
const assert = require('assert');


//====================  API test ====================

/**
 * Testing get all possible gene name endpoint
 */
describe('GET /api/autosuggest', function () {
  it('responds with JSON', function () {
    request(server)
      .get('/api/autosuggest')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

/**
 * Testing search endpoint
 */
describe('GET /api/search', function () {
  it('responds with JSON', function (done) {
    request(server)
      .get('/api/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns 3 results', function() {
    return request(server)
      .get('/api/search')
      .set('Accept', 'application/json')
      .query({name: 'ESPN'})
      .then(res => {
          assert.equal(res.body.length, 3)
      })
  });

  it('is not case sensitive', function() {
    return request(server)
      .get('/api/search')
      .set('Accept', 'application/json')
      .query({name: 'espn'})
      .then(res => {
          assert.equal(res.body.length, 3)
      })
  });

  it('returns empty array', function() {
    return request(server)
      .get('/api/search')
      .set('Accept', 'application/json')
      .query({name: ''})
      .then(res => {
          assert.equal(res.body.length, 0)
      })
  });
});
