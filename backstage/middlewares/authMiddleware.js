const jwt = require('jsonwebtoken');
const { secret, setAccessToken } = require('../utils/token');
const whiteList = ['/users/login', '/refresh'];
const isWhiteList = (url) => {
    return whiteList.find(item => item === url);
};
const checkAuth = async (req, res, next) => {
    if (isWhiteList(req.url)) {
        return await next();
    }
    const token = req.headers['authorization'];
    const refreshToken = req.headers['x-refresh-token'];
    if (token) {
        await jwt.verify(token, secret, async error => {
            if (error) {
                if (refreshToken) {
                    jwt.verify(refreshToken, secret, async (refreshError, refreshInfo) => {
                        if (refreshError) {
                            return res.send({
                                code: 'T0003',
                                msg: 'token失效！',
                                data: null
                            });

                        } else {
                            const newAccessToken = setAccessToken(refreshInfo);
                            res.setHeaders('Authorization', newAccessToken);
                            return await next();
                        }
                    })
                }
            } else {
                return await next();
            }
        })
    } else {
        return res.send({
            code: 'T0003',
            msg: 'token缺失！接口异常！',
            data: null
        });
    }
};

module.exports = checkAuth;