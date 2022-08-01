const validator = {
	_rules: {},
	_templates: {},

	/* 	Create rule 
		name = "" / {}
		condition = f()
	*/
	rule: function(name, condition) {
		if(typeof name == "object") {
			for(let key in name) {
				this.rules[key] = name[key];
			}
		}

		else if(typeof condition == "function") {
			this._rules[name] = condition;
		}
	},

	/* 	Create template
		key = ""
		rules = {}
	*/
	template: function(key, rules) {
		this._templates[key] = rules;
	},

	/* 	Data validity check
		key = ""
		data = {}
	*/
	check: function(key, data) {
		let messages = [];

		/* Checking for template existence */
		if(key in this._templates) {

			for(let prop in data) {

				/* Checking if the required data is in the template */
				if(prop in this._templates[key]) {



				}

			}


		}

		return messages;
	}

};

validator.rule("request", function(data) {
	return (data) ? true : "The field must not be empty";
});

validator.rule({
	request: data => (data) ? true : "The field must not be empty",
});

module.exports = validator;