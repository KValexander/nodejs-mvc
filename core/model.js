/* Require db */
const db = require("./db.js");

/* Model */
const model = {
	table: "",
	pkey: "",

	/* Query */
	_query: async function(sql, first=false) {
		let result;

		console.log(sql);
		result = await db.query(sql);

		if(result.code == 200) {
			result = {
				code: result.code,
				content: (first) ?
					result.content[0][0] : result.content[0]
			}
		}

		return result;
	},

	/*  Get one
		arguments = {
			id: 0 / [],
			limit: 0,
			join: [] / {},
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
			join = "",
			where = "",
			select = "*",
			orderby = "",
			limit = "";

		/* If the argument is a number */
		if(Number.isFinite(parseInt(object))) {
			where = this._id_processing(object);
			first = true;
		}

		/* If the argument is an object */
		else if(typeof object == "object") {

			/* ID */
			if("id" in object) {
				where = this._id_processing(object.id);
			}

			/* First */
			if("first" in object) {
				first = object.first;
			}

			/* Join */
			if("join" in object) {
				join = this._join_processing(object.join);
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
				orderby = ` ORDER BY ${object.orderby[0]} ${object.orderby[1]}`;
			}

			/* Limit */
			if("limit" in object) {
				limit = " LIMIT " + object.limit;
			}

		}

		/* SQL query */
		sql = `SELECT ${select} FROM ${this.table}${join}${where}${orderby}${limit};`;

		/* Query */
		result = this._query(sql, first);

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
			fields = "(" + this._select_processing(object.fields) + ")";
		}

		/* Values is Array */
		if("values" in object) {
			values = this._values_processing(object.values);
		}

		/* SQL query */
		sql = `INSERT INTO ${this.table}${fields}${values};`;

		/* Query */
		result = this._query(sql);

		return result;
	},

	/* Update
		arguments = {
			id: 0 / [],
			where: [],
			values: {}
		}
	*/
	update: async function(object={}) {
		/* Variables */
		let result, sql,
			where = "",
			values = "";

		/* ID */
		if("id" in object) {
			where = this._id_processing(object.id);
		}

		/* Where */
		if("where" in object) {
			where = this._where_processing(object.where);
		}

		/* Values */
		if("values" in object) {
			values = this._set_processing(object.values);
		}

		/* SQL query */
		sql = `UPDATE ${this.table}${values}${where}`;

		/* Query */
		result = await this._query(sql);

		return result;
	},

	/* Delete
		arguments = {
			id: 0 / [],
			where: [],
			join: []
		}
	*/
	delete: async function(object={}) {
		/* Variables */
		let result, sql,
			tables = "",
			where = "",
			join = "";

		/* If the argument is a number */
		if(Number.isFinite(parseInt(object))) {
			where = this._id_processing(object);
		}

		/* If the argument is an object */
		else {

			/* ID */
			if("id" in object) {
				where = this._id_processing(object.id);
			}

			/* Where */
			if("where" in object) {
				where = this._where_processing(object.where);
			}

			/* Join */
			if("join" in object) {
				join = this._join_processing(object.join);

				if(Array.isArray(object.join)) {
					for(let i = 0; i < object.join.length; i++) {
						if(!i) {
							tables += this.table + ", ";
						} else {
							tables += object.join[i].table + ", ";
						}
					}
					tables = " " + tables.slice(0, -2);
				} else {
					tables = ` ${this.table}, ${object.join.table}`;
				}
			}

		}

		/* SQL query */
		sql = `DELETE${tables} FROM ${this.table}${join}${where};`;

		/* Query */
		result = await this._query(sql);

		return result;
	},

	/* Join */
	join: function(ekey, type="INNER") {
		return {
			table: this.table,
			pkey: this.pkey,
			ekey: ekey,
			type: type
		};
	},

	/*  SQL constructor
		arguments = {
			type: 'select' / 'insert' / 'update' / 'delete',

		}
	*/
	_sql_constructor: function(object) {
		let sql;

		switch(object.type) {

			case "select": break;
			case "insert": break;
			case "update": break;
			case "delete": break;

		}


		return sql;
	},

	/* ID processing */
	_id_processing: function(array) {
		let result = "";

		if(Array.isArray(array)) {
			for(let i = 0; i < array.length; i++) {
				result += array[i] + ", ";
			}
			result = ` WHERE ${this.pkey} IN (${ result.slice(0, -2)})`;

		} else {
			result = ` WHERE ${this.pkey}=${array}`;
		}

		return result;
	},

	/* Select processing*/
	_select_processing: function(select) {
		let result = "";

		for(let i = 0; i < select.length; i++) {
			result += `${select[i]}, `;
		}

		result = result.slice(0, -2);

		return result;
	},

	/* Join processing */
	_join_processing: function(array) {
		let result;
		
		if(Array.isArray(array)) {
			for(let i = 0; i < array.length; i++) {
				result += ` ${array[i].type} JOIN ${array[i].table} ON ${this.table}.${this.pkey}=${array[i].table}.${array[i].ekey}`;
			}
		} else {
			result = ` ${array.type} JOIN ${array.table} ON ${this.table}.${this.pkey}=${array.table}.${array.ekey}`;
		}

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
					result += ` WHERE ${where[i][0]}${cond}'${where[i][where[i].length - 1]}'`;
				}

				/* Subsequent conditions */
				else {

					/* Condition */
					if(array.includes(where[i][0])) {
						condition = ` ${where[i][0]} ${where[i][1]}`;
					}

					else {
						condition = ` AND ${where[i][0]}`;
					}

					result += `${condition}${cond}'${where[i][where[i].length - 1]}'`;
				}

			}

		/* One condition */
		} else {
			cond = (where.length == 2) ? "=" : where[1];
			result = ` WHERE ${where[0]}${cond}'${where[where.length - 1]}'`;
		}

		return result;
	},

	/* Set processing */
	_set_processing: function(set) {
		let result = "";

		for(let key in set) {
			result += `${key}='${set[key]}', `;
		}

		result = " SET " + result.slice(0, -2);

		return result;
	},

	/* Values processing */
	_values_processing: function(values) {
		let result = "";

		/* Values is Array */
		if (Array.isArray(values)) {
			for(let i = 0; i < values.length; i++) {
				result += this._value_processing(values[i]) + ", ";
			}
			result = " VALUES " + result.slice(0, -2);
		}

		/* Values is Object */
		else if(typeof values == "object") {
			result = " VALUES " + this._value_processing(values);
		}

		return result;
	},

	/* Value processing */
	_value_processing: function(values) {
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