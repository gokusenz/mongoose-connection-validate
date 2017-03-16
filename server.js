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

const options = {
  db: { native_parser: true },
  replset: {
    auto_reconnect: false,
    poolSize: 10,
    socketOptions: {
      keepAlive: 120,
      connectTimeoutMS: 30000,
    },
  },
  server: {
    poolSize: 10,
    socketOptions: {
      keepAlive: 120,
      connectTimeoutMS: 30000,
    },
  },
};

mongoose.connect(database, options).connection;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

if (task !== 'test') {
  app.listen(port);
}

module.exports = app;
