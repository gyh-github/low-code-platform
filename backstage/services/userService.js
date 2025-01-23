const userModel = require('./../models/userModel');

//获取用户列表所有数据
const getUsersAll = async () => {
    return await userModel.query();
}
//新增
const addUser = async (data) => {
    return await userModel.add(data)
}
//修改
const editUser = async (data) => {
    return await userModel.edit(data)
}
//获取单个用户信息
const getUserInfo = async (data) => {
    return await userModel.info(data);
};
//根据用户id获取用户信息
const getUserById = async (data) => { 
    return await userModel.infoById(data)
};
module.exports = { getUsersAll, addUser, getUserInfo, getUserById, editUser };