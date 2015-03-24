module.exports = function ($scope, rest, $timeout, $location, config, $route, save) {

	$scope.beer = config.activeBeer;
	$scope.data = {load: false};

	if (angular.isUndefined(config.activeBeer)) {
		$location.path("beers/");
	}

	if (config.breweries.mode === "online" || !config.breweries.loaded) {
		$scope.data.load = true;
		rest.getAll($scope.data, "breweries");
		config.breweries.loaded = true;
	} else {
		$scope.data["breweries"] = config.breweries.all;
	}

	$scope.show = function () {
		brewery = null;
		for (i = 0; i < $scope.data.breweries.length; i++) {
			if ($scope.data.breweries[i].id == $scope.beer.idBrewery) {
				brewery = $scope.data.breweries[i];
			}
		}
		config.activeBrewery = angular.copy(brewery);
		config.activeBrewery.reference = brewery;
		$location.path("breweries/show");
	};
};
