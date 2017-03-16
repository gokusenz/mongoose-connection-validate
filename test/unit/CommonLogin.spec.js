/* eslint-env mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
require('sinon-mongoose');
const CommonLogin = require('../../app/commons/Login');
const UserResumeModel = require('../../app/models/UserResumeModel');
const UserCompanyModel = require('../../app/models/UserCompanyModel');

describe('Controller: GetModel', () => {
  it('Sent Type Company: Return UserCompanyModel', () => {
    const type = 'company';
    const expected = new UserCompanyModel();
    expect(CommonLogin.getModel(type)).to.eql(expected);
  });

  it('Sent Type Resume: Return UserResumeModel', () => {
    const type = 'resume';
    const expected = new UserResumeModel();
    expect(CommonLogin.getModel(type)).to.eql(expected);
  });
});

describe('Controller: GetUser', () => {
  let mockCommonLogin;

  beforeEach(() => {
    mockCommonLogin = sinon.mock(CommonLogin);
  });

  afterEach(() => {
    mockCommonLogin.restore();
  });

  it('Sent Type Resume: Return UserResumeModel', () => {
    const params = {
      username: '12345',
      password: 'password',
      type: 'resume',
    };

    const mockExpected = {
      _id: '12345',
      username: '12345',
      password: 'password',
    };

    const mockUserResumeModel = {
      findOrCreate: (query, create) => Promise.resolve(mockExpected),
    };

    mockCommonLogin.expects('getModel').withArgs(params.type).once().returns(mockUserResumeModel);
    // sinon.stub(CommonLogin, 'getModel').withArgs(params.type).returns(mockUserResumeModel);

    return CommonLogin.getUser(params)
      .then((result) => {
        mockCommonLogin.verify();
        const expected = {
          _id: '12345',
          username: '12345',
          password: 'password',
        };
        expect(result).to.deep.equal(expected);
      });
  });
});
