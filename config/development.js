(function () {
    'use strict';
    module.exports = {
        server: {
            host: 'localhost', //host
            port: 8080, //port to listen on
            https: {
                key: '/etc/ssl/private/ssl-cert-snakeoil.key', //your SSL private key
                cert: '/etc/ssl/certs/ssl-cert-snakeoil.pem' //your SSL certificate
            },
            listen: "0.0.0.0" //Interfaces to listen on
        },
        logging: {
            path: './log/development-static-server.log', //where to put your log file
            level: 'silly' //Winston Log Level
        }
    };
}());