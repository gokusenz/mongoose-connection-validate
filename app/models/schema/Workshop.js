/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
}, {
  versionKey: false,
});
const workshopModel = mongoose.model('workshop', WorkshopSchema);

module.exports = workshopModel;
