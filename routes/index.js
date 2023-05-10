const usersCtrl = require('./users');
const eventsCtrl = require('./events');
const sportsCtrl = require('./sports');

module.exports = function(app){
    app.use('/users', usersCtrl)
    app.use('/events', eventsCtrl)
    app.use('/sports', sportsCtrl);
}