const connection = require('./../config/db');

//查询所有数据
const all = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from project order by create_time desc", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
};
//分页查询热门项目数据
const popular = () => {
    return new Promise((resolve, reject) => {
        connection.query( `select * from project order by cited_num desc limit 0,3`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        })
    })
};
//分页查询私有项目数据
const privatePage = (params) => {
    return new Promise((resolve, reject) => {
        connection.query( `select * from project where author_id=${params.author_id}  order by create_time desc limit ${params.pageCurrent-1}, ${params.pageSize-1}`, (error, data) => {
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
    return new Promise(async (resolve, reject) => {
        connection.query("insert into project(title,json_data,thumbnail_url,author_id,author_name,create_time,status,module_id,cited_num,view_num) values(?,?,?,?,?,?,?,?,?,?)", params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}
//重置被引用次数
const resetCitedNum = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from project where module_id=${id}`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                connection.query(`update project set cited_num=${data.length} where id=${id}`, (updateError, updateData) => { 
                    if (updateError) {
                        reject(updateError);
                    } else { 
                        resolve(updateData);
                    }
                })
            }
        })
    })
}
//修改
const edit = (params) => {
    return new Promise((resolve, reject) => {
        connection.query(`update project set title='${params['title']}', json_data='${params['json_data']}', thumbnail_url='${params['thumbnail_url']}' where id=${params['id']}`, (error, data) => {
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
        connection.query(`delete from project where id=${params.id}`, (error, data) => {
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

module.exports = { all, add, del, edit, infoById,privatePage,popular,resetCitedNum };