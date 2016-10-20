const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	// Setting Route Handler to handle .GET request to root ('/')
	// Any incoming request must pass through requireAuth to continue
	app.get('/', requireAuth, function(req, res) {
		res.send({ User: 'Successfully Authenticated for Root Route' });
	});
	app.post('/signin', requireSignin, Authentication.signin);

	app.post('/signup', Authentication.signup);
}