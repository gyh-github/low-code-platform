const jwt = require('jsonwebtoken');
const secret = '20241214_low_code_backstage_token_qwertyuiop';//密钥
const accessTokenTime = '10s';//token过期时间
const refreshTokenTime = '20s';//用于备用的token过期时间

//生产accessToken
const setAccessToken = (payload = {}) => {
    return jwt.sign(payload, secret, { expiresIn: accessTokenTime });
};

//生产refreshToken
const setRefreshToken = (payload = {}) => {
    return jwt.sign(payload, secret, { expiresIn: refreshTokenTime });
};
//解析token
const getTokenInfo = (token) => {
    return jwt.verify(token, secret, (_, data) => {
        return data
    });
};

module.exports = {
    secret,
    setAccessToken,
    setRefreshToken,
    getTokenInfo
};
