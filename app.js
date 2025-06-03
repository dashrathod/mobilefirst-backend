var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


//#region libarary
require('dotenv').config();
require('./database_config/models/index.js');
const passport = require('passport');
require('./config/passport-config.js')(passport);
// require('./config/socket-config.js');
var kafka = require('./config/kafka-config.js');
kafka.startKafka();
//#endregion

// DB.sequelize.sync({ alter: true });
// console.log("All models were synchronized successfully.");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/order.js');

var app = express();

app.use(cors());
// const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: process.env.sessionSecret || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

//for passport Strategy
app.use(passport.initialize());
app.use(passport.session());

// static path
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.options('*', cors()); // Pre-flight support for all routes
// error handler
app.use(function (err, req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or a specific domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
