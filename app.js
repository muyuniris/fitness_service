var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vipRouter = require('./routes/vip');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 允许访问的域，* 代表所有，生产环境建议填写具体的域名，如 http://www.faychou.com
  res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,Accept,Authorization"); // 表示服务器将会支持的请求头部值
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); // 允许的请求方式
  res.header('Access-Control-Allow-Credentials', 'true'); // 和客户端对应，必须设置以后，才能接收cookie
  next(); // 交给后面的中间件继续处理
});

// 在这之后，处理 API
app.use('', indexRouter);
app.use('/users', usersRouter);
app.use('/vip', vipRouter);

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

module.exports = app;
