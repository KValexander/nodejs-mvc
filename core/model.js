/* Require db */
const db = require("./db.js");

/* Model */
const model = {
	table: "",
	pkey: "",

	/*  Get all
		arguments = {
			select: [],
			orderby: []
		}
	*/
	all: async function(object = {}) {
		/* Variables */
		let result, sql,
			select = "*",
			orderby = "";

		/* Select */
		if("select" in object) {
			select = this._select_processing(object.select);
		}

		/* Orderby */
		if("orderby" in object) {
			orderby = ` ORDER BY \`${object.orderby[0]}\` ${object.orderby[1]}`;
		}

		/* SQL query */
		sql = `SELECT ${select} FROM \`${this.table}\`${orderby};`;

		/* Query */
		result = await db.query(sql);

		/* Handling result */
		if(result.code == 200) {
			result = {
				code: result.code,
				content: result.content[0]
			}
		}
		
		return result;
	},

	/*  Get one
		arguments = {
			id: 0,
			limit: 0,
			where: [],
			select: [],
			orderby: [],
			first: true / false
		}
	*/
	get: async function(object = {}) {
		/* Variables */
		let result, sql, cond,
			first = false,
			where = "",
			select = "*",
			orderby = "",
			limit = "",
			id = 0;

		/* If the argument is a number */
		if(Number.isFinite(object)) {
			id = object;
			where = ` WHERE \`${this.pkey}\`=${id}`;
		}

		/* If the argument is an object */
		else if(typeof object == "object") {

			/* ID */
			if("id" in object) {
				id = object.id;
				where = ` WHERE \`${this.pkey}\`=${id}`;
			}

			/* First */
			if("first" in object) {
				first = object.first;
			}

			/* Select */
			if("select" in object) {
				select = this._select_processing(object.select);
			}

			/* Where */
			if("where" in object) {
				where = this._where_processing(object.where);
			}

			/* Orderby */
			if("orderby" in object) {
				orderby = ` ORDER BY \`${object.orderby[0]}\` ${object.orderby[1]}`;
			}

			/* Limit */
			if("limit" in object) {
				limit = " LIMIT " + object.limit;
			}

		}

		/* SQL query */
		sql = `SELECT ${select} FROM \`${this.table}\`${where}${orderby}${limit};`;
		console.log(sql);

		/* Query */
		result = await db.query(sql);

		/* Handling result */
		if(result.code == 200) {
			result = {
				code: result.code,
				content: (first) ?
					result.content[0][0] : result.content[0]
			}
		}

		return result;
	},

	/*  Insert
		arguments = {
			fields: [],
			values: [] / {}
		}
	*/
	add: async function(object = {}) {
		/* Variables */
		let result, sql,
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
				values += this._values_processing(object.values[i]) + ", ";
			}
			values = "VALUES " + values.slice(0, -2);
		}

		/* Values is Object */
		else if(typeof object.values == "object") {
			values = "VALUES " + this._values_processing(object.values);
		}

		/* SQL query */
		sql = `INSERT INTO \`${this.table}\`${fields} ${values};`;

		/* Result */
		result = await db.query(sql);

		return result;
	},

	/* Update */
	update: async function(object={}) {

	},

	/* Delete */
	delete: async function(object={}) {

	},

	/*  SQL constructor
		arguments = {
			type: 'select' / 'insert' / 'update' / 'delete',

		}
	*/
	_sql_constructor: function(object) {

	},

	/* Select processing*/
	_select_processing: function(select) {
		let result = "";

		for(let i = 0; i < select.length; i++) {
			result += `\`${select[i]}\`, `;
		}

		result = result.slice(0, -2);

		return result;
	},

	/* Where processing */
	_where_processing: function(where) {
		let condition, cond, result = "";
		let array = ["and", "or", "AND", "OR"];
		let min_length;

		/* Multiple сonditions */
		if(Array.isArray(where[0])) {
			for(let i = 0; i < where.length; i++) {

				/* Cond */
				min_length = array.includes(where[i][0]) ? 3 : 2;
				cond = (where[i].length == min_length) ? "=" : where[i][min_length-1];

				/* First condition */
				if(!i) {
					result += ` WHERE \`${where[i][0]}\`${cond}'${where[i][where[i].length - 1]}'`;
				}

				/* Subsequent conditions */
				else {

					/* Condition */
					if(array.includes(where[i][0])) {
						condition = ` ${where[i][0]} \`${where[i][1]}\``;
					}

					else {
						condition = ` AND \`${where[i][0]}\``;
					}

					result += `${condition}${cond}'${where[i][where[i].length - 1]}'`;
				}

			}

		/* One condition */
		} else {
			cond = (where.length == 2) ? "=" : where[1];
			result = ` WHERE \`${where[0]}\`${cond}'${where[where.length - 1]}'`;
		}

		return result;
	},

	/* Values processing */
	_values_processing: function(values) {
		let result = "";

		for(let key in values) {
			result += `'${values[key]}', `;
		}

		result = "(" + result.slice(0, -2) + "), ";

		return result.slice(0, -2);
	},

};

/* Export */
module.exports = model;