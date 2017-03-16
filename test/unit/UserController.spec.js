/* eslint-env mocha */
const sinon = require('sinon');
const Bluebird = require('bluebird');
const CommonLogin = require('../../app/commons/Login');
const UserController = require('../../app/controllers/UserController');
require('sinon-as-promised')(Bluebird);

describe('Login Controller', () => {
  const promised = func => new Promise((resolve) => {
    setTimeout(() => resolve(func), 1);
  });

  let mockCommonLogin;
  let req;
  let res;
  let mockRes;

  beforeEach(() => {
    mockCommonLogin = sinon.mock(CommonLogin);
    req = {};
    res = { status: () => {}, json: () => {} };
    mockRes = sinon.mock(res);
  });

  afterEach(() => {
    mockCommonLogin.restore();
    mockRes.restore();
  });

  describe('Login Function', () => {
    it('Success, should return status 200', (done) => {
      req = {
        body: {
          username: '12345',
          password: 'password',
          type: 'company',
        },
      };
      const params = {
        username: '12345',
        password: 'password',
        type: 'company',
      };
      const respones = {
        _id: '12345',
        username: '12345',
        password: 'password',
        type: 'company',
      };
      const jsonInput = {
        user_id: '12345',
        username: '12345',
        password: 'password',
        type: 'company',
      };
      mockRes.expects('status').once().withArgs(200).returns(res);
      mockRes.expects('json').once().withArgs(jsonInput);
      mockCommonLogin.expects('getUser').withArgs(params).once().resolves(respones);
      promised(UserController.login(req, res)).then(() => {
        mockRes.verify();
        mockRes.restore();
        mockCommonLogin.verify();
        done();
      }).catch(err => done(err));
    });
  });
});
