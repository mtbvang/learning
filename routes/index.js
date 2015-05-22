var express = require('express');
var path = require('path');

var apiRoutes = require('./api');
var webRoutes = require('./www');

module.exports = function(app) {
	apiRoutes(app);
	webRoutes(app);
};