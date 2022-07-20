const route = {

	/* Current route */
	current: {
		method: null,
		route: null
	},

	/* Route groups */
	groups: [],

	/* Routes */
	routes: {
		GET: {},
		POST: {}
	},

	/* Checking if a route exists */
	check_exists: function(method, route) {

		if(!(method in this.routes)) {
			return false;
		}

		if(!(route in this.routes[method])) {
			return false;
		}

		return true;
	},

	/* Get route value */
	get_route: function(method, route) {
		if(!(method in this.routes)) {
			return {};
		}

		if(!(route in this.routes[method])) {
			return {};
		}

		return this.routes[method][route];
	},

	/* Route group */
	group: function(group, callback) {
		this.groups.push({
			group: group[0],
			value: group[1]
		});

		callback();

		this.groups.pop();

		return this;
	},

	/* Add route */
	add: function(method, route, value) {
		
		/* Add route */
		this.routes[method][route] = {
			value: value,
			middlewares: []
		};

		/* Current route */
		this.current = {
			method: method,
			route: route
		};

		/* Assigning a route to a group */
		if(this.groups.length) {
			for(let i = 0; i < this.groups.length; i++) {
				this[this.groups[i].group](this.groups[i].value);
			}
		}

		return this;
	},

	/* Route with type get */
	get: function(route, value) {
		this.add("GET", route, value);
		return this;
	},

	/* Route with type post */
	post: function(route, value) {
		this.add("POST", route, value);
		return this;
	},

	/* Adding middleware to a route */
	middleware: function(value) {
		this.routes[this.current.method][this.current.route].middlewares.push(value);
		return this;
	},

};

module.exports = route;