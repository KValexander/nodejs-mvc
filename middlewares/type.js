const type = {

	html: function(request, response) {
		console.log("html");
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		return true;
	},

	json: function(request, response) {
		console.log("json");
		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		return true;
	},

	test: function(req, res) {
		console.log("test");
		return true;
	},

};

module.exports = type;