import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
    try {
        await Todos.drop();
    } catch (error) {
        
    }
});

describe('GET api/v1/todos', () => {
  it('responds with an array of todos', async () => 
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).
      then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

describe('POST api/v1/todos', () => {
    it('responds with an error if the todo is invalid', async () => 
      request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/json')
        .send({
            content: '',
        })
        .expect('Content-Type', /json/)
        .expect(422).
        then((response) => {
          expect(response.body).toHaveProperty('message');
        }),
    );
});

let id = '';
describe('POST api/v1/todos', () => {
    it('responds with an inserted object', async () => 
      request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/json')
        .send({
            content: 'Learn TypeScript',
            done: false,
        })
        .expect('Content-Type', /json/)
        .expect(201).
        then((response) => {
          expect(response.body).toHaveProperty('_id');
          id = response.body._id;
          expect(response.body).toHaveProperty('content');
          expect(response.body).toHaveProperty('done');
        }),
    );
});

describe('GET api/v1/todos/:id', () => {
    it('responds with a single todo', async () => 
      request(app)
        .get(`/api/v1/todos/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200).
        then((response) => {
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(id);
            expect(response.body).toHaveProperty('content');
            expect(response.body.content).toBe('Learn TypeScript');
            expect(response.body).toHaveProperty('done');
            expect(response.body.done).toBe(false);
        }),
    );

    it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get(`/api/v1/todos/1`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done());
    });
    it('responds with a not found error', (done) => {
        request(app)
          .get(`/api/v1/todos/64b3c17dcac5829f0f9f6656`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, done());
    });  
});

describe('PUT api/v1/todos/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
          .delete(`/api/v1/todos/1`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422, done());
    },);
    it('responds with a not found error', (done) => {
        request(app)
            .delete(`/api/v1/todos/64b3c17dcac5829f0f9f6656`)
            .set('Accept', 'application/json')
            .send({
                content: 'Learn TypeScript',
                done: true,
            })    
            .expect('Content-Type', /json/)
            .expect(404, done());
    },);  

    it('responds with a single todo', async () => 
      request(app)
        .delete(`/api/v1/todos/${id}`)
        .set('Accept', 'application/json')
        .send({
            content: 'Learn TypeScript',
            done: true,
        })
        .expect('Content-Type', /json/)
        .expect(200).
        then((response) => {
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(id);
            expect(response.body).toHaveProperty('content');
            expect(response.body).toHaveProperty('done');
            expect(response.body.done).toBe(true);
        }),
    );
});

describe('DELETE api/v1/todos/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
          .put(`/api/v1/todos/1`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422, done());
    },);
    it('responds with a not found error', (done) => {
        request(app)
            .put(`/api/v1/todos/64b3c17dcac5829f0f9f6656`)
            .set('Accept', 'application/json')
            .send({
                content: 'Learn TypeScript',
                done: true,
            })    
            .expect('Content-Type', /json/)
            .expect(404, done());
    },);  

    it('responds with a status 204', async () => 
      request(app)
        .put(`/api/v1/todos/${id}`)
        .set('Accept', 'application/json')
        .send({
            content: 'Learn TypeScript',
            done: true,
        })
        .expect('Content-Type', /json/)
        .expect(200).
        then((response) => {
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(id);
            expect(response.body).toHaveProperty('content');
            expect(response.body).toHaveProperty('done');
            expect(response.body.done).toBe(true);
        }),
    );
});