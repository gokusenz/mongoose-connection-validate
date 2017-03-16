/* eslint-env mocha */
const UserCompany = require('../../app/models/schema/UserCompany');
const chai = require('chai');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const expect = chai.expect;

describe('Check userCompany schema', () => {
  it('should be suscess', (done) => {
    const input = {
      username: '123',
      password: 'name',
    };
    const userCompany = new UserCompany(input);
    userCompany.validate((err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
