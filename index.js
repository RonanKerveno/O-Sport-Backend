require('dotenv').config();
const debugServer = require('debug')('server');
const http = require('http');
const app = require('./app/app');



const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  debugServer(`Server launched at http://localhost:${port}`);
});