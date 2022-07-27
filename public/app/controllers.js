/* Controllers */
const controllers = {

	/* Main page */
	main_page: async function() {
		out.selector("header h2", "Main page");
		out.selector("main .content", "");

	},

	/* Login page */
	login_page: async function() {
		out.selector("header h2", "Login page");
		out.selector("main .content", "");

	},

	/* Register page */
	register_page: async function() {
		out.selector("header h2", "Register page");
		out.selector("main .content", component.get("register_form"));
	},

	/* Register */
	register: async function(e) {
		e.preventDefault();

		console.log("register form");
	},

};