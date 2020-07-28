
const http = require('http');
const onion = require("./lib/onionFunctionsPromise")
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = onion();
//app.use(funA);
//app.use(funB);
app.use(funC);
//http.createServer(app.run).listen(8000);

function funA(req, res, next) {
  next()
}
function funB(req, res, next) {
  next()
}
function funC(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("hello world!");
  next()
  //throw("error");
  setTimeout(() => {
    throw ('error1');
  }, 100);
}

process.on('uncaughtException', (e) => {
  console.log(e);
});

if (cluster.isMaster) {
  //console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  // http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.end('hello world\n');
  // }).listen(8000); 
  http.createServer(app.run).listen(8000);
  console.log(`Worker ${process.pid} started`);
}
 