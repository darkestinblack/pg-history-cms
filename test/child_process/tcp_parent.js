// tcp_parent.js
// parent.js 
var cp = require('child_process'); 
var server = require('net').createServer(); 
var child1 = cp.fork('tcp_worker.js'); 
var child2 = cp.fork('tcp_worker.js'); 
// Open up the server object and send the handle 
server.on('connection', function (socket) { 
 socket.end('handled by parent\n'); 
}); 
server.listen(1337, function () { 
 child2.send('server', server); 
 child1.send('server', server); 
});