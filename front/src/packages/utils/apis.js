import server from "@/utils/service";
/**
 * 生成json数据文件
*/
export function dataProcessing(data) {
    return server.post('/code/dataProcessing', data)
}
/**
 * 打包生成项目代码
*/
export function generate(data) {
    return server.get('/code/generate',data)
}
/**
 * 文件上传
*/
export function uploadFile(data) {
    return server.post('/upload/file',data)
}