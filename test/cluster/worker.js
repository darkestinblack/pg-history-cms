var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers 
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
    
} else {
    // Workers can share any TCP connection  
    // In this case its a HTTP server 
    process.on("uncaughtException", function () {      
        console.log('worker ' + process.pid + ' error');
    });
    http.createServer(function (req, res) { 
        res.writeHead(200);
        res.end(""+process.pid);
    }).listen(8000);
}