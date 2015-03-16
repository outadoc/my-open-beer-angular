module.exports = function ($scope, $location, rest) {

	$scope.login = function () {
		var email = $scope.email;
		var password = $scope.password;

		rest.login(email, password, function (success) {
			if(success) {
				console.log("Connection successful, logged in as " + email);
				$location.path("/home");
			} else {
				console.error("Connection failed: could not authenticate with server");
			}
		});
	};

};