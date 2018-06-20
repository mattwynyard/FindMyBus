//"use strict";
const http = require('http');
let port = process.env.PORT || 3000;
let host = '127.0.0.1';
//var express = require('express');
const app = require('./app');

http.createServer(app).listen(port);
console.log('Listening at http://' + host + ':' + port);

//module.exports = app

