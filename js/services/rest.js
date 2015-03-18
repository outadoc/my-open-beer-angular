module.exports = function ($http, $resource, $location, restConfig, $sce) {
	var self = this;

	if (angular.isUndefined(this.messages))
		this.messages = [];

	this.getParams = function () {
		return '?token=' + restConfig.auth.privateToken + '&force=' + restConfig.server.force;
	};

	this.headers = {
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		'Accept': 'application/json'
	};

	this.getAll = function (response, what) {
		var request = $http({
			method: "GET",
			url: restConfig.server.restServerUrl + what + this.getParams(),
			headers: {'Accept': 'application/json'},
			callback: 'JSON_CALLBACK'
		});

		request.success(function (data, status, headers, config) {
			response[what] = data;
			restConfig[what].all = data;
			response.load = false;
		}).
			error(function (data, status, headers, config) {
				self.addMessage({
					type: "danger",
					content: "Erreur de connexion au serveur, statut de la réponse : " + status
				});
				console.log("Erreur de connexion au serveur, statut de la réponse : " + status);
			});
	};

	this.addMessage = function (message) {
		content = $sce.trustAsHtml(message.content);
		self.messages.push({"type": message.type, "content": content});
	};

	this.post = function (response, what, name, callback) {
		if (angular.isUndefined(callback))
			this.clearMessages();

		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.defaults.headers.post["Accept"] = "application/json";

		var request = $http({
			method: "POST",
			url: restConfig.server.restServerUrl + what + this.getParams(),
			data: response.posted,
			headers: self.headers
		});

		request.success(function (data, status, headers, config) {
			self.addMessage(data.message);
			if (angular.isUndefined(callback)) {
				$location.path("/" + what);
			} else {
				callback();
			}
		}).error(function (data, status, headers, config) {
			self.addMessage({
				type: "warning",
				content: "Erreur de connexion au serveur, statut de la réponse : " + status + "<br>" + data.message
			});
		});
	};

	this.put = function (id, response, what, name, callback) {
		if (angular.isUndefined(callback))
			this.clearMessages();

		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.defaults.headers.post["Accept"] = "text/plain";

		var request = $http({
			method: "PUT",
			url: restConfig.server.restServerUrl + what + '/' + id + this.getParams(),
			data: response.posted,
			headers: self.headers
		});

		request.success(function (data, status, headers, config) {
			self.addMessage(data.message);
			if (angular.isUndefined(callback)) {
				$location.path("/" + what);
			} else {
				callback();
			}
		}).error(function (data, status, headers, config) {
			self.addMessage({
				type: "warning",
				content: "Erreur de connexion au serveur, statut de la réponse : " + status + "<br>" + data.message
			});
		});
	};

	this.remove = function (object, what, callback) {
		if (angular.isUndefined(callback))
			this.clearMessages();

		var request = $http({
			method: "DELETE",
			url: restConfig.server.restServerUrl + what + '/' + object.id + this.getParams(),
			headers: self.headers
		});

		request.success(function (data, status, headers, config) {
			self.addMessage(data.message);

			if (angular.isDefined(callback)) {
				callback();
			}

		}).error(function (data, status, headers, config) {
			self.addMessage({
				type: "warning",
				content: "Erreur de connexion au serveur, statut de la réponse : " + status + "<br>" + data.message
			});
		});
	};

	this.login = function (email, password, callback) {
		$http({
			method: "POST",
			url: restConfig.server.restServerUrl + 'user/connect',
			headers: this.headers,
			callback: 'JSON_CALLBACK',
			data: {
				mail: email,
				password: password
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			}

		}).success(function (data, status, headers, config) {
			if(data.connected === true) {
				restConfig.auth.privateToken = data.token;
				restConfig.auth.currentUser = email;

				self.addMessage({
					type: "success",
					content: "Connexion réussie !"
				});
			} else {
				self.addMessage({
					type: "danger",
					content: "Erreur d'authentification. Vérifiez votre mot de passe."
				});
			}

			callback(data.connected === true);

		}).error(function (data, status, headers, config) {
			self.addMessage({
				type: "danger",
				content: "Erreur de connexion au serveur, statut de la réponse : " + status
			});

			console.log("Erreur de connexion au serveur, statut de la réponse : " + status);
			callback(false);
		});
	};

	this.clearMessages = function () {
		self.messages.length = 0;
	};

};