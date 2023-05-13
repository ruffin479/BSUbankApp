var express = require('express');

var router = express.Router();

var database = require('../database');


/* GET home page. */
router.get('/', function(request, response, next) {
    response.render('homepage', { title: 'Express' });
  });


module.exports = router;