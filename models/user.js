const mongoose = require('mongoose');
// Schema is used to tell Mongoose what fields will exist
const Schema = mongoose.Schema;

// Defining ('User') MODEL
const userSchema = new Schema({
	email: { 
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

// Creating ('User') MODEL CLASS - Is a "class" of users
const UserModelClass = mongoose.model('user', userSchema);


// Exporting ('User') MODEL
module.exports = UserModelClass;
