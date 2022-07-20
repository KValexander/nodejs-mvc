const fs = require("fs").promises;

const view = {
	/* Path to views */
	path: process.cwd() + "/view/",

	/* Read file */
	read: function(path, callback) {

		fs.readFile(path)
		.then(contents => {
			return callback({
				code: 200,
				content: contents
			});
		})
		.catch(err => {
			return callback({
				code: 404,
				content: "File not found"
			});
		});

	},

	/* Out file (haha) */
	out: function(filename, response) {

		/* Read file */
		this.read(this.path + filename, result => {

			/* Out file */
			response.writeHeader(result.code);
			response.end(result.content);

		});

	}

};

module.exports = view;