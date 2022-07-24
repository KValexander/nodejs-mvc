/* Require fs promises */
const fs = require("fs").promises;

const view = {
	/* Path to views */
	path: process.cwd() + "/view/",

	/*  Read file
		path = ""
	*/
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

	/*  Parse content
		content = ""
		args = {}
	*/
	parse: async function(content, args={}) {
		/* Variables */
		let result = content, key;
		let match = [];

		/* Getting all labels */
		if(match = `${result}`.match(/\{\{.*?\}\}/g)) {
			/* Label replacement */
			for(let i = 0; i < match.length; i++) {
				key = match[i].replace(/(\{|\}|\s)/g, "");
				
				if(/\.\w+$/.test(key)) {
					key = await this.get(key);
					key = (key.code == 200) ? key.content : "";
				} else {
					key = (key in args) ? args[key] : "";
				}

				result = `${result}`.replace(match[i], key);
			}
		}

		return result;
	},

	/*  Get file
		object = "" / {
			filename: "",
			args: {}
		}
		args = {}
	*/
	get: async function(object="", argumnts={}) {
		let result, filename=object, args=argumnts;

		if(typeof object == "object") {

			if("filename" in object) {
				filename = object.filename;
			}

			if("args" in object) {
				args = object.args;
			}
		}

		result = await this.read(this.path + filename);
		
		if(result.code == 200) {
			result.content = await this.parse(result.content, args);
		}

		return result;
	},

	/*  Out file
		response = {}
		arguments = {
			filename: "",
			args: {}
		}
	*/
	out: async function(response, object={}, args={}) {
		let result;

		result = await this.get(object);
		
		if(result.code == 400) {
			result.content = "View not found";
		}

		response.setHeader("Content-Type", "text/html");
		response.status_code = result.code;
		response.end(result.content);
	}

};

/* Export */
module.exports = view;