/* Require core */
const view = require("../core/view.js");

/* Main controller */
const main = {

	/* Main function */
	main: async function(request, response) {
		response.end();

		/* View out */
		// view.out(response, "index.html", {
		// 	SERVER: "server",
		// 	content: {
		// 		code: 1,
		// 		content: 2
		// 	}
		// });


		// let result, id;

		/* Add user */
		// result = await user.add({
		// 	select: ["email", "login", "password"],
		// 	values: {
		// 		email: "1@1",
		// 		login: "login",
		// 		password: "123456"
		// 	}
		// });
		// console.log(result);

		/* ID */
		// id = result.content.insertId;

		/* Update user */
		// result = await user.update({
		// 	where: ["user_id", id],
		// 	values: {
		// 		email: "0@0",
		// 		login: "nigol",
		// 		password: "654321"
		// 	}
		// });
		// console.log(result);

		/* Get user */
		// result = await user.get(id); // specific user
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
		// console.log(result);

		/* Delete user */
		// result = await user.delete(id);
		// result = await user.delete({
		// 	where: ["projects.user_id", 1],
		// 	join: project.join("user_id", "right")
		// });
		// console.log(result);


		/* Out view */
		// view.out(response, "index.html");
		// view.out(response, {
		// 	filename: "index.html",
		// 	args: {
		// 		meta: "<h2>Meta!</h2>",
		// 		content: "<h3>It's work!</h3>"
		// 	}
		// });

	},

};

/* Export */
module.exports = main;