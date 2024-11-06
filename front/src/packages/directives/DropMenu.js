
const dropMenus = [{
    label: '删除',
    key: 'delete'
}];


function handleDropMenuFn(e) { console.log(e); }

const createHTML = () => {

    return _div;
}

const handleContextmenuFn = (e, el) => {
    e.preventDefault();
    e.stopPropagation();

    if (el.contains(e.target)) {
        console.log('里')
        if (document.getElementsByClassName('drop-menu-action')[0]) {
            return;
        }
        const _div = document.createElement('div');
        _div.className = 'drop-menu-action';
        _div.style.top = e.clientY + 'px';
        _div.style.left = e.clientX + 'px';
        _div.onclick = handleDropMenuFn;
        let _html = '';
        for (let i = 0; i < dropMenus.length; i++) {
            _html += ('<button data-item=' + dropMenus[i].key + '>' + dropMenus[i].label + '</button>')
        }
        _div.innerHTML = _html;
        el.appendChild(_div);
    } else {
        el.getElementsByClassName('drop-menu-action')[0] && el.removeChild(document.getElementsByClassName('drop-menu-action')[0])
    }
}

export default {
    mounted(el, binding) {
        el.style.border = "thin solid red";
        console.log(binding)
        document.addEventListener('contextmenu', (e) => handleContextmenuFn(e, el));
    },
    unmounted(el, binding) {
        document.removeEventListener('contextmenu', (e) => handleContextmenuFn(e, el));
    }
}