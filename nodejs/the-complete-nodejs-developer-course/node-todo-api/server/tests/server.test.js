const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo record', (done) => {
    var todoText = "Test todo text prop";

    request(app)
    .post('/todos')
    .send({"text": todoText})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.text).toBe(todoText);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(todoText);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo record with invalid data', (done) => {
    request(app)
    .post('/todos')
    .send({"text": ""})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });

});
