const UserResume = require('../models/schema/UserResume');

class UserResumeModel {
  constructor(userResumeModel = UserResume) {
    this.db = userResumeModel;
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
module.exports = UserResumeModel;
