import { ref } from "vue";
import _ from 'lodash';
import { createDropMenuFn,deleteDropMenuFn } from "./index";

export default (guides, containerCenterC) => {
    const curGuide = ref(null);
    //新增辅助线
    const addGuideFn = (type) => {
        let _list = _.cloneDeep(guides.value);
        /**
         * h:横向辅助线；
         * v:纵向辅助线
         */
        type === 'v' ? _list.push({
            id: new Date().getTime(),
            type: 'v',
            left: 750 + (_list.length - 1) * 50
        }) : _list.push({
            id: new Date().getTime(),
            type: 'h',
            top: 750 + (_list.length - 1) * 50
        })
        guides.value = _list;
    };
    //选中辅助线
    const selectGuideFn = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        curGuide.value = _.cloneDeep(item);
        if (e.button == 2) {
            const dropMenus = [{ label: '删除', key: 'delete' },{ label: '删除其他', key: 'delete-other' },{ label: '删除所有', key: 'delete-all' }];
            const _arr = document.getElementsByClassName('drop-menu-action')
            if (_arr?.length > 0) {
                _arr[0].style.top = e.clientY + 'px';
                _arr[0].style.left = e.clientX + 'px';
            } else { 
                createDropMenuFn(dropMenus, { top: e.clientY, left: e.clientX }, handleClickFn)
            }
        } else {
            containerCenterC.value.addEventListener('mousemove', moveGuideFn);
        }
    }
    //移动辅助线
    const moveGuideFn = (e) => {
        if (!curGuide.value) return;
        curGuide.value.type === 'v' ? curGuide.value.left = curGuide.value.left + e.movementX
            : curGuide.value.top = curGuide.value.top + e.movementY;
        guides.value = guides.value.map(ele => ele.id === curGuide.value.id ? curGuide.value : ele);
    }
    //放开辅助线
    const releaseGuideFn = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // curGuide.value = null;
        containerCenterC.value.removeEventListener('mousemove', moveGuideFn);
    };
    //点击事件
    const handleClickFn = (e) => {
        const _key = e.target.dataset['item'];
        const _cur = curGuide.value;
        let _list =  _.clone(guides.value);
        switch (_key) {
            case 'delete':
                _list = _list.filter(item => item.id != _cur.id);
                guides.value = _list;
                break;
            case 'delete-other':
                _list = _list.filter(item => item.id === _cur.id);
                guides.value = _list;
                break;
            case 'delete-all':
                guides.value = [];
                break;
            default:
                return;
        }
        deleteDropMenuFn();
     };
    return {
        addGuideFn,
        selectGuideFn,
        releaseGuideFn
    }
}