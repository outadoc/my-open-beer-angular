module.exports = function ($scope, $location, rest) {

	$scope.wrongPassword = false;

	$scope.login = function () {
		rest.login($scope.email, $scope.password, function (success) {
			if(success) {
				console.log("Connection successful, logged in as " + email);
				$scope.wrongPassword = false;

				$location.path("/home");
			} else {
				console.error("Connection failed: could not authenticate with server");
				$scope.wrongPassword = true;
			}
		});
	};

};