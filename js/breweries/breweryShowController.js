module.exports = function ($scope, rest, $timeout, $location, config, $route, save) {

	$scope.brewery = config.activeBrewery;
	$scope.data = {load: false};
	$scope.showBeers = false;
	$scope.existeBeers = null;
	$scope.beers = null;

	if (angular.isUndefined(config.activeBrewery)) {
		$location.path("breweries/");
	}

	if (config.beers.mode === "online" || !config.beers.loaded) {
		$scope.data.load = true;
		rest.getAll($scope.data, "beers/brewery/" + $scope.brewery.id, "beers");
		config.beers.loaded = true;
	} else {
		$scope.data["beers"] = config.beers.all;
	}

	$scope.beers = config.beers;

	$scope.show = function () {
		$scope.showBeers = !$scope.showBeers;
		if ($scope.beers['all'] != null) {
			$scope.existeBeers = true;
		} else {
			$scope.existeBeers = false;
		}
	};
};
