
import _ from 'lodash';
//导出数据
export function exportJSONFn(data) {
    console.log(data)
    fetch("/test", {
        method: "post",
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => console.log(data));

};

//预览
export function previewFn(data, componentMap) {

    sessionStorage.setItem('state', JSON.stringify(data));
    sessionStorage.setItem('componentMap', componentMap);
    window.open('http://localhost:8091/#/preview')
    if (!data) return;
}
