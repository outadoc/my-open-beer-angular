module.exports = function ($routeProvider, $locationProvider, $httpProvider) {

	//$httpProvider.defaults.useXDomain = true;
	//$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];

	$routeProvider.
		when('/', {
			title: "Accueil",
			templateUrl: 'templates/main.html',
			controller: 'MainController'
		}).when('/breweries', {
			title: "Liste des breweries",
			templateUrl: 'templates/breweries/main.html',
			controller: 'BreweriesController'
		}).when('/breweries/refresh', {
			title: "Liste des breweries",
			templateUrl: 'templates/breweries/main.html',
			controller: 'BreweriesController'
		}).when('/breweries/new', {
			title: "Nouvelle brewery",
			templateUrl: 'templates/breweries/breweryForm.html',
			controller: 'BreweryAddController'
		}).when('/breweries/update', {
			title: "Modifier une brewery",
			templateUrl: 'templates/breweries/breweryForm.html',
			controller: 'BreweryUpdateController'
		}).when('/beers', {
			title: "Liste des bières",
			templateUrl: 'templates/beers/main.html',
			controller: 'BeersController'
		}).when('/beers/refresh', {
			title: "Liste des bières",
			templateUrl: 'templates/beers/main.html',
			controller: 'BeersController'
		}).when('/beers/new', {
			title: "Nouvelle bière",
			templateUrl: 'templates/beers/beerForm.html',
			controller: 'BeersAddController'
		}).when('/beers/update', {
			title: "Modifier une bière",
			templateUrl: 'templates/beers/beerForm.html',
			controller: 'BeersUpdateController'
		}).when('/beers/show', {
			title: "Détails d'une bière",
			templateUrl: 'templates/beers/beerShow.html',
			controller: 'BeersShowController'
		}).when('/saves', {
			title: "Liste des opérations",
			templateUrl: 'templates/saveMain.html',
			controller: 'SaveController'
		}).when('/config', {
			title: "Configuration",
			templateUrl: 'templates/config.html',
			controller: 'ConfigController'
		}).when('/login', {
			title: "Connexion",
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		}).otherwise({
			redirectTo: '/'
		});

	if (window.history && window.history.pushState) {
		$locationProvider.html5Mode(true);
	}

};