const client = {
	_history: [],

	/* Start */
	start: function() {
		client.search();
	},

	/* Error page */
	error_page: function() {
		window.history.pushState(null, null, "/404");
		out.selector("body", "<h2>Error 404 - Page not found</h2>");
	},

	/* Save history */
	_history_save: function(href) {
		if(client._history[client._history.length - 1] != href) {
			client._history.push(href);
		}
	},

	/* Remove history */
	_history_remove: function() {
		let result;
		if(client._history.length > 1) {
			result = client._history[client._history.length - 2];
			client._history.pop();
		} else {
			result = location.pathname;
		}
		return result;
	},

	/* Search */
	search: function(href=location.pathname) {
		/* Get path */
		let path = client._href(href);

		/* Check route exists */
		if(!route.check(path)) {
			/* Error page */
			return client.error_page();
		}

		/* Controller call */
		return client._page(path);
	},

	/* Handling href */
	_href: function(href) {
		/* Check popstate */
		if(typeof href == "object") {
			href = client._history_remove();
		/* Save history */
		} else {
			client._history_save(href);
		}

		/* Getting pathname */
		window.history.pushState({history: client._history}, null, href);
		
		return location.pathname;
	},

	/* Controller call */
	_page: function(path) {
		let controller;

		/* Get controller from route */
		controller = route.get(path);

		/* Check controller */
		if(typeof controller != "function") {
			/* Error page */
			return client.error_page();
		}

		/* Call controller */
		controller();

		/* Events remapping */
		return client._events();
	},

	/* Events remapping */
	_events: function() {
		let links, methods;

		/* Links */
		links = document.querySelectorAll("#link");
		for(let i = 0; i < links.length; i++) {
			links[i].onclick = (e) => {
				e.preventDefault();
				client.search(e.target.getAttribute("href"));
			};
		}

		/* Controllers */
		methods = document.querySelectorAll("#controller");
		for(let i = 0; i < methods.length; i++) {
			for(event in methods[i].dataset) {
				methods[i][event] = controllers[methods[i].dataset[event]];
			}
		}
	},
};

/* Popstate */
window.addEventListener("popstate", client.search);
