/* eslint-disable func-names */

// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const router = express.Router();

const userRouter = require('./user');
const eventRouter = require('./event');
const sportRouter = require('./sport');

module.exports = function (app) {
  app.use('/user', userRouter);
  app.use('/event', eventRouter);
  app.use('/sport', sportRouter);
};
