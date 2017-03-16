const UserCompany = require('../models/schema/UserCompany');

class UserCompanyModel {
  constructor(userCompanyModel = UserCompany) {
    this.db = userCompanyModel;
  }
  findOrCreate(query, create) {
    return new Promise((resolve, reject) => {
      this.db.findOrCreate(query, create, (err, data) => {
        if (err !== null) return reject(err);
        return resolve(data);
      });
    });
  }
}
module.exports = UserCompanyModel;
