var express = require('express');

var indexController = require('../controllers/www/index');

module.exports = function(app) {
	var router = express.Router();

	app.use('/', router);
};