module.exports = function ($scope, rest, $timeout, $location, config, $route, save) {

	$scope.beer = config.activeBeer;

	if (angular.isUndefined(config.activeBeer)) {
		$location.path("beers/");
	}

};
