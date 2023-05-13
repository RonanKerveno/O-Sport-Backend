const userRouter = require('./user');
const eventRouter = require('./event');
const sportRouter = require('./sport');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/events', eventRouter);
  app.use('/sports', sportRouter);
};
