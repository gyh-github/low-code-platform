const projectModel = require('./../models/projectModel');

//获取用户列表所有数据
const all = async () => {
    return await projectModel.all();
}
//新增
const add = async (data) => {
    return await projectModel.add(data)
}
//修改
const edit= async (data) => {
    return await projectModel.edit(data)
}
//删除
const del= async (data) => {
    return await projectModel.del(data)
}
//根据用户id获取用户信息
const infoById = async (data) => { 
    return await projectModel.infoById(data)
};
module.exports = { all, add, infoById, edit, del };