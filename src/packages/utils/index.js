
import fs from 'node:fs';
//导出数据
export function exportJSONFn(data) {
    console.log(data)
};

//预览
export function previewFn(data, componentMap) {
    if (!data) return;
    const html = data.plates.map(
        item =>
        (componentMap[item.key].render(
            {
                ...componentMap[item.key].style,
                top: (item.top - 1000 + data.container.height / 2) + 'px',
                left: (item.left - 1000 + data.container.width / 2) + 'px'
            })));
    sessionStorage.setItem('html', JSON.stringify(html))
    sessionStorage.setItem('htmlStyle', JSON.stringify({ ...data.container }))
    window.open('./../../../test/index.html')
    console.log(fs)
}
