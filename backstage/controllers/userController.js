const userService = require('./../services/userService');
const { setAccessToken, setRefreshToken, getTokenInfo } = require('../utils/token');

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
        const resUserInfo = await userService.getUserInfo(Object.values(params));
        if (resUserInfo.length > 0) {
            const info = {
                userName: resUserInfo[0].user_name,
                userRole: resUserInfo[0].user_role,
                userPhone: resUserInfo[0].user_phone,
            };
            res.status(200).json({
                code: 'T0000',
                msg: '登录成功！',
                data: {
                    accessToken: setAccessToken(info),
                    refreshToken: setRefreshToken(info),
                }

            });
        } else {
            res.status(200).json({ code: 'T0001', msg: '登录失败！登录名或密码错误！' });
        }
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '登录失败!' });
    }
};
//通过token获取登录用户信息
const getUserByToken = async (req, res) => { 
    try {
        const data = await getTokenInfo(req.headers['x-refresh-token']);
        if (data) {
            res.send({
                code: 'T0000',
                msg: '通过token获取登录用户信息成功！',
                data
            })
        } else {
            res.status(500).json({ code: 'T0001', msg: '通过token获取登录用户信息失败!' });
        }

    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '通过token获取登录用户信息失败!' });

    }
}

module.exports = {
    getUsersAll, addUser, login, getUserByToken
};