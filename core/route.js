let route = {

	routes: {
		GET: {},
		POST: {}
	},

	check: function(method, route) {

		if(!(method in this.routes))
			return false;

		if(!(route in this.routes[method]))
			return false;

		return true;
	},

	get_route: function(method, route) {
		if(!(method in this.routes))
			return {};

		if(!(route in this.routes[method]))
			return {};

		return this.routes[method][route];
	},

	get: function(route, value) {
		this.routes.GET[route] = value;
	},

	post: function(route, value) {
		this.routes.POST[route] = value;
	}

};

module.exports = route;