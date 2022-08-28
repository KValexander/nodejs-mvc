/* Require model */
const model = require("../core/model.js");

/* Product model */
const product = {
	__proto__: model, // inheritance

	/* Table data */
	table: "products",
	pkey: "product_id"

}

/* Export */
module.exports = product;