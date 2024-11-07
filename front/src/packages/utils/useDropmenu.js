import _ from 'lodash';
export default (plates) => {
    let curIten = null;

    let dropMenus = [{
        label: '删除',
        key: 'delete'
    }, {
        label: '隐藏',
        key: 'hide'
    }, {
        label: '展示',
        key: 'show'
    }, {
        label: '锁定',
        key: 'lock'
    }, {
        label: '解锁',
        key: 'unlock'
    }];

    const contextmenuFn = (e, item) => {
        e.preventDefault();
        curIten = _.cloneDeep(item);
        if (curIten.show) {
            dropMenus = dropMenus.filter(ite => ite.key != 'show');
        }
        if (!curIten.show) {
            dropMenus = dropMenus.filter(ite => ite.key != 'hide');
        }
        if (curIten.lock) {
            dropMenus = dropMenus.filter(ite => ite.key != 'lock');
        }
        if (!curIten.lock) {
            dropMenus = dropMenus.filter(ite => ite.key != 'unlock');
        }
        handleDropMenuHTMLFn(e)
    };

    const handleDropMenuFn = (e) => {
        console.log(e.target.dataset['item'])
        setTimeout(() => {
            let _plates = _.cloneDeep(plates.value);
            switch (e.target.dataset['item']) {
                case 'delete':
                    _plates = _plates.filter(item => item.id != curIten.id);
                    break;
                case 'hide':
                    _plates = _plates.map(item => {
                        item.show = item.id === curIten.id ? !item.show : item.show;
                        return item;
                    });
                    break;
                case 'show':
                    _plates = _plates.map(item => {
                        item.show = item.id === curIten.id ? !item.show : item.show;;
                        return item;
                    });
                    break;
                case 'lock':
                    _plates = _plates.map(item => {
                        item.lock = item.id === curIten.id ? !item.lock : item.lock;
                        return item;
                    });
                    break;
                case 'unlock':
                    _plates = _plates.map(item => {
                        item.lock = item.id === curIten.id ? !item.lock : item.lock;
                        return item;
                    });
                    break;

                default:
                    return;


            }
            plates.value = [..._plates];
        }, 0);
    };
    const handleDropMenuHTMLFn = (e) => {
        const dropMenuAction = document.getElementsByClassName('drop-menu-action')[0]
        if (dropMenuAction) {
            dropMenuAction.style.top = e.clientY + 'px';
            dropMenuAction.style.left = e.clientX + 'px';
            dropMenuAction.onclick = handleDropMenuFn;
        } else {
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
            document.body.appendChild(_div);
        }
    }
    return {
        contextmenuFn
    }
}