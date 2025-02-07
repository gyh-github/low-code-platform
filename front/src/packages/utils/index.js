
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

//创建下拉菜单
export function createDropMenuFn(menus,style, fn) {
     const _div = document.createElement('div');
                _div.clickOutside = 'dropmenu'
                _div.className = 'drop-menu-action';
                _div.style.top = style.top + 'px';
                _div.style.left = style.left + 'px';
                _div.onclick = (e) => { fn(e)};
                let _html = '';
                for (let i = 0; i < menus.length; i++) {
                    _html += ('<button data-item=' + menus[i].key + '>' + menus[i].label + '</button>')
                }
                _div.innerHTML = _html;
                document.body.appendChild(_div);
}
//删除下来菜单
export function deleteDropMenuFn() {
    const _drop = document.querySelector('.drop-menu-action');
    _drop && document.body.removeChild(_drop);
 }
