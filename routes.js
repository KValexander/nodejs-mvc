const route = require("./core/route.js");

route.get("/", function() {
	console.log("Get route");
});

module.exports = route;