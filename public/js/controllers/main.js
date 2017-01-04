angular.module('amountController', [])

// inject the Amount service factory into our controller
.controller('mainController', ['$scope','$http','Amounts', function($scope, $http, Amounts) {
	console.log($scope);
	$scope.formData = {};
	$scope.loading = true;

	$scope.types = [
		"Rind",
		"Schwein",
		"Geflügel",
		"Fisch"
	];

	$scope.users = [
		{
			"id": "1",
			"username": "nlsltz",
			"firstname": "nils",
			"lastname": "lutz",
			"role": "admin"
		},
		{
			"id": "2",
			"username": "theiss",
			"firstname": "tobias",
			"lastname": "heiss",
			"role": "keyuser"
		},
		{
			"id": "3",
			"username": "jasmuss",
			"firstname": "jannick",
			"lastname": "asmuss",
			"role": "user"
		},
		{
			"id": "4",
			"username": "flex",
			"firstname": "felix",
			"lastname": "rademann",
			"role": "user"
		},
		{
			"id": "5",
			"username": "kevlar",
			"firstname": "kevin",
			"lastname": "nielebock",
			"role": "user"
		},
		{
			"id": "6",
			"username": "justincase",
			"firstname": "justin",
			"lastname": "hofschildt",
			"role": "user"
		},
		{
			"id": "7",
			"username": "franchy",
			"firstname": "franscesco",
			"lastname": "brosius",
			"role": "user"
		},
	];

	// GET ==========================
	// get chart data
	$scope.chartOptions = {
		legend: { display: true },
		title: { display: true, text: 'Overview'},
		scales: {
			yAxes: [{
				ticks: {
					min: 0
				}
			}]
		}
	};
	Amounts.get()
	.success(function(data) {
		var aLabels = [];
		var aSeries = [];
		var aData = [];

		data.forEach(function(entry, index, array) {
			if (!aLabels.includes(entry.user)) {
				aLabels.push(entry.user);
			};
		});

		data.forEach(function(entry, index, array) {
			if (!aSeries.includes(entry.type)) {
				aSeries.push(entry.type);
				aData.push([]);
			};
		});

		aData.forEach(function(entry, index, array) {
			entry.length = aLabels.length;
			entry.fill(0);
		});

		data.forEach(function(entry, index, array) {
			var iIndexOfUser = aLabels.indexOf(entry.user);
			var iIndexOfType = aSeries.indexOf(entry.type);
			aData[iIndexOfType][iIndexOfUser] += entry.amount;
		});

		$scope.labels = aLabels;
		$scope.series = aSeries;
		$scope.data = aData;

		$scope.loading = false;

	});

	// GET =====================================================================
	// when landing on the page, get all Amounts and show them
	// use the service to get all the Amounts
	Amounts.get()
	.success(function(data) {
		$scope.amounts = data;
		$scope.loading = false;
	});

	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createAmount = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.user != undefined && $scope.formData.amount != undefined) {
			$scope.loading = true;

			// call the create function from our service (returns a promise object)
			Amounts.create($scope.formData)

			// if successful creation, call our get function to get all the new Amounts
			.success(function(data) {
				$scope.loading = false;
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.amounts = data; // assign our new list of Amounts
			});
		}
	};

	// DELETE ==================================================================
	// delete a amount after checking it
	$scope.deleteAmount = function(id) {
		$scope.loading = true;

		Amounts.delete(id)
		// if successful creation, call our get function to get all the new Amounts
		.success(function(data) {
			$scope.loading = false;
			$scope.amounts = data; // assign our new list of Amounts
		});
	};

	// DELETE CHECKED ===========================================================
	// delete all checked amounts
	$scope.deleteCheckedAmounts = function() {
		$scope.loading = true;

		Amounts.delete(id)
		// if successful creation, call our get function to get all the new Amounts
		.success(function(data) {
			$scope.loading = false;
			$scope.amounts = data; // assign our new list of Amounts
		});
	};

}]);
