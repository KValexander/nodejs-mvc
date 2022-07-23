/* Require core */
const view = require("../core/view.js");

/* Require models */
const client = require("../models/client.js");

/* Auth controller */
const auth = {

	/* Login */
	login: function(request, response) {
		response.end();
	},

	/* Register */
	register: function(request, response) {
		response.end();
	}

};

/* Export */
module.exports = auth;