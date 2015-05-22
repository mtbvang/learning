var express = require('express');

module.exports = function() {
	var router = express.Router();

	// authenticated user routes

	// route middleware to validate :name
	router.param('name', function(req, res, next, name) {
		// do validation on name here
		// blah blah validation
		// log something so we know its working
		console.log('doing name validations on ' + name);

		// once validation is done save the new item in the req
		req.name = name;
		// go to the next thing
		next();
	});

	/* GET users listing. */
	router.get('/:name', function(req, res, next) {
		res.send('user name: ' + req.name);
	});
	
	app.use('/user', router);
};
