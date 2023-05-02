var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM UserInfo";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:data});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var email = request.body.email;

	var password = request.body.password;

	var balance = request.body.balance;

	//var gender = request.body.gender;

	var query = `
	INSERT INTO UserInfo 
	(email, password, balance) 
	VALUES ("${email}", "${password}", "${balance}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/sample_data");
		}

	});

});

router.get('/edit/:email', function(request, response, next){

	var email = request.params.email;

	var query = `SELECT * FROM UserInfo WHERE email = "${email}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:email', function(request, response, next){

	var email = request.params.email;

	var password = request.body.password;

	var balance = request.body.balance;

	var query = `
	UPDATE UserInfo 
	SET password = "${password}", balance = "${balance}" WHERE email = "${email}"
    `;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/sample_data');
		}

	});

});

router.get('/delete/:email', function(request, response, next){

	var email = request.params.email; 

	var query = `
	DELETE FROM UserInfo WHERE email = "${email}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/sample_data");
		}

	});

});

module.exports = router;