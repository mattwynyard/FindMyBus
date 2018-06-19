http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    if (req.method == 'POST') {
        console.log("POST");
        var body= '';
        req.on('data', function (data) {
            body += data;
            //console.log("Partial body: " + body);
        });
        req.on('end', function () {
            var myJSON = {latitude: '',longitude: ''};
            res.writeHead(200, {'Content-Type': 'application/json'});
            var html = fs.readFileSync('bus.json', 'utf-8');
            html = JSON.parse(html);
            var arr = [];
            
            console.log(body.substring(4, body.length));
            var bus = body.substring(4, body.length);
            bus = bus.toUpperCase();
            for (var i = 0; i < html.length; i += 1) {
                var myJSON = {bus: '', vehicle_id: '', latitude: '',longitude: '', bearing: '',direction_id: ''} ;
                if (html[i].route_short_name == bus) {
                    myJSON.bus = html[i].route_short_name;
                    myJSON.vehicle_id = html[i].vehicle_id;
                    myJSON.latitude = html[i].latitude;
                    myJSON.longitude = html[i].longitude;
                    myJSON.bearing = html[i].bearing;
                    myJSON.direction_id = html[i].direction_id;
                    arr.push(myJSON);
                }
            }
        res.end(JSON.stringify(arr));
        });
    }
    else
    {
        console.log("GET");
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);