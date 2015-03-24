module.exports = function ($cookies) {
	var factory = {breweries: {}, server: {}, beers: {}, auth: {}, routes: {}};

	factory.activeBrewery = undefined;

	factory.breweries.loaded = false;
	factory.breweries.mode = "online"; // online|offline

	factory.beers.loaded = false;
	factory.beers.mode = "online"; // online|offline

	factory.server.restServerUrl = "http://127.0.0.1/rest-open-beer/";
	factory.server.force = false;

	factory.auth.currentUser = $cookies.currentUser;
	factory.auth.privateToken = $cookies.privateToken;

	factory.routes.privateTemplates = ['/beers/beerForm.html', '/breweries/breweryForm.html'];

	return factory;
};