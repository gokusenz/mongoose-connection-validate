/* eslint-env mocha */
const app = require('../../server.js');
const expect = require('chai').expect;
const supertest = require('supertest');
const sinon = require('sinon');
const Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
require('sinon-mongoose');
const companyschema = require('../../app/models/schema/UserCompany');
const resumeschema = require('../../app/models/schema/UserResume');


const server = app.listen();
const request = supertest.agent(server);

describe('UserRoute', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('createUserCompany: /login', () => {
    it('Success should return a 200 response', (done) => {
      const params = {
        username: '12345',
        password: 'password',
        type: 'company',
      };

      const expected = {
        username: '12345',
        password: 'password',
        type: 'company',
      };
      sinon.stub(companyschema, 'findOrCreate').yields(null, expected);

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const expectedResult = {
            username: '12345',
            password: 'password',
            type: 'company',
          };
          expect(res.body).to.deep.equal(expectedResult);
          companyschema.findOrCreate.restore();
          return done();
        });
    });

    it('Error should return a 500 response', (done) => {
      const params = {
        username: '12345',
        password: 'password',
        type: 'company',
      };

      const expected = 'error';
      sinon.stub(companyschema, 'findOrCreate').yields(expected, {});
      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.equal(expected);
          companyschema.findOrCreate.restore();
          return done();
        });
    });

    it('Error: 422 with error msg (username require)', (done) => {
      const params = {
        username: '',
        password: 'password',
        type: 'company',
      };

      const expected = {
        param: 'username',
        msg: 'username is required.',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });

    it('Error: 422 with error msg (username more be less than 10)', (done) => {
      const params = {
        username: '12345678900',
        password: 'password',
        type: 'company',
      };

      const expected = {
        param: 'username',
        msg: 'username must be less than 10',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });

    it('Error: 422 with error msg (username must be only numeric)', (done) => {
      const params = {
        username: 'username',
        password: 'password',
        type: 'company',
      };

      const expected = {
        param: 'username',
        msg: 'username must be only numeric',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });

    it('Error: 422 with error msg (username must be only numeric)', (done) => {
      const params = {
        username: 'username',
        password: 'password',
        type: 'company',
      };

      const expected = {
        param: 'username',
        msg: 'username must be only numeric',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });

    it('Error: 422 with error msg (type must be company)', (done) => {
      const params = {
        username: 'username',
        password: 'password',
        type: 'companys',
      };

      const expected = {
        param: 'type',
        msg: 'type must be resume or company',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });

    it('Error: 422 Case username and type is required return object', (done) => {
      const params = {
        username: '',
        password: 'password',
        type: '',
      };

      const expected = [{
        param: 'username',
        msg: 'username is required.',
      },
      {
        param: 'type',
        msg: 'type is required.',
      }];

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members(expected);
          return done();
        });
    });
  });

  describe('createUserResume: /login', () => {
    it('Success should return a 200 response', (done) => {
      const params = {
        username: '12345',
        password: 'password',
        type: 'resume',
      };

      const expected = {
        username: '12345',
        password: 'password',
        type: 'resume',
      };
      sinon.stub(resumeschema, 'findOrCreate').yields(null, expected);
      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const expectedResult = {
            username: '12345',
            password: 'password',
            type: 'resume',
          };
          expect(res.body).to.deep.equal(expectedResult);
          resumeschema.findOrCreate.restore();
          return done();
        });
    });

    it('Error: 422 with error msg (type must be resume)', (done) => {
      const params = {
        username: 'username',
        password: 'password',
        type: 'resumes',
      };

      const expected = {
        param: 'type',
        msg: 'type must be resume or company',
      };

      request.post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(params)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.include.members([expected]);
          return done();
        });
    });
  });
});
