// worker.js
var http = require('http');
var rand;
rand = Math.round((1 + Math.random()) * 1000);
console.log(rand);
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(process.pid + ":" + process.ppid);  
    process.send({ from: "main ", pid: process.pid });  
    console.log(req.url)
}).listen(rand, '127.0.0.1');
process.on("message", function (msg) {
    console.log("Worker Process: "+"Pid:"+process.pid+"message:" + msg+" from"+msg.pid);
});   