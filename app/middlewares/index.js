const authenticationJWT = require('./authentication');
const authorized = require('./authorized');
const bodySanitizer = require('./bodySanitizer');

module.exports = {
  authenticationJWT,
  authorized,
  bodySanitizer,
};
