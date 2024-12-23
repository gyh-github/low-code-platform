const json = require('body-parser/lib/types/json');
const userService = require('./../services/userService');

//获取所有用户数据
const getUsersAll = async (req, res) => {
    try {
        const resService = await userService.getUsersAll();
        res.send({
            code: 'T0001',
            msg: '查询成功！',
            data: resService
        });
    } catch (error) {
        res.status(500).json({ msg: '查询失败!' });
    }
}
//新增
const addUser = async (req, res) => {
    try {
        const params = req.body;
        await userService.addUser(Object.values(params));
        res.status(200).json({
            code: 'T0001',
            msg: '新增成功！',
            data: true

        });
    } catch (error) {
        res.status(500).json({ message: '添加失败!' });
    }
}

module.exports = {
    getUsersAll, addUser
};