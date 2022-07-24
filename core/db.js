/* Require mysql2 */
const mysql = require("mysql2");

const db = {
	connect: null,
	check: false,

	/* Connection to database */
	connection: function(data) {

		/* Connection to database */
		this.connect = mysql.createConnection(data);

		/* Check connection */
		this.connect.connect(err => {
			if(err) {
				db.check = false;
				console.log(`Error: ${err.message}`);
			} else {
				db.check = true;
				console.log("Mysql database connection established");
			}
		});

	},

	/* Close connection */
	end: function() {
		this.connect.end(err => {
			if(err) return console.log(`Error: ${err.message}`);
			console.log("Mysql database connection closed");
		});
	},

	/* Execute query */
	query: async function(sql) {
		let result;

		/* Request execution */
		try {
			result = {
				code: 200,
				content: await this.connect.promise().query(sql)
			}
		/* Catching errors */
		} catch(err) {
			result = {
				code: 400,
				content: err
			}
		}

		/* Returning a result */
		return result;
	},

	/* Execute query */
	execute: async function(sql) {
		let result;

		/* Request execution */
		try {
			result = {
				code: 200,
				content: await this.connect.execute(sql)
			}
		/* Catching errors */
		} catch(err) {
			result = {
				code: 400,
				content: err
			};
		}

		/* Returning a result */
		return result;
	},


};

/* Export */
module.exports = db;