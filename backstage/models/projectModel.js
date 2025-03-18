const connection = require('./../config/db');

//查询所有数据
const all = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from project", (error, data) => {
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
        connection.query("insert into project(title,thumbnail_url,author_id,author_name,create_time,status,module_id,cited_num,view_num) values(?,?,?,?,?,?,?,?,?)", params, (error, data) => {
            if (error) {
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
        connection.query(`update users set ${params['column_key']}='${params[params['column_key']]}' where user_id=${params['id']}`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}
//删除
const del = (params) => {
    return new Promise((resolve, reject) => {
        connection.query("delete from project where id=?", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
}
//根据id查询详细信息
const infoById = (params) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from project where id=?", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = { all, add, del, edit, infoById };