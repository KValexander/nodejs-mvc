/* Require route */
const route = require("./core/route.js");

/* Require component */
const component = require("./core/component.js");

/* Routes */
route.use("/href/", function(require, response) {
	response.write(component.get("main"));
});

route.use("/href/test", function(require, response) {
	response.write(component.get("test"));
});

/* Export */
module.exports = route;

