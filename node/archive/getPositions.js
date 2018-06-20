"use strict";

const request = require('request');
const fs = require('fs');

var options = {
    url: 'https://api.at.govt.nz/v2/public/realtime/vehiclelocations',
    method: 'GET',
    accept: 'application/json',
    json: true,
    rejectUnauthorized: false,
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
};

// Start the request
request(options, function(error, response, body) {
    var res  = body.response.entity; //get rid of status and error from response
    //console.log(res[0].vehicle);
    var count = 0;
    var arr = [];
    //console.log(res[0].vehicle);
    for (var i = 0; i < res.length; i += 1) { //need to loop res as trip_update is an array
        
        if (res[i].vehicle.trip.start_time > "24:00:00") { //######ned to fix times!!!!!
            console.log(res[i].vehicle.trip.start_time);
            res[i].vehicle.trip.start_time = null;
        }
        arr.push(res[i].vehicle);
        count += 1;
    }
    //console.log(arr);
    console.log(count);
    var s = JSON.stringify(arr);
    //console.log(s);
    if (error) { 
        return console.log(error); 
    }
    //var obj = JSON.parse(clean);
    var path = "/Users/matt/FindMyBus/json/positions.json";
    fs.writeFile(path, s, 'utf-8', function(err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('File saved');
        }
    });
});