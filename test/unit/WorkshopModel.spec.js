/* eslint-env mocha */
const expect = require('chai').expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
require('sinon-mongoose');
const WorkshopModel = require('../../app/models/WorkshopModel');
const WorkshopSchema = require('../../app/models/schema/Workshop');

describe('Workshop Model', () => {
  let mockWorkshopModel;
  beforeEach(() => {
    mockWorkshopModel = sinon.mock(WorkshopSchema);
  });

  afterEach(() => {
    mockWorkshopModel.restore();
  });

  it('Find by username: return Object Success', () => {
    const params = {
      username: 'new',
    };
    const expected = {
      username: 'new',
    };

    mockWorkshopModel
      .expects('find')
      .returns(expected);

    const workshopModel = new WorkshopModel();
    const result = workshopModel.getUsername(params);
    expect(result).to.deep.equal(expected);
    sinon.mock(WorkshopSchema).restore();
  });

  it('Find by username: return Object Fail', () => {
    const params = {
      username: 'new',
    };
    const expected = new Error('error');
    mockWorkshopModel
      .expects('find')
      .returns(expected);

    const workshopModel = new WorkshopModel();
    const result = workshopModel.getUsername(params);
    expect(result).to.be.an('error');
  });
});
