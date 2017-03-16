/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const autoincrement = require('mongoose-auto-increment');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
autoincrement.initialize(mongoose.connection);

const UserResumeSchema = new Schema({
  id: { type: Number },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, trim: true },
}, {
  versionKey: false,
});
UserResumeSchema.plugin(autoincrement.plugin, { model: 'user_resume', startAt: 1 });
UserResumeSchema.plugin(findOrCreate);
const userResumeModel = mongoose.model('user_resume', UserResumeSchema);

module.exports = userResumeModel;
