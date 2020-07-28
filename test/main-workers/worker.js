// worker.js 
const http = require('http');
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('handled by child, pid is ' + process.pid + '\n');
});
process.on('message', function (m, tcp) {
    if (m === 'server') {
        tcp.on('connection', function (socket) {
            server.emit('connection', socket);
        });
    }
});
process.on("uncaughtException", function (params) {
    logger.error(err);
    process.send({ act: 'suicide' });
    worker.close(function () {
        process.exit(1);
    });
    setTimeout(function () {
        process.exit(1);
    }, 5000);
});