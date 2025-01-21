import Axios from 'axios';
import { message } from 'ant-design-vue';

const service = Axios.create({
    baseURL: '/api',
    timeout: 1000 * 60 * 10
})

const whiteUrls = [''];

// 请求拦截
service.interceptors.request.use(config => {
    const token = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (['get', 'GET'].includes(config.method)) {
        const url = config.url;
        const t = new Date().getTime();
        config.url = url.indexOf('?') >= 0 ? `${url}&t=${t}` : `${url}?t=${t}`;
    }
    if (token) {
        config.headers = {
            ...config.headers,
            authorization: token,
            'x-refresh-token': refreshToken
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截
service.interceptors.response.use(res => {
    message.destroy();
    const { data: { code, msg, data } } = res;
    if (code === 'T0000') {
        message.success(msg);
        return data;
    }
    if (code === 'T0003') {
        message.error(msg);
        return null;
    }
}, error => {
    message.error('接口服务异常！请联系工作人员处理！');
    return Promise.reject(error);
});
export default service;