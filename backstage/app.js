var express = require('express');
var bodyParser = require('body-parser');
var json = express.json({ type: "*/json" ,limit:"10MB"});
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { secret } = require('./utils/token');

var authMiddleware = require('./middlewares/authMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var generateCodesRouter = require('./routes/generate-code');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(authMiddleware);//是否登陆校验

app.use(json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.use(cookieParser());//开启session
//配置session
app.use(session({
    secret,
    cookie: { maxAge: 10 * 60 * 1000 },
    resave: true,
    saveUninitialized: false
}));

//接口路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/code', generateCodesRouter);
app.use('/upload', uploadRouter);


module.exports = app;
