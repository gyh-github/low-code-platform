const projectModel = require('./../models/projectModel');

//获取所有项目数据
const all = async () => {
    return await projectModel.all();
}
//获取热门项目数据
const popular = async () => {
    return await projectModel.popular();
}
//获取用户私有项目数据
const privatePage = async (data) => {
    return await projectModel.privatePage(data);
}
//新增
const add = async (data) => {
    return await projectModel.add(data)
}
//重置被引用次数
const resetCitedNum = async (data) => {
    return await projectModel.resetCitedNum(data)
}
//修改
const edit = async (data) => {
    return await projectModel.edit(data)
}
//删除
const del = async (data) => {
    return await projectModel.del(data)
}
//根据用户id获取用户信息
const infoById = async (data) => {
    return await projectModel.infoById(data)
};
module.exports = { all, add, infoById, edit, del, privatePage, popular, resetCitedNum };