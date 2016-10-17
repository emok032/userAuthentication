module.exports = function(app) {

// request: incoming
// response: outgoing (what handle in response to user request)
// next: for error handling

	app.get('/', function(req, res, next) {
		res.send(['I', 'received', 'four', 'objects']);
	});
}