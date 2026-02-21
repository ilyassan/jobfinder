const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(middlewares);
server.use(router);

module.exports = server;
