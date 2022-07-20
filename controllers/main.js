const view = require("../core/view.js");

const main = {

	main: function(request, response) {
		view.out("index.html", response);
	},

};

module.exports = main;