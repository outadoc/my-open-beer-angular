module.exports = function ($scope, $location, save, $window, config) {

	$scope.hasOperations = function () {
		return save.operations.length > 0;
	};

	$scope.opCount = function () {
		return save.operations.length;
	};

	$scope.buttons = [{caption: "Okay"}, {caption: "Annuler", dismiss: "true"}];

	var beforeUnload = function (e) {
		if ($scope.hasOperations())
			return "Attention, vous allez perdre les modifications(" + $scope.opCount() + ") non enregistrées si vous continuez...";
	};

	angular.element($window).on('beforeunload', beforeUnload);

	$scope.$on("$destroy", function () {
		$window.removeEventListener('beforeunload', beforeUnload);
	});

	$scope.isLoggedIn = function () {
		return config.auth.privateToken !== null;
	};

	$scope.login = function () {
		$location.path("/login");
	};

	$scope.logout = function () {
		console.log("logging out");

		config.auth.currentUser = null;
		config.auth.privateToken = null;

		$location.path("/home");
	};

	$scope.getUsername = function() {
		return config.auth.currentUser;
	}
	;

};