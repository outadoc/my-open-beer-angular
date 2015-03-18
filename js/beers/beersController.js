module.exports = function ($scope, rest, $location, config, $route, save) {

	$scope.data = {load: false};

	$scope.sortBy = {field: "name", asc: false};

	if (config.beers.mode === "online" || !config.beers.loaded) {
		$scope.data.load = true;
		rest.getAll($scope.data, "beers");
		config.beers.loaded = true;
	} else {
		$scope.data["beers"] = config.beers.all;
	}

	$scope.allSelected = false;

	$scope.selectAll = function () {
		angular.forEach($scope.data.beers, function (value, key) {
			value.selected = $scope.allSelected;
		});
	};

	$scope.refresh = function () {
		save.executeAll();
	};

	$scope.showUpdate = function () {
		return angular.isDefined($scope.activeBeer);
	};

	$scope.refreshOnAsk = function () {
		return config.beers.mode == 'offline';
	};

	$scope.defferedUpdate = function () {
		return config.beers.mode == 'offline';
	};

	$scope.setActive = function (beer) {
		if (beer !== $scope.activeBeer)
			$scope.activeBeer = beer;
		else
			$scope.activeBeer = undefined;
	};

	$scope.isActive = function (beer) {
		return beer == $scope.activeBeer;
	};

	$scope.countSelected = function () {
		var result = 0;

		angular.forEach($scope.data.beers, function (value, key) {
			if (value.selected && !value.deleted)
				result++;
		});

		return result;
	};

	$scope.hideDeleted = function () {
		$scope.mustHideDeleted = !$scope.mustHideDeleted;

		angular.forEach($scope.data.beers, function (value, key) {
			if ($scope.mustHideDeleted) {
				if (value.flag === 'Deleted')
					value.deleted = true;
			} else {
				value.deleted = false;
			}
		});
	};

	$scope.edit = function (beer) {
		if (angular.isDefined(beer))
			$scope.activeBeer = beer;
		config.activeBeer = angular.copy($scope.activeBeer);
		config.activeBeer.reference = $scope.activeBeer;
		$location.path("beers/update");
	};

	$scope.update = function (beer, force, callback) {
		if (angular.isUndefined(beer)) {
			beer = $scope.activeBeer;
		}

		$scope.data.posted = {
			"beer": {
				"name": beer.name,
				"description": beer.description,
				"photo": beer.photo,
				"abv": beer.abv,
				"idBrewery": beer.idBrewery
			}
		};

		$scope.data.beers.push(beer);
		beer.created_at = new Date();

		if (config.beers.mode === "online" || force) {
			rest.post($scope.data, "beers", beer.name, callback);
		} else {
			save.addOperation("New", $scope.update, beer);
			$location.path("beers");
		}
	};

	$scope.remove = function () {
		angular.forEach($scope.data.beers, function (value, key) {
			if (value.selected) {
				$scope.removeOne(value);
			}
		});

		return true;
	};

	$scope.removeOne = function (beer, force, callback) {
		if (config.beers.mode === "online" || force) {
			beer.deleted = true;
			rest.remove(beer, "beers", callback);
		} else {
			save.addOperation("Deleted", $scope.removeOne, beer);
			beer.deleted = $scope.hideDeleted;
		}
	};

};