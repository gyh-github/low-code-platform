const connection = require('./../config/db');

//查询
const query = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from users", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
};
//新增
const add = (params) => {
    return new Promise((resolve, reject) => {
        connection.query("insert into users(user_name,user_phone) values(?,?)", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}

module.exports = { query, add };