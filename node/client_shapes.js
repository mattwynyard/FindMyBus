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
const request = require('request'); 
const parse = require('csv-parse');
const colours = require('colors');

const path = "../api/model/json/shapes.csv";
const pathJSON = "../api/model/json/shapes_routes.json";
var shapes = "https://api.at.govt.nz/v2/gtfs/shapes/shapeId/";

var options = {
    url: '',
    method: 'GET',
    rejectUnauthorized: false, //stops certificate error
    accept: "application/json", 
    json: true,
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}    
};

var shapeCodes = [];
var routeCodes = [];
var timeCounter = 0;
var fileSize = 0;
var records = 0;
fs.createReadStream(path)
    .pipe(parse({delimiter: ','}))
    .on('data', function(data) {
        shapeCodes.push(data[1]); 
        routeCodes.push(data[0]);       
    })
    .on('end',function() {
    
    function requestData(options, routeCode, start, count) {
        return new Promise((resolve) => { 
        request(options, function(error, response, body) {         
            if (error) {
                console.log(error);
                return;
            }

            var runTime = Date.now() - start;
            var time = runTime - timeCounter;
            timeCounter = runTime;
            //console.log(body.response.length);
            for (var i = 0; i < body.response.length; i += 1) {
                body.response[i].route_id = routeCode;
            }
            var s = JSON.stringify(body.response);
            //console.log(s);
            fileSize = fileSize += parseFloat((Buffer.byteLength(s)/1000).toFixed(2))
            console.log( '\n' + ((Buffer.byteLength(s)/1000).toFixed(2)).green + 
            "kB".green + " downloaded in: " + (time/1000).toFixed(2).green + " secs".green);
            var newStr = s.substring(1, s.length-1);
            console.log(((count / records) * 100).toFixed(2).yellow + "%".yellow + " downloaded with a total filesize of " + 
                (fileSize/1000).toFixed(2).yellow + " Mbytes".yellow);
            resolve(newStr);
            console.log(count.toString().cyan + " files".cyan + " downloaded with a total run time of: " 
            + (runTime/1000).toFixed(2).cyan + " sec".cyan + '\n');
        });
    });
    }

    async function callShapes() {
        let promises = [];
        var start = Date.now(); 
        records = shapeCodes.length    
        var count = 0;
        var dataLength = records //records//set low at moment
        console.log("Downloading... " + dataLength.toString().yellow + " files".yellow);
        for (var i = 0; i < dataLength; i += 1) {
            var url = shapes + shapeCodes[i];
            var routeCode = routeCodes[i];
            options.url = url; //set url query
            console.log('Processing url... ' + url);
            await sleep(2000)
            //console.log('Two second later');
            count += 1;
            promises.push(requestData(options, routeCode, start, count));
        }

        Promise.all(promises)
        .then((results) => {
        console.log("Processing results...." + '\n');
        let allData = "[" + results + "]"
        writeFile(allData);
        })
        .catch((e) => {
            // Handle errors here
            console.log("Error writing file");
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    callShapes();

    function writeFile(jsonData) {
        fs.writeFile(pathJSON, jsonData, function(err) {
            if (err) {
                return console.log(err);
                } else {
                    console.log("JSON file written")
                }
            });
        }   

    });
    
    
        








