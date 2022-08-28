/* Component */
const component = {
	_components: {},

	/* 	Add component
		key = "" / {}
		comp = f() / {}
	*/
	add: function(key, comp) {
		if(typeof key == "object") {
			for(let k in key) {
				this._components[k] = key[k];
			}
		}

		else if(typeof comp == "function") {
			key = (comp.name) ? comp.name : key;
			this._components[key] = comp;
		}
	},

	/*  Get component
		key = ""
		args = {} / []
	*/
	get: function(key, args={}) {
		let result = "", comp = this._components[key];

		if(key in this._components) {

			if(typeof comp == "function") {

				if(Array.isArray(args)) {

					for(let i = 0; i < args.length; i++) {

						result += this.parse(comp(), args[i]);
						
					}

				}

				else {
					result = this.parse(comp(), args);
				}

			}

		}

		return result;
	},

	/* 	Parse component
		content = ""
		args = {}
	*/
	parse: function(content, args={}) {
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

				/* Arguments data */
				else if (key.includes("this.")) {
					key = this._get_args_value(key, args);
				}

				/* Nothing */
				else {
					key = "";
				}

				result = `${result}`.replace(match[i], key);
			}
		}

		return result;
	},


	/*  Get the value of the argument
		key = ""
		args = {}
	*/
	_get_args_value: function(key, args) {
		let result, array;

		array = key.split(".");
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

};