import server from "./fetch";
export function generateCode(data) {
    return server('/api/code/generate', 'POST', data)
}