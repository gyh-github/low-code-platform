
import fs from 'node:fs';
//导出数据
export function exportJSONFn(data) {
    console.log(data)
};

//预览
export function previewFn(data, componentMap) {
    if (!data) return;
    const html = data.plates.map(
        item => {

            const _style = {
                ...item.attribute.style,
                width: item.attribute.style.width + 'px',
                height: item.attribute.style.height + 'px',
                top: (item.top - 1000 + data.container.height / 2) + 'px',
                left: (item.left - 1000 + data.container.width / 2) + 'px',
            };

            return (componentMap[item.key].render(
                {
                    ..._style,
                }, { id: "aaa", innerHTML: 'dasdasxxx' }));
        });
    sessionStorage.setItem('html', JSON.stringify(html))
    sessionStorage.setItem('htmlStyle', JSON.stringify({ ...data.container }))
    window.open('./../../../test/index.html')
    console.log(fs)
}
