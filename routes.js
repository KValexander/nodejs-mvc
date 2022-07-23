/* Require route */
const route = require("./core/route.js");

/* Require controllers */
const main = require("./controllers/main.js");
const auth = require("./controllers/auth.js");

/* Require middlewares */
const type = require("./middlewares/type.js");

/*  Start api
	All routes, in addition to files and already registered ones,
	will be redirected to this view
*/
route.api("index.html");

/* Route groups */
route.group(["middleware", type.html], function() {

	route.get("/", main.main);
	route.get("/login", main.login);
	route.get("/register", main.register);
	route.get("/products", main.products);

	route.post("/login", auth.login);
	route.post("/register", auth.register);

});

/* Export */
module.exports = route;