angular.module('amountService', [])

	// super simple service
	// each function returns a promise object
	.factory('Amounts', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/amounts');
			},
			create : function(amountData) {
				return $http.post('/api/amounts', amountData);
			},
			delete : function(id) {
				return $http.delete('/api/amounts/' + id);
			}
		}
	}]);
