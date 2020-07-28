// test.js
const cp = require("child_process");
var worker = cp.fork("worker.js");
worker.on("close", function (params) {
    debugger;
});
worker.on("exit", function (params) {
    debugger;
});
worker.on("disconnect", function (params) {
    debugger;
});
worker.on("message", function (params) {
    debugger;
});
worker.exit();
