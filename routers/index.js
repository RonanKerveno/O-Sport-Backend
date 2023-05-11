/* eslint-disable func-names */

// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const app = express.Router();

const usersController = require('./users');

module.exports = function () {
  console.log('youhou');
  app.use('/users', usersController);
  
  /*
  const eventsCtrl = require('./events');
  const sportsCtrl = require('./sports');
  */
  /*
  app.use('/events', eventsCtrl)
  app.use('/sports', sportsCtrl);
  */
};