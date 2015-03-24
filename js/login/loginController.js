module.exports = function ($scope, $location, $cookies, $translate, rest, config) {

	$scope.wrongPassword = false;

	$scope.login = function () {
		rest.login($scope.email, $scope.password, function (success, token) {
			if (success) {
				console.log("Connection successful, logged in as " + $scope.email);
				$scope.wrongPassword = false;

				if ($scope.remember) {
					$cookies.currentUser = $scope.email;
					$cookies.privateToken = token;
				}

				$location.path("/");
			} else {
				console.error("Connection failed: could not authenticate with server");
				$scope.wrongPassword = true;
			}
		});
	};


	$scope.isLoggedIn = function () {
		return config.auth.privateToken != null;
	};

	$scope.goToLogin = function () {
		$location.path("/login");
	};

	$scope.logout = function () {
		console.log("logging out");

		config.auth.currentUser = null;
		config.auth.privateToken = null;

		delete $cookies.currentUser;
		delete $cookies.privateToken;

		$location.path("/");

		rest.addMessage({
			type: "success",
			content: "Vous êtes maintenant déconnecté."
		});
	};

	$scope.getUsername = function () {
		return config.auth.currentUser;
	};

	$scope.setLang = function (langKey) {
		$translate.use(langKey);
		$cookies.lang = langKey;
	};

};