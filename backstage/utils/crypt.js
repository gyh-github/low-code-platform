const CryptoJS = require('crypto-js');
const secretKey = '20250121qazxcvbnm';
//加密
 const encryptFn = (str) => (
    str && CryptoJS.AES.encrypt(str, secretKey).toString()
)
//解密
 const decryptFn = (str) => (
    str && CryptoJS.AES.decrypt(str,secretKey).toString(CryptoJS.enc.Utf8)
)

module.exports = {
    encryptFn,
    decryptFn
}

