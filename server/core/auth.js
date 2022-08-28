const auth = {
	_model: {},

	/* Set model */
	model: function(model) {
		this._model = require("../models/"+model);
	},

	/* Check auth */
	check: function() {
		return (localStorage.getItem("auth")) ? true : false;
	},

	/* Authorization */
	attempt: async function(object) {
		let result, where;

		for (key in object) {
			where.push([key, object[key]]);
		}

		result = await this._model.get({
			where: where,
			first: true
		});

		if(result.code == 200) {
			localStorage.setItem("auth", result.content);
		}

		return result;
	},

	/* Get auth user */
	get: function(key="") {
		if(!this.check()) return;
		let user = localStorage.getItem("auth");
		return (key) ? user[key] : user;
	},

};

module.exports = auth;