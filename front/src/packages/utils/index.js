
import _ from 'lodash';
import { dataProcessing } from './apis';
//导出数据
export async function exportJSONFn(data) {
    console.log(data)
    const res = await dataProcessing(data);
    if (res) {
        alert('导出成功！')
    }

};

//预览
export function previewFn(data, componentMap) {
    sessionStorage.setItem('state', JSON.stringify(data));
    sessionStorage.setItem('componentMap', componentMap);
    if (!data) return;
    window.open('http://localhost:8091/#/preview')
}
