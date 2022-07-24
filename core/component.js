const fs = require("fs");

const component = {
	path: process.cwd() + "/components/",
	_components: {},

	/* Load components */
	load: function() {
		let files, file;
		files = fs.readdirSync(this.path);
		for(let i = 0; i < files.length; i++) {
			file = files[i].split(".");
			if(file[1] == "js") {
				this.add(file[0], require(this.path + files[i]));
			}
		}
	},

	/* Add component */
	add: function(key, cmpnt) {
		this._components[key] = cmpnt;
	},

	/* Parse component */
	parse: function(content) {
		/* Variables */
		let result = content, key;
		let match = [];

		/* Getting all labels */
		if(match = `${result}`.match(/\{\{.*?\}\}/g)) {
			/* Label replacement */
			for(let i = 0; i < match.length; i++) {
				key = match[i].replace(/(\{|\}|\s)/g, "");

				/* Get component */
				if(key in this._components) {
					key = this.get(key);
				}

				else {
					key = "";
				}

				result = `${result}`.replace(match[i], key);
			}
		}

		return result;
	},

	/* Get component */
	get: function(key) {
		let result = "";

		if(key in this._components) {
			result = this._components[key]();
			result = this.parse(result);
		}

		return result;
	}

};

module.exports = component;