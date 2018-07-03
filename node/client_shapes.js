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

const path = "../api/model/sql/shape.csv";
const pathJSON = "../api/model/json/shapes.json";
var shapes = "https://api.at.govt.nz/v2/gtfs/shapes/shapeId/";
var jsonString = "";

//var requestData = {};

var options = {
    url: '',
    method: 'GET',
    accept: "application/json", 
    rejectUnauthorized: false, //stops certificate error
    json: true,
    headers: {'Ocp-Apim-Subscription-Key': '9b84df205db44253b96dc1fc1fe11df3'}   
};

    var csvData = [];
    var jsonData = "";
    fs.createReadStream(path)
        .pipe(parse({delimiter: ','}))
        .on('data', function(data) {
            csvData.push(data[1]);        
        })
        .on('end',function() {
        var start = Date.now(); 
        var records = csvData.length//2212 objects
        console.log(records);
        //var jsonsDownloaded = 0; // Counter to track complete JSON requests
        //var jsonsFailed = 0; // Counter to handle failed JSON requests
        var dataLength = 1 //set low at moment

        for (var i = 0; i < dataLength; i += 1) {
            var url = shapes + csvData[i];
            options.url = url; //set url query
            //console.log(options.url)
            let promise = new Promise(function(resolve, reject) {
                request(options, function(error, response, body) { 
            if(error){
                console.log(error)
                reject(error);
                return;
            }
            var time = Date.now() - start;
            var s = JSON.stringify(body.response);
            console.log( '\n' + (Buffer.byteLength(s)/1000).toFixed(2)+ 
            " kilobytes downloaded in: " + (time/1000) + " sec");
            //buildJSON(s);
            resolve(s);

        });   
    });
    
    var shapeData = function () {
        promise
             .then(function (fulfilled) {
                //console.log(fulfilled);
                jsonData += fulfilled;
                //console.log(jsonString);

             })
             .catch(function (error) {
                 console.log(error.message);
             });
            }
        //jsonData += shapeData  
    } //end for loo[p
    shapeData();
    //console.log(jsonString)

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
    
    
        








