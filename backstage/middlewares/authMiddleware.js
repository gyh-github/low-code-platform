const jwt = require('jsonwebtoken');
const { secret } = require('../utils/token');
const whiteList = ['/users/login', '/refresh'];
const isWhiteList = (url) => {
    return whiteList.find(item => item === url);
};
const checkAuth = async (req, res, next) => {
    console.log(req.url, '---req.url');
    if (isWhiteList(req.url)) {
        return await next();
    }
    const token = req.headers?.authorization;
    console.log(req.headers['authorization'], '---token');
    if (token) {
        await jwt.verify(token, secret, async error => {
            if (error) {
                return res.send({
                    code: 'T0003',
                    msg: 'accessToken失效！',
                    data: null
                });
            } else {
                return await next();
            }
        })
    } else {
        return res.send({
            code: 'T0003',
            msg: 'accessToken失效！',
            data: null
        });
    }
};

module.exports = checkAuth;