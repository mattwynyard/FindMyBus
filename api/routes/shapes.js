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
    res.status(200).json({
    message: "hello from shape server)"
    });
});

router.get('/:shape', (req, res, next) => {
    var shape = req.params.shape;
    shape = shape.toUpperCase();
    var myJSON = {};
    var data = fs.readFileSync('./api/model/json/shape_shortname.json', 'utf-8'); //json file containing data
    data = JSON.parse(data);
    var arr = []

    for (var i = 0; i < data.length; i += 1) {
        if (data[i].route_short_name === shape) {
            var myJSON = {name: '', id: '', pt: '', lat: '', lon: ''};
            myJSON.name = data[i].route_short_name;
            myJSON.id = data[i].shape_id;
            myJSON.pt = data[i].shape_pt_sequence;
            myJSON.lat = data[i].shape_pt_lat;
            myJSON.lon = data[i].shape_pt_lon;
            arr.push(myJSON);
        }
    }
    res.status(200).json({
        message: arr
    });
});

module.exports = router;