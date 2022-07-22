/* Require core */
const view = require("../core/view.js");

/* Require models */
const user = require("../models/user.js");
const project = require("../models/project.js");

/* Main controller */
const main = {

	/* Main function */
	main: async function(request, response) {
		let result, id;

		/* Add user */
		result = await user.add({
			fields: ["email", "login", "password"],
			values: {
				email: "1@1",
				login: "login",
				password: "123456"
			}
		});
		console.log(result);

		/* ID */
		id = result.content.insertId;

		/* Update user */
		result = await user.update({
			id: id,
			values: {
				email: "0@0",
				login: "nigol",
				password: "654321"
			}
		});
		console.log(result);

		/* Get user */
		result = await user.get(id); // specific user
		// result = await user.get(); // all users
		// result = await user.get({ // constructor
		// 	where: [
		// 		["users.user_id", ">=", "1"],
		// 		["OR", "projects.user_id", ">=", "1"]
		// 	],
		// 	orderby: ["projects.created_at", "ASC"],
		// 	select: ["users.email", "users.login", "projects.project_name", "projects.project_id"],
		// 	join: project.join("user_id"),
		// 	limit: 5,
		// 	first: false
		// });
		console.log(result);

		/* Delete user */
		result = await user.delete(id);
		// result = await user.delete({
		// 	where: ["projects.user_id", 1],
		// 	join: project.join("user_id", "right")
		// });
		console.log(result);


		/* Out view */
		view.out("index.html", response);

	},

};

/* Export */
module.exports = main;