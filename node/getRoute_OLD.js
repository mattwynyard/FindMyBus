"use strict";

const request = require('request');
const fs = require('fs');

var options = {
    url: 'https://api.at.govt.nz/v2/gtfs/routes',
    method: 'GET',
    accept: 'application/json',
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
};

var path = "/Users/matt/FindMyBus/routes.json";
var ws = fs.createWriteStream(path);
var d = new Date();
var start = d.getTime();
// Start the request
request(options).on('error', function (error) {
    console.log(error);
  }).on('close', function () {
    console.log('Done');
    console.log(d.getTime() - start);
  }).pipe(ws);
  console.log(d.getTime() - start);