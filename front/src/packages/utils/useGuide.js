import { ref } from "vue";
import _ from 'lodash';

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
            left: 750 + (_list.length - 1) * 20
        }) : _list.push({
            id: new Date().getTime(),
            type: 'h',
            top: 750 + (_list.length - 1) * 20
        })
        guides.value = _list;
    };
    //选中辅助线
    const selectGuideFn = (e, item) => {
        e.stopPropagation();
        e.preventDefault();
        curGuide.value = _.cloneDeep(item);
        containerCenterC.value.addEventListener('mousemove', moveGuideFn);
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
        curGuide.value = null;
        containerCenterC.value.removeEventListener('mousemove', moveGuideFn);
    };
    return {
        addGuideFn,
        selectGuideFn,
        releaseGuideFn
    }
}