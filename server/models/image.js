/* Require model */
const model = require("../core/model.js");

/* Image model */
const client = {
	__proto__: model, // inheritance

	/* Table data */
	table: "images",
	pkey: "image_id"

}

/* Export */
module.exports = client;