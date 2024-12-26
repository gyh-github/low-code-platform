const userModel = require('./../models/userModel');

//获取用户列表所有数据
const getUsersAll = async () => {
    return await userModel.query();
}
//新增
const addUser = async (data) => {
    return await userModel.add(data)
}
//获取单个用户信息
const getUserInfo = async (data) => {
    return await userModel.info(data);
};
module.exports = { getUsersAll, addUser, getUserInfo };