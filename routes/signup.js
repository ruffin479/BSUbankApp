var express = require('express');

var router = express.Router();

var database = require('../database');


router.get("/", function(request, response, next){


	response.render("signup", {title:'Insert Data into MySQL', action:'add', message:request.flash('error')});

});


router.post("/add_signup", function(request, response, next){

	const validateEmail = (email) => {//Checks if email is valid or not
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

	var email = request.body.email;

	var password = request.body.password;

	var confirmPwrd = request.body.confirmPwrd;

	var emailExist;

	var userInfo;

	var selQuery = `
	SELECT email, password, balance FROM UserInfo 
	WHERE email = "${email}";
	`;

	database.query(selQuery, function(error, data){
		if(error)
		{
			throw error;
		}	
		else
		{
            console.log(data);

            // if(data.length == 0){

			// 	emailExist = false;
            // }else{
			// 	emailExist = true;
			// }
			
			// console.log("emailExist:");
			// console.log(emailExist);

		}
	});

	// Is the email valid?
	if(validateEmail(email)){

		//Are password and confirmPword the same string?
		if(password == confirmPwrd){

				// Create an array and push all possible values that you want in password
				var matchedCase = new Array();
				matchedCase.push("[$@$!%*#?&]"); // Special Charector
				matchedCase.push("[A-Z]");      // Uppercase Alpabates
				matchedCase.push("[0-9]");      // Numbers
				matchedCase.push("[a-z]");     // Lowercase Alphabates
		
				// Check the conditions
				var ctr = 0;
				for (var i = 0; i < matchedCase.length; i++) {
					if (new RegExp(matchedCase[i]).test(password)) {
						ctr++;
					}
				}
				// Display it
				var strength = "";
				switch (ctr) {
					case 0:
					case 1:
					case 2:
						strength = "Very Weak";
						break;
					case 3:
						strength = "Medium";
						break;
					case 4:
						strength = "Strong";
						break;
				}

				if(strength == "Strong"){

					var afterAt = email.split("@")[1];
		
					//if the email has bowiestate.edu or students.bowiestate.edu
					if ((afterAt == "bowiestate.edu") || (afterAt == "students.bowiestate.edu")) {

						var insertQuery = `
						INSERT INTO UserInfo 
						(email, password, balance) 
						VALUES ("${email}", "${password}", 0)
						`;

						console.log("emailExist2:");
						console.log(emailExist);


						database.query(insertQuery, function(error, data){


							if(error)
							{
								console.log("Email already has an account");
								request.flash('error', "Email already has an account");
								response.redirect("/signup");
								// throw error;
							}	
							else
							{

								userInfo = {

									"email": email,
									"password": password,
									"balance": 0
								};		

								request.session.user = userInfo;
								response.redirect("/signedIn");
							}// end of else
						}); // end of query
					}
					else
					{
						console.log("Please use a BSU email");
						request.flash('error', 'Please use a BSU email');
						response.redirect("/signup");
					}// end of else
				} // end of if(strength)
				else
				{
					console.log("Please use a strong password");
					request.flash('error', 'Please use a strong password');
					response.redirect("/signup");
				}
		//Not a bowiestate.edu email
		}// End of checking if password and confirm-password are the same
		else
		{

		console.log("Password and confirm-password do not match");
		request.flash('error', "Password and confirm-password do not match");
		response.redirect("/signup");
		}
	}
	else{
		console.log("Not a valid email");
		request.flash('error', 'Not a valid email');
		//response.render("signup", {title:'Insert Data into MySQL', action:'error1'});
		response.redirect("/signup");
	  }  

});



module.exports = router;