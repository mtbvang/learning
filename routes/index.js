var express = require('express');
var path = require('path');

var userRoutes = require('./user');
var apiRoutes = require('./api');
var webRoutes = require('./www');

module.exports = function(app) {
	userRoutes(app);
	apiRoutes(app);
	webRoutes(app);
};