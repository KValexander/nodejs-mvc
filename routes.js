/* Require route */
const route = require("./core/route.js");

/* Require controllers */
const main = require("./controllers/main.js");

/* Require middlewares */
const type = require("./middlewares/type.js");

/* Main route */
route.get("/", function(request, response) {
	console.log("This is route");
	response.end("Work!");
});

/* Controller route */
route.get("/controller", main.main).middleware(type.html);

/* Route groups */
route.group(["middleware", type.html], function() {

	route.group(["middleware", type.test], function() {

		route.get("/group", main.main).middleware(type.json);

	});

});

module.exports = route;