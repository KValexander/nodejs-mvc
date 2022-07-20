/* Export mysql2 */
const mysql = require("mysql2");

const db = {
	connect: null,

	/* Connection to database */
	connection: function(data) {

		/* Connection to database */
		this.connect = mysql.createConnection(data);

		/* Check connection */
		this.connect.connect(err => {
			if(err) return console.log(`Error: ${err.message}`);
			console.log("Mysql database connection established");
		});

	},

	/* Close connection */
	end: function() {
		this.connect.end(err => {
			if(err) return console.log(`Error: ${err.message}`);
			console.log("Mysql database connection closed");
		});
	}


};

module.exports = db;