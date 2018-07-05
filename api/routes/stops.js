/**
 * Router to handle get requests.
 *
 * Handels position/[query] to serve JSON of bus requested.
 * Reads data from json file and searches for the supplied query.
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author Matt Wynyard.
 * @since  July 2018.
 */

'use strict'
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
    var myJSON = {};
    var data = fs.readFileSync('./api/model/json/stops.json', 'utf-8'); //json file containing data
    data = JSON.parse(data);
    var arr = []

    for (var i = 0; i < data.length; i += 1) {
        var myJSON = {stop_id: '', stop_name: '', stop_code: '', latitude: '', longitude: ''} ;
            myJSON.stop_id = data[i].stop_id;
            myJSON.stop_name = data[i].stop_name;
            myJSON.stop_code = data[i].stop_code;
            myJSON.latitude = data[i].stop_lat;
            myJSON.longitude = data[i].stop_lon;

            arr.push(myJSON);
    }
    res.status(200).json({
        message: arr
    });
});

module.exports = router;