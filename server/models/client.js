/* Require model */
const model = require("../core/model.js");

/* Client model */
const client = {
	__proto__: model, // inheritance

	/* Table data */
	table: "clients",
	pkey: "client_id"

}

/* Export */
module.exports = client;