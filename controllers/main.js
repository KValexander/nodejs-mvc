/* Require core */
const view = require("../core/view.js");

/* Require models */
const user = require("../models/user.js");

/* Main controller */
const main = {

	/* Main function */
	main: async function(request, response) {
		let result;

		/* Add user */
		// result = await user.add({
		// 	fields: ["email", "login", "password"],
		// 	values: {
		// 		email: "1@1",
		// 		login: "login",
		// 		password: "123456"
		// 	}
		// });

		/* Update user */

		/* Delete user */

		/* Get user */
		
		/* Get all users */
		// result = await user.all();
		// console.log(result);
			
		/* Out view */
		view.out("index.html", response);

	},

};

/* Export */
module.exports = main;