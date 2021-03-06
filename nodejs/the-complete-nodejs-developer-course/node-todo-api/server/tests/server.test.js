const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
      Todo.find({text : todoText}).then((todos) => {
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
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.docs.length).toBe(2);
    })
    .end(done);
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc given the id', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${(new ObjectID()).toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for no object ids', (done) => {
    request(app)
    .get(`/todos/${123}`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove todo doc by id', (done) => {
    var id = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(id);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(id).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    })
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
    .delete(`/todos/${(new ObjectID()).toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for no object ids', (done) => {
    request(app)
    .delete(`/todos/${123}`)
    .expect(404)
    .end(done);
  });
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var todoText = "Testing PATCH route";

    request(app)
    .patch(`/todos/${id}`)
    .send({
      "text": todoText,
      "completed": true
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todoText);
      expect(res.body.todo.completed).toBe(true);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(id).then((todo) => {
        expect(todo.text).toBe(todoText);
        expect(todo.completed).toBe(true);
        expect(todo.completedAt).toBeA('number');
        expect(todo.completedAt).toBeGreaterThan(1);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var todoText = "Testing PATCH route, with completed=false";

    request(app)
    .patch(`/todos/${id}`)
    .send({
      "text": todoText,
      "completed": false
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todoText);
      expect(res.body.todo.completed).toBe(false);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(id).then((todo) => {
        expect(todo.text).toBe(todoText);
        expect(todo.completed).toBe(false);
        expect(todo.completedAt).toBe(null);
        expect(todo.completedAt).toNotExist();
        done();
      }).catch((e) => done(e));
    });

  });
})

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body[0]).toNotExist();
    })
    .end(done);
  })
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'test@test.com';
    var password = 'password123';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if(err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        })
      });
  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'test_test.com';
    var password = 'password123';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .expect((res) => {
        expect(res.body[0]).toNotExist();
      })
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    var email = 'user1@test.com';
    var password = 'password123';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .expect((res) => {
        expect(res.body[0]).toNotExist();
      })
      .end(done);
  });
})
