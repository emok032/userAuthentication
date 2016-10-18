const Authentication = require('../controllers/authentication');

module.exports = function(app) {

// request: incoming
// response: outgoing (what handle in response to user request)
// next: for error handling

	app.post('/signup', Authentication.signup);
		// function Authentication (see controller)
}