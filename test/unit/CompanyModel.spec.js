/* eslint-env mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
require('sinon-mongoose');
const UserCompanyModel = require('../../app/models/UserCompanyModel');
const UserCompanySchema = require('../../app/models/schema/UserCompany');

describe('Company Model', () => {
  let companyModel;

  beforeEach(() => {
    companyModel = new UserCompanyModel();
  });

  afterEach(() => {
  });

  it('find and create company: return Object Success', () => {
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

    sinon.stub(UserCompanySchema, 'findOrCreate').yields(null, expected);
    return companyModel.findOrCreate(query, create)
      .then((result) => {
        expect(result).to.deep.equal(expected);
        UserCompanySchema.findOrCreate.restore();
      });
  });

  it('find and create company:  return object fail', () => {
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
    sinon.stub(UserCompanySchema, 'findOrCreate').yields(expected, null);

    return companyModel.findOrCreate(query, create)
      .catch((err) => {
        expect(err).to.be.an('error');
      });
  });
});
