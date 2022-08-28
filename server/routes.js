/* Require route */
const route = require("./core/route.js");

/* Require controllers */
const main = require("./controllers/main.js");

/* Require middlewares */
const html = require("./middlewares/html.js");
const json = require("./middlewares/json.js");

/*  Start api
	All routes, in addition to files and already registered ones,
	will be redirected to this view
*/
route.api("index.html"); // view
// route.api(function(request, response) {
// 	response.end();
// });

/* Main page */
route.get("/api/main", main.main);


/* Route groups */
// route.group(["middleware", html], function() {

// 	// route.get("/", main.main).middleware(json);
// 	route.get("/", main.main);

// });

/* Export */
module.exports = route;