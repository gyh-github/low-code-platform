import server from '@/utils/service';
/**
 * 文件上传
*/
export function uploadFile(params) {
    return server.post('/upload/file', params);
}