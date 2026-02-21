const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const dbPath = path.join(__dirname, '../db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(middlewares);
server.use(router);

module.exports = server;
