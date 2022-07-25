const controller = {

	/* Main page */
	main: async function() {
		let result;

		result = await request.text("api/main");
		out.id("app", result);
		
		out.selector("main .content", "<h1>Main page</h1>");
	},

};