//worker.js
var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('handled by child, pid is ' + process.pid + '\n');
});
var worker;
process.on('message', function (m, tcp) {
    if (m === 'server') {
        worker = tcp;
        worker.on('connection', function (socket) {
            server.emit('connection', socket);
        });
    }
});
process.on('uncaughtException', function (err) {
    // ऻ录日志
    logger.error(err);
    // 发ໃ自෫信ࡽ
    process.send({ act: 'suicide' });
    // ཕኹ接收ႎ的૶接
    worker.close(function () {
        // ໯有ᅙ有૶接܏开ࢫǈཽ出进程
        process.exit(1);
    });
    // 5௱ࢫཽ出进程
    setTimeout(function () {
        process.exit(1);
    }, 5000);
});