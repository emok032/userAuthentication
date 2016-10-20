// Set up JWT Strategy
const passport = require('passport');
const User = require('../models/user');
const config = require('../config/config');
// Passport-Strategy(s): Method(s) for authenticating a user
// (i.e. via JWT or username/password)
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/* 	SIGN-IN  */
// 	CREATING LOCAL Strategy: Verifying E-Mail and Password------------------------------------------------
//	-	Need to tell this Local Strategy where to look for request (for email/password) */
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// Verify email/password - call DONE with User:
	//		(+) Correct Match: Call done==> False
	// 		(-) Incorrect Match: Call done==> True
	User.findOne({ email: email }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		// Next: Need to Cross-reference password (see user model first)
		// - 	After user model method defined - bring in isMatch
		user.comparePassword(password, function(err, isMatch) {
			// Error: Return early, call done
			if (err) { return  done(err); }
			// If search process 'successful' but without match (false)
			if (!isMatch) { return done(null, false)};

			// If match found
			return done(null, user);

		});
	});
});

/* 	SIGN-UP/REGISTER  */
//	SETTING UP options for JWT Strategy-------------------------------------------------------------------
const jwtOptions = {
	// Need to tell JwtStrategy where to look for that JWT Token (which can be stored anywhere on request)
	// In this case, directing it to Header
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	// With JWT Strategy, need to provide it the secret
	secretOrKey: config.secret
};

//  CREATING JWT Strategy---------------------------------------------------------------------------------
// 	(Decoded JWT Token) 'payload' - (see controllers/authentication.js)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if user ID IN PAYLOAD exist in DB
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

// Lastly, telling passport to use the ABOVE strategies-----------------------------------------------------
// For SIGN-UP
passport.use(jwtLogin);
// For SIGN-IN
passport.use(localLogin);