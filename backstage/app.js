var express = require('express');
var bodyParser = require('body-parser');
var json = express.json({ type: "*/json" });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var generateCodesRouter = require('./routes/generate-code');
var uploadRouter = require('./routes/upload');

var app = express();


app.use(json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/code', generateCodesRouter);
app.use('/upload', uploadRouter);


module.exports = app;
