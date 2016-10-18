const mongoose = require('mongoose');
// Schema is used to tell Mongoose what fields will exist
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Defining ('User') MODEL
const userSchema = new Schema({
	email: { 
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

// On SAVE HOOK, encrypt password
userSchema.pre('save', function(next) {
	
	// accessing (this) user model
	const user = this;

	// generate a 'salt'--> run Callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next (err);
		}

		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next (err);
			}
			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});
// Creating ('User') MODEL CLASS - Is a "class" of users
const UserModelClass = mongoose.model('user', userSchema);


// Exporting ('User') MODEL
module.exports = UserModelClass;

