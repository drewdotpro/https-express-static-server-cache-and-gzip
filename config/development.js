(function () {
    'use strict';
    var config = {
        server: {
            host: 'localhost',
            port: 8890,
            https: {
                key: '/etc/ssl/private/ssl-cert-snakeoil.key',
                cert: '/etc/ssl/certs/ssl-cert-snakeoil.pem'
            },
            listen: "0.0.0.0"
        },
        logging: {
            path: './log/development-ui.log',
            level: 'silly'
        }
    };
    module.exports = config;
}());