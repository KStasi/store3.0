var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var routerMap = require("./routes/maproutecontroller");
var adminRouter = require("./routes/admincontroller");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(adminRouter);
var pages = [{prefix: "contacts", extention: ".html"}, {prefix: "events", extention: ""}];

pages.forEach((page) =>
    routerMap.mapRoute(app, page.prefix)
);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({'error': 'not found'});
});

http.createServer(app).listen(8080);

module.exports = app;
