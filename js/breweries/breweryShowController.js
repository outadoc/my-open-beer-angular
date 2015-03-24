module.exports = function ($scope, rest, $timeout, $location, config, $route, save) {

	$scope.brewery = config.activeBrewery;

	if (angular.isUndefined(config.activeBrewery)) {
		$location.path("breweries/");
	}
};
