var createError = require('http-errors');
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var sampledataRouter = require('./routes/sample_data');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var signedInRouter = require('./routes/signedIn');
var flash = require('connect-flash');

var app = express();

app.use(session({
  secret : 'bsuBankSQL',
  // cookie : {maxAge : 60000},
  cookie : {maxAge : 30 * 24 * 60 * 60 * 1000},
  saveUninitialized : false,
  resave : false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(flash());

app.use(session({secret: 'BsuBank', resave: true, saveUninitialized: true}))



//app.use('/', indexRouter);
app.use('/', signupRouter);
app.use('/users', usersRouter);
app.use('/sample_data', sampledataRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/signedIn', signedInRouter);

app.get('/signup', function(req, res) {
	res.render('signup', { });
 });

app.get('/signin', function(req, res) {
	res.render('signin', { });
 });

 app.get('/signedIn', function(req, res) {
	res.render('signedIn', { });
 });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
