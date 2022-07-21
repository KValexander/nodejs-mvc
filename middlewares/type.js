/* type middleware */
const type = {

	/* Content type html */
	html: function(request, response) {
		response.setHeader("Content-Type", "text/html");
		return true;
	},

	/* Content type json */
	json: function(request, response) {
		response.setHeader("Content-Type", "application/json");
		return true;
	}

};

/* Export */
module.exports = type;