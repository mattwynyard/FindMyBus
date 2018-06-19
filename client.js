"use strict";
const fs = require('fs');

var client = (function() {

    var route = 'https://api.at.govt.nz/v2/gtfs/routes';
    var trip = 'https://api.at.govt.nz/v2/gtfs/trips';
    var  position = "https://api.at.govt.nz/v2/public/realtime/vehiclelocations";
    var addr = '';

    var request = require('request');  
    var options = {
        url: addr,
        method: 'GET',
        accept: "application/json", 
        rejectUnauthorized: false, //stops certificate error
        json: true,
        headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
    };
    var start = Date.now(); 
    var path = "";
    // Start the request
    function getJSON(api) {

        if (api == "routes") {
            options.url = route;
        } else if (api == "trips") {        
            options.url = trip;
        } else {
            options.url = position;
        }
        
        request(options, function(error, response, body) {
            //var records = 0;
            
            var time = Date.now() - start;
            var res = body.response
            if (api == "routes" || api == "trips") {
                res = body.response; //get rid of status and error from response
            } else if (api == 'positions' || api == "trip_updates") {
                res = body.response.entity;
                var arr = [];
            //console.log(res[0].vehicle.trip.start_time);
                for (var i = 0; i < res.length; i += 1) { //need to loop res as trip_update is an array          
                    if (res[i].vehicle.trip.start_time > "24:00:00") { //######need to fix times!!!!!
                        console.log(res[i].vehicle.trip.start_time);
                        res[i].vehicle.trip.start_time = null;
                    }
                    arr.push(res[i].vehicle);
                }
                res = arr;
            } else {
                console.log("Error in arguements");
                return 0;
            }
            var s = JSON.stringify(res);
            //console.log(s);
            if (error) { 
                return console.log(error); 
            }
            console.log( '\n' + (Buffer.byteLength(s)/1000).toFixed(2)+ " kilobytes downloaded in: " + (time/1000) + " sec");
            switch (api) {
                case "routes":
                    path = "/Users/matt/FindMyBus/json/routes.json";
                    break;
                case "trips":
                    path = "/Users/matt/FindMyBus/json/trips.json";
                    break;
                case "positions":
                    path = "/Users/matt/FindMyBus/json/positions.json";
                    break;
                default:
                    console.log(path);
                    console.log("error");
                    return 0;
            }
            //console.log(path);
            fs.writeFile(path, s, 'utf-8', function(err) {
                if (err) {
                    return console.log(err);
                } else {
                    var time = Date.now() - start;
                    console.log(res.length + " records written to file: " + path + '\n');
                }
            }); //end write
            }); //end request
    } //end getRoute

    return {
        getJSON: getJSON
    };
})(); //end closure

process.argv.forEach((val, index) => {
    if (index > 1) {
        client.getJSON(val);
    }
    //console.log(`${index}: ${val}`);
  });

//client.get("route");