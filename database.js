
var mysql = require('mysql2');

// var connection = mysql.createPool({

// 	connectionLimit: 100,
// 	host: "localhost",
// 	user: "root",
// 	password: "MySQLBSU",
// 	database: "bsuBank"
// });

var connection = mysql.createPool({

	connectionLimit: 100,
	host: "us-cdbr-east-06.cleardb.net",
	user: "b8b7fcac585363",
	password: "ce79e7fd",
	database: "heroku_a7325715094d86f"
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
