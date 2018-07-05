'use strict';
const fs = require('fs');

try {  
    var data = JSON.parse(fs.readFileSync('./shapes_routes.json', 'utf8'));
    //console.log(data); 
    console.log(data.length);
    var dataString = []
    for (var i = 0; i <= data.length; i += 1) {
        dataString.push(data[i]);
        if (i % 10000 == 0 && i != 0) {    
            console.log(dataString.length);
            console.log('writing.. ./filechunks/shapes_routes' + (i / 10000) + '.json');
            fs.writeFileSync('./filechunks/shapes_routes' + (i / 10000) + '.json', JSON.stringify(dataString));
            dataString = [];
        } else if(i == data.length - 1) { //last chunk
            console.log(dataString.length);
            console.log('./filechunks/shapes_routes' + (Math.ceil(i / 10000)) + '.json');
            fs.writeFileSync('./filechunks/shapes_routes' + (Math.ceil(i / 10000)) + '.json', JSON.stringify(dataString));
        } else {
            continue;
        }
    }
} catch(e) {

    console.log('Error:', e.stack);
}