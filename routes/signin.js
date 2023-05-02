var express = require('express');

var router = express.Router();

var database = require('../database');



router.get("/", function(request, response, next){

    response.render("signin", {title:'Validate Data from MySQL', action:'val', message:request.flash('error')});

});

router.post("/val_signin", function(request, response, next){

	var email = request.body.email;

	var password = request.body.password;

    var userInfo;

	var query = `
	SELECT email, password, balance FROM UserInfo 
	WHERE email = "${email}";
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
            console.log(data);
            if(data.length == 0){

                console.log("Email does not exist");
                request.flash('error', "Email does not exist");
                response.redirect("/signin");

            }else{
                if(password != (data[0].password)){
                    console.log("Wrong password");
                    request.flash('error', "Wrong password");
                    response.redirect("/signin");
                }else{
                    //response.redirect("/signedIn");

                    userInfo = {

                        "email": data[0].email,
                        "password": data[0].password,
                        "balance": data[0].balance
                    };


                    console.log("userInfo:" + userInfo);
    
                    request.session.user = userInfo;
                    response.redirect("/signedIn");
                }
            }
		}
	});

});


module.exports = router;