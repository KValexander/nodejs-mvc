/* Require server */
const server = require("./core/server.js");

/* Start server */
server.start("localhost", 8080);

/* Connect to database */
server.connect({
	host: "localhost",
	user: "root",
	password: "root",
	database: ""
});