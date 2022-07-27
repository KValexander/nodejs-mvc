/* Require http */
const http = require("http");

/* Require fs */
const fs = require("fs");

/* Require core */
const auth 	= require("./auth.js");
const db 	= require("./db.js");
const view 	= require("./view.js");
const component = require("./component.js");

/* Require routes */
const route = require("../routes.js");

/* Server */
const server = {

	/* Database connection */
	connect: function(data) {
		db.connection(data);
	},

	/* Set model for module auth */
	auth: function(model) {
		auth.model(model);
	},

	/* Server start */
	start: (host, port) => {

		/* Check host and port */
		if(!host || !port)  {
			return console.log("Server startup error: No host or port passed");
		}

		/* Load components */
		component.load();

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
		if(server.check_file(request.url)) {
			return server.connect_file(request, response);
		}

		/* Check if a route exists */
		if(!route.check_exists(request.method, request.url)) {
			
			/* API entry point */
			if(route.apis.start) {

				/* Function */
				if(typeof route.apis.entry == "function") {
					return route.apis.entry(request, response);
				}

				/* View */
				else if(server.check_file(route.apis.entry)) {
					return view.out(response, route.apis.entry);
				}

				/* Component */
				else {
					return response.end(component.get(route.apis.entry));
				}
				
			}

			/* Route not found */
			else {
				response.status_code = 404;
				return response.end(`Route not found`);
			}
			
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

	/* Check file */
	check_file: function(url) {
		let regex = /\.\w+$/;
		return regex.test(url);
	},

	/* Connect file */
	connect_file: async function(request, response) {

		/* File exists */
		try {
			response.status_code = 200;
			response.write(fs.readFileSync(process.cwd() + request.url));
		}

		/* File not exists */
		catch(err) {
			response.status_code = 404;
			response.write(`File not found`);
		}

		response.end();
	},

};

/* Export */
module.exports = server;