const userService = require('./../services/userService');
const { setAccessToken, setRefreshToken } = require('../utils/token');

//获取所有用户数据
const getUsersAll = async (req, res) => {
    try {
        const resService = await userService.getUsersAll();
        res.send({
            code: 'T0000',
            msg: '查询成功！',
            data: resService
        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '查询失败!' });
    }
}
//新增
const addUser = async (req, res) => {
    try {
        const params = req.body;
        await userService.addUser(Object.values(params));
        res.status(200).json({
            code: 'T0000',
            msg: '新增成功！',
            data: true

        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '添加失败!' });
    }
};
//登录
const login = async (req, res) => {
    try {
        const params = req.body;
        await userService.getUserInfo(Object.values(params));
        res.status(200).json({
            code: 'T0000',
            msg: '登录成功！',
            data: {
                accessToken: setAccessToken(params),
                refreshToken: setRefreshToken(params)
            }

        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '登录失败!' });

    }
};

module.exports = {
    getUsersAll, addUser, login
};