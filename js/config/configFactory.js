module.exports = function () {
	var factory = {breweries: {}, server: {}, beers: {}, auth: {}, routes: {}};

	factory.activeBrewery = undefined;

	factory.breweries.loaded = false;
	factory.breweries.refresh = "all";//all|ask
	factory.breweries.update = "immediate";//deffered|immediate

	factory.beers.loaded = false;
	factory.beers.refresh = "all";//all|ask
	factory.beers.update = "immediate";//deffered|immediate

	factory.server.restServerUrl = "http://127.0.0.1/rest-open-beer/";
	factory.server.force = false;

	factory.auth.currentUser = null;
	factory.auth.privateToken = null;

	factory.routes.privateTemplates = ['/beers/beerForm.html', '/breweries/breweryForm.html'];

	return factory;
};