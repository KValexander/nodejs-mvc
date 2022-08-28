/* Require fs */
const fs = require("fs");

/* File */
const file = {

	/* Check file */
	check: function(url) {
		let regex = /\.\w+$/;
		return regex.test(url);
	},

	/* Connect file */
	connect: async function(request, response) {

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

module.exports = file;