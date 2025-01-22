import CryptoJS from 'crypto-js';
const secretKey = '20250121qazxcvbnm';
//加密
export const encryptFn = (str) => (
    str && CryptoJS.AES.encrypt(str, secretKey).toString()
)
//解密
export const decryptFn = (str) => (
    str && CryptoJS.AES.decrypt(str,secretKey).toString(CryptoJS.enc.Utf8)
)

