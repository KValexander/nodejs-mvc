const http = require("http");
const route = require("../routes.js");

let server = {
	start: (host, port) => {
		if(!host || !port) 
			return console.log("Server startup error: No host or port passed");

		http.createServer(function(request, response) {
			if(!route.check(request.method, request.url))
				return response.end("404");

			return response.end("Work!");
		}).listen(port, host, function() {
			console.log(`Server running on port ${port}`);
		});

	},
};

module.exports = server;