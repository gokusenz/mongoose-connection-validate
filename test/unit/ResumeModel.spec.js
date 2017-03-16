/* eslint-env mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
require('sinon-mongoose');
const UserResumeModel = require('../../app/models/UserResumeModel');
const UserResumeSchema = require('../../app/models/schema/UserResume');

describe('Resume Model', () => {
  let resumeModel;

  beforeEach(() => {
    resumeModel = new UserResumeModel();
  });

  afterEach(() => {
  });

  it('find and create resume: return Object Success', () => {
    const params = {
      username: '12345',
      password: 'password',
    };

    const query = { username: params.username };
    const create = {
      username: params.username,
      password: params.password,
    };

    const expected = {
      username: '12345',
      password: 'password',
    };

    sinon.stub(UserResumeSchema, 'findOrCreate').yields(null, expected);

    return resumeModel.findOrCreate(query, create)
      .then((result) => {
        expect(result).to.deep.equal(expected);
        UserResumeSchema.findOrCreate.restore();
      });
  });

  it('find and create resume:  return object fail', () => {
    const params = {
      username: '12345',
      password: 'password',
    };

    const query = { username: params.username };
    const create = {
      username: params.username,
      password: params.password,
    };

    const expected = new Error('error');
    sinon.stub(UserResumeSchema, 'findOrCreate').yields(expected, null);

    return resumeModel.findOrCreate(query, create)
      .catch((err) => {
        expect(err).to.be.an('error');
      });
  });
});
