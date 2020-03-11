const express = require('express'); // importing a CommonJS module
// const morgan = require('morgan');
const helmet = require('helmet'); //step 1: npm i helmet; step 2 - require('helmet')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express(); 


//global middleware
server.use(helmet()); //step 3 use helmet
// server.use(morgan('dev'));//thirdparty, needs to be npm istalled
server.use(logger);
server.use(express.json()); //build-in middleware: no need to npm install
// server.use(addName); //use addName middleware globally

server.use('/api/hubs', hubsRouter);

server.get('/', addName('alexis'), logger, (req, res) => {  //use of addName middleware locally
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome: ${nameInsert}, to the Lambda Hubs API</p>
    `);
});

server.use(function (req, res, next) {
  res.status(400).json({message: "did not find what you're looking for" })
})

//the three amigas
function logger(req, res, next) {
  //log information about the request to the console -> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint}`);
  next(); //moves the request to the next middleware
}

//have value in name, needs to be invoked to get middleware
function addName(name) {
  return function (req, res, next) {
    req.name = name;

    next();
  }
};

//have value in name, no need ot be invoked to get middleware
// function addName(req, res, next) {
//   req.name = "Web 27";

//   next();
// }

module.exports = server;
