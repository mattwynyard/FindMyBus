/**
 * Router to handle get requests.
 *
 * Handels position/[query] to serve JSON of bus requested.
 * Reads data from json file and searches for the supplied query.
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author Matt Wynyard.
 * @since  x.x.x
 */
  
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.status(200).json({
    message: "hello from server)"
    });
});

router.get('/:bus', (req, res, next) => {
   var bus = req.params.bus;
    bus = bus.toUpperCase();

    var myJSON = {};
    var data = fs.readFileSync('./api/model/json/bus.json', 'utf-8'); //json file containing data
    data = JSON.parse(data);
    var arr = []

    for (var i = 0; i < data.length; i += 1) {
        var myJSON = {bus: '', vehicle_id: '', latitude: '',longitude: '', bearing: '',direction_id: ''} ;
        if (data[i].route_short_name === bus) {
            myJSON.bus = data[i].route_short_name;
            myJSON.vehicle_id = data[i].vehicle_id;
            myJSON.latitude = data[i].latitude;
            myJSON.longitude = data[i].longitude;
            myJSON.bearing = data[i].bearing;
            myJSON.direction_id = data[i].direction_id;
            arr.push(myJSON);
        }
    }
    res.status(200).json({
        message: arr
    });
});

module.exports = router;
