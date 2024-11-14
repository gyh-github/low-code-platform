import server from "./fetch";
/**
 * 生成json数据文件
*/
export function dataProcessing(data) {
    return server('/api/code/dataProcessing', 'POST', data)
}
/**
 * 打包生成项目代码
*/
export function generate(data) {
    return server('/api/code/generate', 'GET', data)
}