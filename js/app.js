angular.module("mainApp", ["ngRoute", "ngResource", "ngAnimate", require("./breweries/breweriesModule"), require("./beers/beersModule"), require("./config/configModule")]).
	controller("MainController", ["$scope", "$location", "save", "$window", require("./mainController")]).
	controller("SaveController", ["$scope", "$location", "save", require("./save/saveController")]).
	controller("LoginController", ["$scope", "$location", "rest", require("./login/loginController")]).
	service("rest", ["$http", "$resource", "$location", "config", "$sce", require("./services/rest")]).
	service("save", ["rest", "config", "$route", require("./services/save")]).
	config(["$routeProvider", "$locationProvider", "$httpProvider", require("./config")]).
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
		});

		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			if (config.server.currentUser == null) {
				// no logged user, we should be going to #login
				if (next.templateUrl != "templates/login.html") {
					// not going to #login, we should redirect now
					$location.path("/login");
				}
			}
		});

	}]
).factory("config", require("./config/configFactory"));
