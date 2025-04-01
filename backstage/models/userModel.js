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
    console.log(params)
    return new Promise((resolve, reject) => {
        connection.query("insert into users(user_name,user_password,user_photo,user_phone,user_real_name,user_self_introduction,user_role) values(?,?,?,?,?,?,?)", params, (error, data) => {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}
//修改
const edit = (params) => {
    return new Promise((resolve, reject) => {
        connection.query(`update users set ${params['column_key']}='${params[params['column_key']]}' where user_id=${params['user_id']}`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}
//根据登录信息查询用户信息
const info = (params) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from users where user_name=? and user_password=?", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}
//根据用户id查询用户信息
const infoById = (params) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from users where user_id=?", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = { query, add, info, edit, infoById};