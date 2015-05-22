var express = require('express');
var path = require('path');

// Application web routes.

module.exports = function(app) {
	var router = express.Router();

	

	/* GET home page. */
	router.get('/', function(req, res, next) {
		// res.render('index', { title: 'Express' });
		var htmlDir = path.resolve('.') + '/public';
		res.sendFile(htmlDir + '/index.html');
	});

	// about page route (http://localhost:8080/about)
	router.get('/about', function(req, res) {
		res.send('I\'m the about page!');
	});

	app.use('/', router);
};