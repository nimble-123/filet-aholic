var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var amountSchema = new Schema({
	user: { type: Schema.ObjectId, required: true },
	type: { type: String },
	amount: { type: Number }
});

amountSchema.pre('save', function(next) {
	var tmpObjectId = this.ObjectId;

	User.find({ _id: tmpObjectId }, function(err, user) {
		if (err) throw err;

		if (user) {
			console.log('Amount successfully created!');

			next();
		}
	});

});

var Amount = mongoose.model('Amount', amountSchema)

module.exports = Amount;
