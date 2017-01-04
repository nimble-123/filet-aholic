var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var amountSchema = new Schema({
	userId: { type: Schema.ObjectId, required: true, ref: 'Users' },
	type: { type: String },
	amount: { type: Number, required: true }
});

amountSchema.pre('save', function(next) {
  var tmpObjectId = this.userId;

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
