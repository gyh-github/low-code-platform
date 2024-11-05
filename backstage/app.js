var express = require('express');
var bodyParser = require('body-parser');
var json = express.json({ type: "*/json" });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var generateCodesRouter = require('./routes/generate-code');

var app = express();


app.use(json);
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/code', generateCodesRouter);


module.exports = app;
