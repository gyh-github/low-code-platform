import server from '@/utils/service';
//获取所有
export function all() {
    return server.get('/project/all');
}
//获取热门项目
export function popular() {
    return server.get('/project/popular');
}
//获取私有项目带分页
export function privatePage(params) {
    return server.post('/project/privatePage', params);
}
//新增
export function add(params) {
    return server.post('/project/add', params);
}
//修改
export function edit(params) {
    return server.post('/project/edit', params);
}
//删除
export function del(params) {
    return server.post('/project/del', params);
};
//详情
export function detail(params) {
    return server.post('/project/infoById', params);
};