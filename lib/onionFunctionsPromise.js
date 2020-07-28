/*!
 * onionFunctions use promise
 * call functions like onion
 * Copyright(c) 2020 lazilla 
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */
module.exports = onionFunctionsPromise;

/** 
 *   
 * @public
 */
function onionFunctionsPromise() {
    var app = {};
    app.funcs = [];
    //add functions
    app.use = function (fun) {
        app.funcs.push(fun);
    };
    // run functions like onion
    app.run = function (res,req, next) {
        var i=0;
        function next(i) {
            if (app.funcs.length < 1||app.funcs.length==i)
                return Promise.resolve();
            const fun = app.funcs[i];
            return Promise.resolve(fun(res,req,()=>next(i+1)));   //next.bind(null,i+1))
        }
        return Promise.resolve(next(i));
    }
    return app;
}
