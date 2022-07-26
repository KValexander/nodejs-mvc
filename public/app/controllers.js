/* Controllers */
const controllers = {

	/* Main page */
	main: async function() {
		let result;

		result = component.get("layout", {
			title: "Main page"
		});

		out.selector("body", result);

	},

	/* Register page */
	register: async function() {
		let result;

		result = component.get("layout", {
			title: "Register page"
		});

		out.selector("body", result);

	},

	/* Login page */
	login: async function() {
		let result;

		result = component.get("layout", {
			title: "Login page"
		});

		out.selector("body", result);

	},

};