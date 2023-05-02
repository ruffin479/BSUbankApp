var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var userInfo = request.session.user;

    var email = userInfo.email;

    var query = `
    SELECT * FROM UserInfo 
    WHERE email = "${email}"
    `;
    

    console.log("UserInfo from entering:");
    console.log(userInfo);
    console.log(typeof userInfo);

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('signedIn', {title:'Node.js MySQL CRUD Application', action:'list', userData:data, message:request.flash('error')});
		}

	});

});

router.post("/signedin-deposit", function(request, response, next){

    var depositAmt = Number(request.body.deposit);

    

    console.log("deposit:" + depositAmt);

    var userInfo = request.session.user;
    console.log("UserInfo from deposit:");
    console.log(userInfo);
    var email = userInfo.email;
    var balance = Number(userInfo.balance);
    

    console.log("balance1:" + balance);
    balance = balance + depositAmt;
    console.log("balance2:" + balance);


    var query = `
    UPDATE UserInfo 
    SET balance = ${balance} WHERE email = "${email}"
    `;

    database.query(query, function(error, data){

        
        if(error)
        {
            throw error;
        }	
        else
        {
            request.session.user.balance = balance;
            response.redirect('/signedIn');
        }
    });
            
        	

});

router.post("/signedin-withdraw", function(request, response, next){

    
    
    var withdrawAmt = Number(request.body.withdraw);

    console.log("Withdraw:" + withdrawAmt);

    var userInfo = request.session.user;
    console.log("UserInfo from withdraw:");
    console.log(userInfo);
    var email = userInfo.email;
    var balance = Number(userInfo.balance);

    

    console.log("balance1:" + balance);

    balance = balance - withdrawAmt;

    console.log("balance2:" + balance);


    if(balance < 0){
        console.log("Your account does not have enough balance to withdraw that amount");
        request.flash('error', "Your account does not have enough balance to withdraw that amount");
        response.redirect('/signedIn');
    }
    else{
        var query = `
        UPDATE UserInfo 
        SET balance = ${balance} WHERE email = "${email}"
        `;

        database.query(query, function(error, data){

            if(error)
            {
                throw error;
            }	
            else
            {
                request.session.user.balance = balance;
                response.redirect('/signedIn');
            }
        });

    }

});

module.exports = router;