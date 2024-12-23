var mysql = require('mysql');

// 连接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
});
db.connect(err => {
    if (!err) console.log('数据库连接成功!!!')
});

module.exports = db;