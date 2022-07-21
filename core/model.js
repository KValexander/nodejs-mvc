/* Require db */
const db = require("./db.js");

/* Model */
const model = {
	table: "",
	pkey: "",

	/* Get all */
	all: async function(select = "*") {
		let result;
		
		result = await db.query(`SELECT ${select} FROM \`${this.table}\``);

		if(result.code == 200) {
			result = {
				code: result.code,
				content: result.content[0]
			}
		}
		
		return result;
	},

	/* Get one */
	get: async function(object) {

	},

	/* Insert */
	add: async function(object = {
		fields: [],
		values: [],
	})
	{
		/* Variables */
		let result,
			fields = "",
			values = "";

		/* Fields */
		if("fields" in object) {
			for(let i = 0; i < object.fields.length; i++) {
				fields += `\`${object.fields[i]}\`, `;
			}
			fields = "(" + fields.slice(0, -2) + ")";
		}

		/* Values is Array */
		if (Array.isArray(object.values)) {
			for(let i = 0; i < object.values.length; i++) {
				values += this._object_processing(object.values[i]) + ", ";
			}
			values = "VALUES " + values.slice(0, -2);
		
		/* Values is Object */
		} else if(typeof object.values == "object") {
			values = "VALUES " + this._object_processing(object.values);
		}

		/* Result */
		result = await db.query(`INSERT INTO \`${this.table}\`${fields} ${values};`);

		return result;
	},

	/* Update */
	update: async function(object) {

	},

	/* Delete */
	delete: async function(object) {

	},

	/* Object processin */
	_object_processing: function(object) {
		let result = "";

		for(let key in object) {
			result += `'${object[key]}', `;
		}

		result = "(" + result.slice(0, -2) + "), ";

		return result.slice(0, -2);
	},

};

/* Export */
module.exports = model;