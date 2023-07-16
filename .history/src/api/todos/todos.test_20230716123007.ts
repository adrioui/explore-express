import request from 'supertest';

import app from '../../app';

describe('GET api/v1/todos', () => {
  it('responds with an array of todos', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});