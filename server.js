require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const configMongo = require('./config/mongoose');

const task = process.env.NODE_ENV || 'development';
const port = process.env.NODE_PORT || 8080;
const app = express();
const models = join(__dirname, 'app/models');

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

app.use(require('express-validator')());

// Bootstrap routes
require('./config/express')(app);
require('./app/routes')(app);

const database = `${configMongo.db.host}:${process.env.DB_PORT || 27017}/${configMongo.db.database}`;

mongoose.Promise = require('bluebird');

mongoose.connect(database).connection;

if (task !== 'test') {
  app.listen(port);
}

module.exports = app;
