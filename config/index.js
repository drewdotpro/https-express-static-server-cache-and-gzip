'use strict';
var _ = require("lodash");
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./' + env + '.js');
var defaultConfig = require('./default.js');
module.exports = _.defaultsDeep({}, envConfig, defaultConfig);