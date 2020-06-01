// application
'use strict';
import http from "http";
import fs from "fs";

class App {
    constructor(public server: Object) {
        this.server = server;
    }
}
const app=new App(http.createServer());
 

