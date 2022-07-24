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
				
				/* Displaying object data */
				if(key.includes("this.")) {
					key = this._get_args_value(args, key);
				}
				
				/* Get another view */
				else if(/\.\w+$/.test(key)) {
					key = await this.get(key);
					key = (key.code == 200) ? key.content : "";
				}

				/* Substituting a value into a label */
				else {
					key = (key in args) ? args[key] : "";
				}

				result = `${result}`.replace(match[i], key);
			}
		}

		return result;
	},

	/*  Get the value of the argument
		args = {}
		string = ""
	*/
	_get_args_value: function(args, string) {
		let result, array;

		array = string.split(".");
		result = args[array[1]];
		
		if(result) {
			for(let i = 2; i < array.length; i++) {
				result = result[array[i]];
			}
		}
		
		else {
			result = "";
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
		let result, view=object, args=argumnts;

		if(typeof object == "object") {
			args = object;

			if("view" in object) {
				view = object.view;
			}
		}

		result = await this.read(this.path + view);
		
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

		result = await this.get(object, args);
		
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