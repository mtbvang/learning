var express = require('express');

//API routes

module.exports = function(app) {
	var router = express.Router();

	// route middleware that will happen on every request
	router.use(function(req, res, next) {

		// log each request to the console
		console.log(req.method, req.url);

		// continue doing what we were doing and go to the route
		next();
	});

	/* GET api route */
	router.get('/', function(req, res, next) {
		res.send('respond with an api resource');
	});
	
	app.use('/api', router);
};
