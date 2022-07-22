/* Require model */
const model = require("../core/model.js");

/* Project model */
const project = {
	__proto__: model, // inheritance

	/* Table data */
	table: "projects",
	pkey: "project_id"

}

/* Export */
module.exports = project;