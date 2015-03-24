module.exports = function ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {

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
		}).when('/breweries/show', {
			templateUrl: 'templates/breweries/breweryShow.html',
			controller: 'BreweryShowController'
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

	$translateProvider.translations('fr_FR', {
		global: {
			SUBTITLE: "Une base de données et API gratuite et publique pour les bières.",
			INFO_TITLE: "Informations"
		},
		main: {
			HOME: "Accueil",
			CONFIG: "Configuration",
			breweries: {
				TITLE: "Brasseries et brasseurs",
				LIST: "Liste des brasseries/brasseurs",
				ADD: "Ajouter une brasserie..."
			},
			beers: {
				TITLE: "Bières",
				LIST: "Liste des bières",
				ADD: "Ajouter une bière..."
			}
		},
		auth: {
			LOGIN: "Connexion",
			LOGOUT: "Déconnexion"
		},
		config: {
			BREWERIES: "Brasseries",
			BEERS: "Bières",
			SAVE: "Sauvegarder les modifications",
			CANCEL: "Annuler",
			mode: {
				TITLE: "Mode de connexion",
				ONLINE: "Mode connecté (Chargement à chaque affichage et mise à jour immédiate)",
				OFFLINE: "Mode hors connexion (chargement et mise à jour à la demande)"
			},
			server: {
				TITLE: "Paramétres d'accès au serveur distant",
				URL: "URL",
				TOKEN: "Jeton privé",
				FORCE: "Forcer la connexion"
			}
		},
		login: {
			TITLE: "Connexion",
			EMAIL: "Adresse email",
			PASSWORD: "Mot de passe",
			REMEMBER: "Se souvenir de moi"
		},
		list: {
			ADD: "Ajouter...",
			HIDE_DELETED: "Masquer les suppressions",
			FILTER: "Filtrer...",
			NAME: "Nom",
			URL: "URL",
			DESCRIPTION: "Description",
			PHOTO: "Photo",
			CREATED_AT: "Créé à",
			UPDATED_AT: "Modifié à",
			beers: {
				SHOW: "Voir la bière",
				UPDATE: "Modifier la bière"
			},
			breweries: {
				SHOW: "Voir la brasserie",
				UPDATE: "Modifier la brasserie"
			}
		},
		edit: {
			SUBMIT: "Valider",
			CANCEL: "Annuler"
		},
		show: {
			beers: {
				DISPLAY: "Afficher la brasserie",
				BACK: "Retour à la liste des bières"
			},
			breweries: {
				DISPLAY: "Afficher les bières",
				BACK: "Retour à la liste des brasseries"
			}
		}
	});

	$translateProvider.translations('en_US', {
		global: {
			SUBTITLE: "A free, public database and API for beer information.",
			INFO_TITLE: "Informations"
		},
		main: {
			HOME: "Home",
			CONFIG: "Configuration",
			breweries: {
				TITLE: "Breweries/brewers",
				LIST: "Breweries List",
				ADD: "Add a brewery..."
			},
			beers: {
				TITLE: "Beers",
				LIST: "Beers List",
				ADD: "Add a beer..."
			}
		},
		auth: {
			LOGIN: "Login",
			LOGOUT: "Logout"
		},
		config: {
			BREWERIES: "Breweries",
			BEERS: "Beers",
			SAVE: "Save",
			CANCEL: "Cancel",
			mode: {
				TITLE: "Connection mode",
				ONLINE: "Online mode",
				OFFLINE: "Offline mode"
			},
			server: {
				TITLE: "Server settings",
				URL: "URL",
				TOKEN: "Private Token",
				FORCE: "Force Connection"
			}
		},
		login: {
			TITLE: "Login",
			EMAIL: "Email address",
			PASSWORD: "Password",
			REMEMBER: "Remember me"
		},
		list: {
			ADD: "Add...",
			HIDE_DELETED: "Hide deleted",
			FILTER: "Filter...",
			NAME: "Name",
			URL: "URL",
			DESCRIPTION: "Description",
			PHOTO: "Photo",
			CREATED_AT: "Created at",
			UPDATED_AT: "Edited at",
			beers: {
				SHOW: "Show beer",
				UPDATE: "Edit beer"
			},
			breweries: {
				SHOW: "Show brewery",
				UPDATE: "Edit brewery"
			}
		},
		edit: {
			SUBMIT: "Submit",
			CANCEL: "Cancel"
		},
		show: {
			beers: {
				DISPLAY: "Show brewery",
				BACK: "Back to beers list"
			},
			breweries: {
				DISPLAY: "Show beers",
				BACK: "Back to breweries list"
			}
		}
	});

	$translateProvider.preferredLanguage('fr_FR');

};