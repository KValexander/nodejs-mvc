/* Require http */
const http = require("http");

/* Require core */
const file = require("./file.js");
const component = require("./component.js");

/* Require routes */
const route = require("../routes.js");

/* Client */
const client = {
	_error: "Route not found",

	/* Set error */
	error: function(name) {
		client._error = component.get(name);
	},

	/* Server */
	server: function(host, port) {
		/* Create and start server */
		http.createServer(client._search)
		.listen(port, host, () => console.log(`Server is running on http://${host}:${port}`));
	},

	/* Start client */
	start: function(host="localhost", port=80) {

		/* Start server */
		client.server(host, port);

		/* Find components */
		component.search();

	},

	/* Search route */
	_search: function(request, response) {
		let func;

		/* Check file */
		if(file.check(request.url)) {
			return file.connect(request, response);
		}
		
		/* Connect script */
		response.write(`<script src="/core/client/script.js"></script>`);

		/* Check route exists */
		if(!route.check(request.url)) {
			response.status_code = 404;
			return response.end(client._error);
		}

		/* Get route function */
		func = route.get(request.url);

		/* Check route */
		if(typeof func != "function") {
			response.status_code = 404;
			return response.end(`Function not found`);
		}

		/* Call route function */
		func(request, response);

		/* Response end */
		return response.end();
	},

};

/* Export */
module.exports = client;