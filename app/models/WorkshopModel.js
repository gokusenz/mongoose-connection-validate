const Workshop = require('../models/schema/Workshop');

class WorkshopModel {
  constructor(workshopModel = Workshop) {
    this.db = workshopModel;
  }

  getUsername(params) {
    return this.db.find(params);
  }
}
module.exports = WorkshopModel;
