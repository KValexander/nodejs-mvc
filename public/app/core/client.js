const client = {

	/* Page */
	page: function() {
		let value, path = location.pathname;

		/* Check route exists */
		if(!route.check(path)) {
			/* Return 404 page */
			return out.id("app", "<h1>Error 404 - Page not found</h1>");
		}

		/* Get route */
		value = route.get(path);

		/* Check value */
		if(typeof value != "function") {
			/* Return error page */
			return out.id("app", "<h1>Error - Function not found</h1>");
		}

		/* Call value */
		return value();
	},

	search: function() {

	},



};