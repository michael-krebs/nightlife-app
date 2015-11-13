'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var YelpController = require(path + '/app/controllers/yelpController.server.js');
var BarHandler = require(path + '/app/controllers/barsHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var yelpController = new YelpController();
	var barHandler = new BarHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/index.jade');
		});

	app.route('/login')
		.get(function (req, res) {
			res.render(path + '/public/login.jade');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/api/yelp/:location')
		.get(function(req, res) {
			yelpController.request_yelp({location: req.params.location}, function(error, response, body) {
				res.json(body)
			});
		});
	
	app.route('/api/bar/:barid')
		.get(isLoggedIn, barHandler.getInitialUsers)
		.post(isLoggedIn, barHandler.goingBtnClicked)

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
