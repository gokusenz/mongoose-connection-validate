/* eslint-env mocha */
const UserResume = require('../../app/models/schema/UserResume');
const chai = require('chai');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const expect = chai.expect;

describe('Check userResume schema', () => {
  it('should be suscess', (done) => {
    const input = {
      username: '123',
      password: 'name',
    };
    const userResume = new UserResume(input);
    userResume.validate((err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
