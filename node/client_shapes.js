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
var api = "https://api.at.govt.nz/v2/gtfs/shapes/shapeId/";

//var requestData = {};

var csvData=[];
fs.createReadStream(path)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //console.log(csvData.length);
    });

console.log(csvData.csvrow)

for (var i = 0; i < csvData.length; i += 1) {
    console.log(csvData[i]);
}
    // request(options, function(error, response, body) {      
    //     var time = Date.now() - start;
