/* Require model */
const model = require("../core/model.js");

/* User model */
const user = {
	__proto__: model, // inheritance

	/* Table data */
	table: "users",
	pkey: "user_id"

}

/* Export */
module.exports = user;