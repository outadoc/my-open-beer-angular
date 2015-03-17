module.exports = function ($scope, config, $location, rest, save, $document, modalService, $controller) {

	$controller('BreweryAddController', {$scope: $scope});

	if (angular.isUndefined(config.activeBrewery)) {
		$location.path("breweries/");
	}

	$scope.activeBrewery = config.activeBrewery;

	$scope._update = function (brewery, force, callback) {
		var result = false;

		if (force || $scope.frmBrewery.$dirty) {
			if (angular.isUndefined(brewery)) {
				brewery = $scope.activeBrewery;
			} else {
				config.activeBrewery = angular.copy(brewery);
				config.activeBrewery.reference = brewery;
			}

			$scope.data.posted = {
				"name": brewery.name,
				"url": brewery.url
			};

			config.activeBrewery.reference.name = $scope.activeBrewery.name;
			config.activeBrewery.reference.url = $scope.activeBrewery.url;
			config.activeBrewery.reference.updated_at = new Date();

			if (config.breweries.mode === "online" || force)
				rest.put(config.activeBrewery.id, $scope.data, "breweries", config.activeBrewery.name, callback);
			else {
				config.activeBrewery.reference.flag = "Updated";
				save.addOperation("Updated", $scope.update, config.activeBrewery.reference);
				result = true;
			}

		} else {
			result = true;
		}

		return result;
	}

};