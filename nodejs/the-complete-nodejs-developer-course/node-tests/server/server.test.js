const request = require('supertest');
const server = require('./server');
const expect = require('expect');

var app = server.app;

describe('Server Tests', () => {

  describe('GET /', () => {
    it('should return hello world response', (done) => {
      // request(app)
      // .get('/')
      // .expect(200)
      // .expect('Hello world')
      // .end(done);

      // request(app)
      // .get('/')
      // .expect(404)
      // .expect({
      //   error: 'Page not found'
      // })
      // .end(done);

      request(app)
      .get('/')
      .expect(404)
      .expect((res) => {
        expect(res.body).toInclude({
          error: 'Page not found'
        })
      })
      .end(done);
    })
  })

  describe('GET /users', () => {
    //assert 200
    //assert a user exists in the array
    it('should assert Amy is in the users', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toInclude({ name: 'Rory', age: 26 })
      })
      .end(done);
    })
  })

})
