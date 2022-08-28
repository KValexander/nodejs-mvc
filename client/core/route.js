/* Route */
const route = {
	_routes: {},

	/* Check route exists */
	check: function(route) {
		return route in this._routes;
	},

	/* Create route */
	use: function(route, func) {
		this._routes[route] = func;
	},

	/* Get route */
	get: function(route) {
		return this._routes[route];
	},

};

/* Export */
module.exports = route;