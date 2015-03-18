var appBeers = angular.module("BeersApp", []).
	controller("BeersController", ["$scope", "rest", "$location", "config", "$route", "save", require("./beersController")]).
	controller("BeersShowController", ["$scope", "rest", "$timeout", "$location", "config", "$route", "save", require("./beersShowController")]).
	controller("BeersAddController", ["$scope", "config", "$location", "rest", "save", "$document", "modalService", require("./beersAddController")]).
	controller("BeersUpdateController", ["$scope", "config", "$location", "rest", "save", "$document", "modalService", "$controller", require("./beersUpdateController")]);

module.exports = angular.module("BeersApp").name;