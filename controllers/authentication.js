exports.signup = function(req, res, next) {
	
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	// Verify: email is unique

	// Action (-): If duplicate exists, RETURN ERROR

	// Action (+): If unique email entry, CREATE & SAVE new user record

	// Response--> Request: Confirm User Created

}