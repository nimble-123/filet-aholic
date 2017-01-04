var Amount = require('./models/amount');
var User = require('./models/user');

function getAmounts(res) {
	Amount.find(function (err, amounts) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err);
		}

		res.json(amounts); // return all amounts in JSON format
	});
};

function getUsers(res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}

		res.json(users);
	});
}

module.exports = function (app) {

	// api ---------------------------------------------------------------------
	// get all users
	app.get('/api/users', function (req, res) {
		// return all users saved in db
		getUsers(res);
	});

	// get a user by username
	app.get('/api/users/:username', function (req, res) {
		// return all users saved in db
		User.find({username: req.params.username}, function(err, user) {
			if (err) {
				res.send(err);
			}

			res.json(user);

		});
	});

	// create a new user
	app.post('/api/users', function (req, res) {
		var tmpPassword = req.body.password;
		//var salt = randomSalt();
		//var hashedPassword = bcrypt(tmpPassword, salt);

		User.create({
			username: req.body.username,
			password: req.body.password,
			fname: req.body.fname,
			lname: req.body.lname,
		}, function (err, user) {
			if (err) {
				res.send(err);
			}

			getUsers(res);

		});
	});

	// get all amounts
	app.get('/api/amounts', function (req, res) {
		// use mongoose to get all amounts in the database
		getAmounts(res);
	});

	// create amount and send back all amounts after creation
	app.post('/api/amounts', function (req, res) {

		// create a amount, information comes from AJAX request from Angular
		Amount.create({
			user: req.body.user,
			type: req.body.type,
			amount: req.body.amount
		}, function (err, amount) {
			if (err)
			res.send(err);

			// get and return all the amounts after you create another
			getAmounts(res);
		});

	});

	// delete a amount
	app.delete('/api/amounts/:amount_id', function (req, res) {
		Amount.remove({
			_id: req.params.amount_id
		}, function (err, amount) {
			if (err)
			res.send(err);

			getAmounts(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function (req, res) {
		res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
