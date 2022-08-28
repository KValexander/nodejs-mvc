const form = {
	_forms: {},

	/* Get form */
	get: function(key) {
		let result = "", element;

		if(key in this._forms) {
			result = create.html(this._forms[key]);
		}

		return result;
	},

	/* Create form */
	create: function(key, object) {
		let template = {
			element: "form",
			id: "",
			name: "",
			class: "",
			action: "",
			method: "",
			enctype: "",
			elements: []
		};

		if(typeof object == "object") {

			for(let key in object) {
				if(key in template) {
					template[key] = object[key];
				}
			}

			this._forms[key] = template;

		}
	},

	/* Add elements to the form */
	add_item: function(key, element) {
		let template = {
			element: "input",
			id: "",
			name: "",
			class: "",
			type: "",
			placeholder: "",
			required: "",
			pattern: ""
		}

		if(Array.isArray(element)) {
			for(let i = 0; i < element.length; i++) {
				this.add_item(key, element[i]);
			}
		}

		else if(typeof element == "object") {

			for(let k in element) {
				if(k in template) {
					template[k] = element[k];
				}
			}

			this._forms[key].elements.push(template); 
		}
	}

};

