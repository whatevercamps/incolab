/* global it, describe, before */

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../user-service');

chai.use(chaiHttp);
chai.should();

/*
Register user:
*/

describe('Register', () => {
  // test case 1
  it('Should user register user succesfully', done => {
    // This works as a Unique ID
    const testUserId = Date.now();
    const newUser = {
      name: `testcase1${testUserId}`,
      email: `testcase1${testUserId}@example.com`,
      password: `testcase1${testUserId}`
    };

    //running test case
    chai
      .request(app)
      .post('/users/register')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });

  //test case 2
  it('Should not register user, should give 400 status', done => {
    const newUser = {
      name: '',
      password: ''
    };
    chai
      .request(app)
      .post('/users/register')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(400);
        done();
      });
  });

  describe('Signing up two equal users', () => {
    // This works as a Unique ID
    const testUserId = Date.now();
    const newUser = {
      name: `testcase2${testUserId}`,
      password: `testcase2${testUserId}`,
      email: `testcase2${testUserId}@example.com`
    };

    before('creating the same user first', done => {
      chai
        .request(app)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    });

    it('Should not register user again, should give repeated email error', done => {
      chai
        .request(app)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(500);
          done();
        });
    });
  });
});

// /*
// Authenticate user:
// */
describe('User Authentication', () => {
  describe('successfully singing in user', () => {
    // This works as a Unique ID
    const testUserId = Date.now();
    const newUser = {
      name: `testcase3${testUserId}`,
      email: `testcase3${testUserId}@example.com`,
      password: `testcase3${testUserId}`
    };
    const authUser = {
      email: `testcase3${testUserId}@example.com`,
      password: `testcase3${testUserId}`
    };

    before('some user registration', done => {
      chai
        .request(app)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    });

    it('should get status 200 and access token', function (done) {
      chai
        .request(app)
        .post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .send(authUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('token');
          done();
        });
    });
  });

  describe('Trying auth with invalid credentials', () => {
    const authUser = {
      email: 'fakeuser@example.com',
      password: 'veryfakepassword'
    };

    it('should get status 200 and access token', function (done) {
      chai
        .request(app)
        .post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .send(authUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          done();
        });
    });
  });
});

/*
User Profile:
*/

describe('Gettin user profile', () => {
  describe('User token validation successfully', () => {
    // This works as a Unique ID
    const testUserId = Date.now();
    const user = {
      name: `testcase4${testUserId}`,
      email: `testcase4${testUserId}@example.com`,
      password: `testcase4${testUserId}`
    };

    const authUser = {
      email: `testcase4${testUserId}@example.com`,
      password: `testcase4${testUserId}`
    };
    let token = '';
    before('User registration before', done => {
      chai
        .request(app)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    });

    describe('user auth before and test case container', () => {
      before('User auth before', done => {
        chai
          .request(app)
          .post('/users/authenticate')
          .set('Content-Type', 'application/json')
          .send(authUser)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('token');
            token = res.body['token'];
            done();
          });
      });

      it('Should get user profile', done => {
        chai
          .request(app)
          .get('/users/profile')
          .set('Content-Type', 'application/json')
          .set('Authorization', token)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('Gettin unauthorized response', () => {
    it('Should recieve 401 status', done => {
      chai
        .request(app)
        .get('/users/profile')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'faketoken')
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(401);
          done();
        });
    });
  });
});
