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
var parse = require('csv-parse');

const path = "../api/model/json/shapes.csv";
const pathJSON = "../api/model/json/shapes.json";
var shapes = "https://api.at.govt.nz/v2/gtfs/shapes/shapeId/";

var options = {
    url: '',
    method: 'GET',
    rejectUnauthorized: false, //stops certificate error
    accept: "application/json", 
    json: true,
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}    
};

var csvData = [];
var jsonData = "[";
fs.createReadStream(path)
    .pipe(parse({delimiter: ','}))
    .on('data', function(data) {
        csvData.push(data[1]);        
    })
    .on('end',function() {
    
    function requestData(options, start) {
        return new Promise((resolve) => {
   
        request(options, function(error, response, body) {
            
            if (error) {
                console.log(error);
                return;
            }
            var time = Date.now() - start;
            var s = JSON.stringify(body.response);
            console.log( '\n' + (Buffer.byteLength(s)/1000).toFixed(2)+ 
            " kilobytes downloaded in: " + (time/1000) + " sec");
            var newStr = s.substring(1, s.length-1);
            resolve(newStr);
        });
    });
    }

    function callShapes() {
        let promises = [];
        var start = Date.now(); 
        var records = csvData.length //2212 objects
        console.log(records);
        var dataLength = 5 //set low at moment
        for (var i = 0; i < dataLength; i += 1) {
            var url = shapes + csvData[i];
            options.url = url; //set url query
            console.log(url);
            promises.push(requestData(options, start));
        }

        Promise.all(promises)
        .then((results) => {
        console.log("All done");
        let allData = "[" + result + "]"
        writeFile(allData);
        })
        .catch((e) => {
            // Handle errors here
        });
    }

    callShapes();

    function writeFile(jsonData) {
        fs.writeFile(pathJSON, jsonData, function(err) {
            if (err) {
                return console.log(err);
                } else {
                    console.log("file complete")
                }
            });
        }   

    });
    
    
        








