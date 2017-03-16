/* eslint-env mocha */
const Workshop = require('../../app/models/schema/Workshop');
const chai = require('chai');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const expect = chai.expect;

describe('WorkShop Schema', () => {
  it('should be success', (done) => {
    const input = {
      username: 'new',
    };
    const workshop = new Workshop(input);
    workshop.validate((err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
