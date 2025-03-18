import server from '@/utils/service';
//获取所有
export function allProject() {
    return server.get('/project/all');
}
//新增
export function addProject(params) {
    return server.post('/project/add', params);
}
//修改
export function editProject(params) {
    return server.post('/project/edit', params);
}
//删除
export function delProject(params) {
    return server.post('/project/del', params);
};
//详情
export function detailProject(params) {
    return server.post('/project/infoById', params);
};