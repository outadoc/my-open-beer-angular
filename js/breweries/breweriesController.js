module.exports = function ($scope, rest, $location, config, $route, save) {
	$scope.data = {load: false};

	$scope.sortBy = {field: "name", asc: false};

	$scope.messages = rest.messages;

	if (config.breweries.mode === "online" || !config.breweries.loaded) {
		$scope.data.load = true;
		rest.getAll($scope.data, "breweries");
		config.breweries.loaded = true;
	} else {
		$scope.data["breweries"] = config.breweries.all;
	}

	$scope.allSelected = false;

	$scope.selectAll = function () {
		angular.forEach($scope.data.breweries, function (value, key) {
			value.selected = $scope.allSelected;
		});
	};

	$scope.refresh = function () {
		save.executeAll();
	};

	$scope.showUpdate = function () {
		return angular.isDefined($scope.activeBrewery);
	};

	$scope.refreshOnAsk = function () {
		return config.breweries.mode == 'offline';
	};

	$scope.defferedUpdate = function () {
		return config.breweries.mode == 'offline';
	};

	$scope.setActive = function (brewery) {
		if (brewery !== $scope.activeBrewery)
			$scope.activeBrewery = brewery;
		else
			$scope.activeBrewery = undefined;
	};

	$scope.isActive = function (brewery) {
		return brewery == $scope.activeBrewery;
	};

	$scope.countSelected = function () {
		var result = 0;
		angular.forEach($scope.data.breweries, function (value, key) {
			if (value.selected && !value.deleted)
				result++;
		});
		return result;
	};

	$scope.hideDeleted = function () {
		$scope.mustHideDeleted = !$scope.mustHideDeleted;
		angular.forEach($scope.data.breweries, function (value, key) {
			if ($scope.mustHideDeleted) {
				if (value.flag === 'Deleted')
					value.deleted = true;
			} else {
				value.deleted = false;
			}
		});
	};

	$scope.edit = function (brewery) {
		if (angular.isDefined(brewery))
			$scope.activeBrewery = brewery;
		config.activeBrewery = angular.copy($scope.activeBrewery);
		config.activeBrewery.reference = $scope.activeBrewery;
		$location.path("breweries/update");
	};

	$scope.show = function (brewery) {
		if (angular.isDefined(brewery))
			$scope.activeBrewery = brewery;
		config.activeBrewery = angular.copy($scope.activeBrewery);
		config.activeBrewery.reference = $scope.activeBrewery;
		$location.path("breweries/show");
	};

	$scope.update = function (brewery, force, callback) {
		if (angular.isUndefined(brewery)) {
			brewery = $scope.activeBrewery;
		}
		$scope.data.posted = {
			"brewery": {
				"name": brewery.name,
				"url": brewery.url
			}
		};
		$scope.data.breweries.push(brewery);
		brewery.created_at = new Date();
		if (config.breweries.mode === "online" || force) {
			rest.post($scope.data, "breweries", brewery.name, callback);
		} else {
			save.addOperation("New", $scope.update, brewery);
			$location.path("breweries");
		}
	};

	$scope.remove = function () {
		angular.forEach($scope.data.breweries, function (value, key) {
			if (value.selected) {
				$scope.removeOne(value);
			}
		});
		return true;
	};

	$scope.removeOne = function (brewery, force, callback) {
		if (config.breweries.mode === "online" || force) {
			brewery.deleted = true;
			rest.remove(brewery, "breweries", callback);
		} else {
			save.addOperation("Deleted", $scope.removeOne, brewery);
			brewery.deleted = $scope.hideDeleted;
		}
	};

};