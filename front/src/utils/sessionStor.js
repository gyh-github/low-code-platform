import { encryptFn, decryptFn } from './crypt';
const sessStor = window.sessionStorage;

//保存当前用户信息
export const setUser = (params) => {
    // delete params?.exp;
    // delete params?.iat;
    sessStor.setItem('userInfo', encryptFn(JSON.stringify(params)))
}
//获取当前用户信息
export const getUser = () => {
    return JSON.parse(decryptFn(sessStor.getItem('userInfo')) || "{}")
}
//保存token
export const setToken = (str) => {
    sessStor.setItem('accessToken', encryptFn(str))
}
//获取token
export const getToken = () => {
   return decryptFn(sessStor.getItem('accessToken')) || ""
}
//保存refreshToken
export const setRefreshToken = (str) => {
    sessStor.setItem('refreshToken', encryptFn(str))
}
//获取refreshToken
export const getRefreshToken = () => {
   return decryptFn(sessStor.getItem('refreshToken')) || ""
}

//清除缓存
export const clearSessStor = () => { 
    sessStor.clear();
}