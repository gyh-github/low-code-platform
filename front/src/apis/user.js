import server from '@/utils/service';
//获取所有用户信息
export function getUsersAll() {
    return server.get('/users/all');
}
//新增用户信息
export function addUser(params) {
    return server.post('/users/add', params);
}
//修改用户信息
export function editUser(params) {
    return server.post('/users/edit', params);
}
//登陆
export function login(params) {
    return server.post('/users/login', params);
};
//通过token获取登录用户信息
export function getUserByToken(params) {
    return server.get('/users/getUserByToken', params);
};
//根据用户Id获取用户信息
export function getUserById(params) {
    return server.get(`/users/getUserById?user_id=${params}`);
}