// main.js 
const child_process = require('child_process');
const onion = require("../../lib/onionFunctionsPromise");
const cpus = require('os').cpus();
// const app = onion(); 
// app.use((req, res, next) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(process.pid);
//     next();
//     setTimeout(() => {
//         throw (process.pid, ': error');
//     }, 10000);
// });

for (let i = 0; i < cpus.length; i++) {
    let worker = child_process.fork('./worker.js');  
    worker.on("message", function (msg) {
        console.log("Main Process: "+"Pid:"+process.pid+"message:" + msg+" from"+msg.pid);        
    });
    worker.send({msg:"main to worker ",pid:process.pid});
}

