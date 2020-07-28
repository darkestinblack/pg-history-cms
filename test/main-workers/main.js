// main.js 
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();
server.listen(10086);
// 重启ْ数
var limit = 10;
// 时间单位
var during = 60000;
var restart = [];
var isTooFrequently = function () {
    // ऻ录重启时间
    var time = Date.now();
    var length = restart.push(time);
    if (length > limit) {
        // ൽ出ፌࢫ10߲ऻ录
        restart = restart.slice(limit * -1);
    }
    // ፌࢫᅃْ重启ڟ前10ْ重启ኮ间的时间间߰
    return restart.length >= limit && restart[restart.length - 1] - restart[0] < during;
};
var workers = {};
var createWorker = function () {
    // 检查是否໿过ೕݏ
    if (isTooFrequently()) {
        process.emit('giveup', length, during);
        return;
    }
    var worker = fork('worker.js');
    worker.on('exit', function () {
        console.log('Worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
    });
    // 重ႎ启动ႎ的进程
    worker.on('message', function (message) {
        if (message.act === 'suicide') {
            createWorker();
        }
    });
    // 句柄转发
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('Create worker. pid: ' + worker.pid);
};

for (var i = 0; i < cpus.length; i++) {
    createWorker();
}
// 进程自मཽ出时ǈඟ໯有工作进程ཽ出
process.on('exit', function () {
    for (var pid in workers) {
        workers[pid].kill();
    }
});
