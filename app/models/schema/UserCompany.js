/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const autoincrement = require('mongoose-auto-increment');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
autoincrement.initialize(mongoose.connection);

const UserCompanySchema = new Schema({
  id: { type: Number },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, trim: true },
}, {
  versionKey: false,
});
UserCompanySchema.plugin(autoincrement.plugin, { model: 'user_company', startAt: 1 });
UserCompanySchema.plugin(findOrCreate);
const userCompanyModel = mongoose.model('user_company', UserCompanySchema);

module.exports = userCompanyModel;
