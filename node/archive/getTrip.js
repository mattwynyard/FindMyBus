"use strict";

const request = require('request');
const fs = require('fs');

var options = {
    url: 'https://api.at.govt.nz/v2/gtfs/trips',
    method: 'GET',
    accept: 'application/json',
    rejectUnauthorized: false, 
    json: true,
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
};
// Start the request
request(options, function(error, response, body) {
    var res  = body.response; //get rid of status and error from response
    //console.log(res);
    console.log(res.length);
    var s = JSON.stringify(res);
    if (error) { 
        return console.log(error); 
    }
    var path = "/Users/matt/FindMyBus/trips.json";
    fs.writeFile(path, s, 'utf-8', function(err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('File saved');
        }
    });
});