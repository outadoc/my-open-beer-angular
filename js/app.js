angular.module("mainApp", ["ngRoute", "ngResource", "ngAnimate", "ngCookies", "pascalprecht.translate", require("./breweries/breweriesModule"), require("./beers/beersModule"), require("./config/configModule")]).
	controller("MainController", ["$scope", "$location", "save", "$window", "$timeout", "config", "rest", require("./mainController")]).
	controller("SaveController", ["$scope", "$location", "save", require("./save/saveController")]).
	controller("LoginController", ["$scope", "$location", "$cookies", "$translate", "rest", "config", require("./login/loginController")]).
	service("rest", ["$http", "$resource", "$location", "config", "$sce", require("./services/rest")]).
	service("save", ["rest", "config", "$route", require("./services/save")]).
	config(["$routeProvider", "$locationProvider", "$httpProvider", "$translateProvider", require("./config")]).
	filter("NotDeletedFilter", require("./addons/notDeletedFilter")).
	directive("sortBy", [require("./addons/sortBy")]).
	directive("Drag", require("./addons/drag")).
	directive("bsModal", ["$q", require("./addons/modal")]).
	service("modalService", ["$q", "$compile", "$rootScope", "$sce", require("./addons/modalService")]).
	run(['$rootScope', '$location', '$routeParams', 'config', function ($rootScope, $location, $routeParams, config) {

		$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
			var paths = $location.path().split("/");
			var result = [];
			var href = "";

			for (var i in paths) {
				var p = {};

				if (paths[i]) {
					p.caption = paths[i];

					if (i < paths.length - 1) {
						p.href = href + paths[i] + "/";
						href += paths[i];
					} else {
						p.href = "";
					}

					result.push(p);
				}
			}

			$rootScope.paths = result;
			$rootScope.title = current.$$route.title;
		});

		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			// if no one is logged in, we should check if we're allowed to move there
			if (config.auth.privateToken == null) {
				for(var i = 0; i < config.routes.privateTemplates.length; i++) {
					if(next.templateUrl == "templates" + config.routes.privateTemplates[i]) {
						// if we're not allowed, redirect
						$location.path("/login");
					}
				}
			}
		});

	}]
).factory("config", ["$cookies", "$translate", require("./config/configFactory")]);
