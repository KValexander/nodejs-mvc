/* Require model */
const model = require("../core/model.js");

/* Order model */
const order = {
	__proto__: model, // inheritance

	/* Table data */
	table: "orders",
	pkey: "order_id"

}

/* Export */
module.exports = order;