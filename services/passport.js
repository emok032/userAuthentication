// Set up JWT Strategy
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passoport-jwt').ExtractJwt;

// *Passport-Strategy(s): Method(s) for authenticating a user
// (i.e. via JWT or username/password)

//  SETTING UP options for JWT Strategy-------------------------------------------------------------------
const jwtOptions = {};

//  CREATING JWT Strategy---------------------------------------------------------------------------------
// 	------(Decoded JWT Token) 'payload' - (see controllers/authentication.js)
const jwtLogin = new JwtStrategy(jwtOptions, function({payload, done) {
	// See if user ID IN PAYLOAD exist in DB--------------------------------------------------------------
	// 		(+): call 'done' WITH a user object
	// 		(-): call 'done' WITHOUT a user object
	User.findById(payload.sub, function(err, user) {
		// if WITH ERROR (no - user object)
		if (err) { 
			// 'unsuccessful' search process(err): return error object;
			return done(err, false);
			// err (returning error object)
			// false (user object if we did NOT found one)
		}
		// if WITHOUT ERROR (yes - user object)
		if (user) {
			// 'successful' search process(null): return (user); no error object to return;
			done(null, user);
		} else {
			// 'successful' search process(null) - but user NOT found (false); no error object to return;
			done(null, false);
		}
	});
});
