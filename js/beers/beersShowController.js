module.exports = function ($scope, rest, $timeout, $location, config, $route, save) {

	$scope.beer = config.activeBeer;
	$scope.data = {load: false};
	$scope.brewery = null;

	if (angular.isUndefined(config.activeBeer)) {
		$location.path("beers/");
	}

	if (config.breweries.mode === "online" || !config.breweries.loaded) {
		$scope.data.load = true;
		rest.getAll($scope.data, "breweries/" + $scope.beer.idBrewery, "breweries");
		config.breweries.loaded = true;
	} else {
		$scope.data["breweries"] = config.breweries.all;
	}

	$scope.brewery = config.breweries;

	$scope.show = function () {
		config.activeBrewery = angular.copy($scope.brewery['all']);
		config.activeBrewery.reference = $scope.brewery['all'];
		$location.path("breweries/show");
	};
};
