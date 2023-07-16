import request from 'supertest';

import app from '../../app';

describe('GET api/v1/todos', () => {
  it('responds with an array of todos', (done) => {
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});