(function () {
    'use strict';
    var config = require("./config");
    var log = require('winston');
    log.add(log.transports.File, {filename: config.logging.path, 'timestamp': true, colorize: true, json: false});
    log.level = config.logging.level;
    var express = require('express');
    var expressWinston = require('express-winston');
    var createStatic = require('connect-static');
    var app = express();
    app.use(expressWinston.logger({
        transports: [
            new log.transports.File({filename: config.logging.path, 'timestamp': true, colorize: true, json: false}),
            new log.transports.Console({'timestamp': true, colorize: true})
        ],
        skip: function (req, res) {
            return ['info', 'verbose', 'debug', 'silly'].indexOf(config.logging.level) === -1;
        }
    }));
    log.info("Logging started");
    var fs = require("fs");
    var path = require('path');

    var startServer = function(){
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers

        app.use(function (err, req, res, next) {
            if(err.status === 500){
                log.error(err);
            }
            res.sendStatus(err.status || 500);
        });
        module.exports = app;
        var protocol;
        if (config.server.https) {
            protocol = require("https").createServer({
                key: fs.readFileSync(config.server.https.key),
                cert: fs.readFileSync(config.server.https.cert)
            }, app);
        } else {
            protocol = require("http").createServer(app);
        }

        var server = protocol.listen(config.server.port, config.server.listen ? config.server.listen : config.server.host, function () {
            var host = server.address().address;
            var port = server.address().port;
            log.info('UI listening at %s://%s:%s', (config.server.https ? "https" : "http"), host, port);
        });
    };

    createStatic(config.cache, function (err, middleware) {
        if (err) throw err;
        app.use('/', middleware);
        startServer();
    });

}());