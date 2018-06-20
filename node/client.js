/**
 * Client to handle get data from ATMetro server.
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author Matt Wynyard.
 * @since  20th June 2018
 */

"use strict";
const fs = require('fs');

var client = (function() {

    var route = 'https://api.at.govt.nz/v2/gtfs/routes';
    var trip = 'https://api.at.govt.nz/v2/gtfs/trips';
    var  position = "https://api.at.govt.nz/v2/public/realtime/vehiclelocations";
    var request = require('request');  
    
    //set up request options
    var options = {
        url: '',
        method: 'GET',
        accept: "application/json", 
        rejectUnauthorized: false, //stops certificate error
        json: true,
        headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
    };
    var start = Date.now(); 
    var path = "";
    // Start the request
/**
 * Downloads data from ATMetro server and puts in JSON files.
 * 
 * @param String  api  the ATMetro endpoint to get data from.
 */
    function getJSON(api) {

        if (api == "routes") {
            options.url = route;
        } else if (api == "trips") {        
            options.url = trip;
        } else {
            options.url = position;
        }  

        request(options, function(error, response, body) {      
            var time = Date.now() - start;
            var res = body.response
            if (api == "routes" || api == "trips") {
                res = body.response; //get rid of status and error from response
            } else if (api == 'positions' || api == "trip_updates") {
                res = body.response.entity;
                var arr = [];
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
            if (error) { 
                return console.log(error); 
            }
            console.log( '\n' + (Buffer.byteLength(s)/1000).toFixed(2)+ " kilobytes downloaded in: " + (time/1000) + " sec");
            switch (api) {
                case "routes":
                    path = "/Users/matt/FindMyBus/api/model/json/routes.json";
                    break;
                case "trips":
                    path = "/Users/matt/FindMyBus/api/model/json/trips.json";
                    break;
                case "positions":
                    path = "/Users/matt/FindMyBus/api/model/json/positions.json";
                    break;
                default:
                    console.log(path);
                    console.log("error");
                    return 0;
            }

            fs.writeFile(path, s, function(err) {
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
});