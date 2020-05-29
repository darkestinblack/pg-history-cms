// application
'use strict';
import http from "http";

const app = exports = module.exports = {};

app.config = {};

const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("hello http!");
    res.end();
}).listen(8088);


