
var mysql = require('mysql2');

var connection = mysql.createPool({

	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "MySQLBSU",
	database: "bsuBank"
});


connection.getConnection(function(error, connection){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;
