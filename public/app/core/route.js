const route = {
	_routes: {},

	check: function(key) {
		return (key in this._routes);
	},

	get: function(key) {
		return (this.check(key)) ? this._routes[key] : {};
	},

	use: function(path, controller) {
		this._routes[path] = controller;
	}

};