(function () {
    'use strict';

    //Get our config
    var config = require("./config");

    //Some utils
    var fs = require("fs");
    var path = require('path');

    //Set up some logging
    var log = require('winston');
    log.add(log.transports.File, {filename: config.logging.path, 'timestamp': true, colorize: true, json: false});
    log.level = config.logging.level;

    //Set up Express
    var express = require('express');
    var expressWinston = require('express-winston');
    var createStatic = require('connect-static');
    var app = express();

    //Attach our logging into Express
    app.use(expressWinston.logger({
        transports: [
            new log.transports.File({filename: config.logging.path, 'timestamp': true, colorize: true, json: false}),
            new log.transports.Console({'timestamp': true, colorize: true})
        ],
        skip: function (req, res) {
            return ['info', 'verbose', 'debug', 'silly'].indexOf(config.logging.level) === -1;
        }
    }));

    //OK, let's go
    log.info("Logging started");

    var startServer = function () {

        //Put in some middleware to deal with anything that fell through the request for a static file

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        app.use(function (err, req, res, next) {
            //If something went very wrong somewhere
            if (err.status === 500) {
                log.error(err);
            }
            res.sendStatus(err.status || 500);
        });

        //Set up either HTTPS or HTTP protocol
        var protocol;
        if (config.server.https) {
            protocol = require("https").createServer({
                key: fs.readFileSync(config.server.https.key),
                cert: fs.readFileSync(config.server.https.cert)
            }, app);
        } else {
            protocol = require("http").createServer(app);
        }

        //Start out Server
        var server = protocol.listen(config.server.port, config.server.listen ? config.server.listen : config.server.host, function () {
            var host = server.address().address;
            var port = server.address().port;
            log.info('Static File Server listening at %s://%s:%s', (config.server.https ? "https" : "http"), host, port);
        });
    };

    //OK initialise caching and start the server
    createStatic(config.cache, function (err, middleware) {
        if (err){
            log.error(err);
            throw err;
        }
        app.use('/', middleware);
        startServer();
    });

}());