const authenticationJWT = require('./authentication');
const authorized = require('./authorized');
const isLogged = require('./isLogged');
const bodySanitizer = require('./bodySanitizer');

module.exports = {
  authenticationJWT,
  authorized,
  isLogged,
  bodySanitizer,
};
