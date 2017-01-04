var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String },
	fname: { type: String },
	lname: { type: String },
	role: { type: String, default: 'user' },
	created_at: { type: Date },
	updated_at: { type: Date }
});

userSchema.pre('save', function(next) {
	// get current date
	var currentDate = new Date();

	// change updated_at to current date
	this.updated_at = currentDate;

	// if created_at is not filled, set to current date
	if (!this.created_at) {
		this.created_at = currentDate;
	}

	console.log('User successfully created!');
	next();
});

var User = mongoose.model('User', userSchema)

module.exports = User;
