/* Require fs promises */
const fs = require("fs").promises;

const view = {
	/* Path to views */
	path: process.cwd() + "/view/",

	/* Read file */
	read: async function(path) {
		let result;

		try {
			result = {
				code: 200,
				content: await fs.readFile(path)
			}
		} catch(err) {
			result = {
				code: 400,
				content: err
			}
		}

		return result;
	},

	/* Out file */
	out: async function(filename, response) {

		let content = await this.read(this.path + filename);
		response.end(content.content);

	}

};

/* Export */
module.exports = view;