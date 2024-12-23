import server from '@/packages/utils/fetch';
//获取所有用户信息
export function getUsersAll() {
    return server('/api/users/all', 'GET')
}
//新增用户信息
export function addUser(params) {
    return server('/api/users/add', 'POST', params)
}