module.exports = function ($scope, $location, save, $window, $timeout, config, rest) {

	$scope.messages = rest.messages;

	$scope.hasMessage = function () {
		return rest.messages.length > 0;
	};

	$scope.readMessage = function (message) {
		$timeout(function () {
			message.deleted = true;
		}, 5000);

		return true;
	};

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

};