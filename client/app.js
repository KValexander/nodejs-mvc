/* Require client */
const client = require("./core/client.js");

/* Start client */
client.start("localhost", 8080);

/* Error component */
client.error("index");