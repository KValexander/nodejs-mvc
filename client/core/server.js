/* Require http */
const http = require("http");

/* Require file */
const file = require("./file.js");

/* Require routes */
const route = require("../routes.js");

/* Server */
const server = {

	/* Server start */
	start: (host, port) => {

		/* Check host and port */
		if(!host || !port)  {
			return console.log("Server startup error: No host or port passed");
		}

		/* Create server */
		http.createServer(server.call_route)

		/* Start server */
		.listen(port, host, () => {
			console.log(`Server is running on http://${host}:${port}`)
		});

	},

	/* Call route */
	call_route: function(request, response) {
		let object;

		/* Сheck if route is a file */
		if(file.check(request.url)) {
			return file.connect(request, response);
		}

		/* Check if a route exists */
		if(!route.check_exists(request.method, request.url)) {

			/* Route not found */
			response.status_code = 404;
			return response.end(`Route not found`);
			
		}

		/* Get route value */
		object = route.get_route(request.method, request.url);

		/* Check middleware */
		if(object.middlewares.length) {
			/* Call middlewares */
			server.call_middlewares(object.middlewares, request, response);
		}

		/* Check route value */
		if(typeof object.value != "function") {
			response.status_code = 404;
			return response.end(`Function not found`);
		}

		/* Call route value */
		return object.value(request, response);
	},

	/* Call middlewares */
	call_middlewares: function(middlewares, request, response) {

		/* Call middlewares */
		for(let i = 0; i < middlewares.length; i++) {

			/* Get middleware */
			let middleware = middlewares[i];

			/* Check middleware */
			if(typeof middleware != "function") {
				response.status_code = 404;
				return response.end(`Middleware not found`);
			}

			/* Check middleware */
			if(!middleware(request, response)) {
				response.status_code = 400;
				return response.end(`The middleware returned a false value`);
			}

		}

	},

};

/* Export */
module.exports = server;