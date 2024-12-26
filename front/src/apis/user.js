import server from '@/utils/service';
//获取所有用户信息
export function getUsersAll() {
    return server.get('/users/all');
}
//新增用户信息
export function addUser(params) {
    return server.post('/users/add', params);
}
//登陆
export function login(params) {
    return server.post('/users/login', params);
};