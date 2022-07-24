/* Require route */
const route = require("./core/route.js");

/* Require controllers */
const main = require("./controllers/main.js");

/* Require middlewares */
const type_middleware = require("./middlewares/type.js");

/*  Start api
	All routes, in addition to files and already registered ones,
	will be redirected to this view
*/
route.api("index.html");

/* Route groups */
route.group(["middleware", type_middleware.html], function() {

	route.get("/", main.main);
	route.get("/orders", main.products);

	route.get("/login", main.login);
	route.get("/register", main.register);

});

/* Export */
module.exports = route;