"use strict";

var server = (function() {


    const http = require('http');
    const port = process.env.PORT || 3000;
    const os = require('os');
    const ifaces = os.networkInterfaces();
    var address = '127.0.0.1'; //getIPAddress();
    const app = require('./app'); //import app.js
    const server = http.createServer(app);

    server.on('request', (request, response) => {
        const { headers } = request;
        const userAgent = headers['user-agent'];
        console.log(userAgent);
      });

    function useLAN(val) {
        if (val === true) {
            address = getIPAddress();
            server.listen(3000, address);
        console.log('Listening at http://' + address + ':' + port);
        } else {
            server.listen(3000, address);
        console.log('Listening at http://' + address + ':' + port);
        }
    }

    function getIPAddress() {
        var addr = '';
        Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
            }
            if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            //console.log(ifname + ':' + alias, iface.address);
            } else if (ifname == "en0") {
                addr = iface.address;
            } else {

                return 0;
            }
            // this interface has only one ipv4 adress
            //console.log(ifname, iface.address);
            ++alias;
        });
        
        });
        return addr;;
    } //end getIPAddress()
    return {
        useLAN: useLAN
    };
})();//end closure

process.argv.forEach((val, index) => {
    if (index == 2 && val == "-lan") {
        server.useLAN(true);
    } else if (index == 2 && val == "-local") {
        server.useLAN(false);
    } else {
        return 0;
    }
});



