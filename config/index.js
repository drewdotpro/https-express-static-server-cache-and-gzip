'use strict';
var _ = require("lodash");

//Find our environment config and merge it with the defaults
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./' + env + '.js');
var defaultConfig = require('./default.js');
module.exports = _.defaultsDeep({}, envConfig, defaultConfig);