import { onBeforeUnmount, onMounted } from "vue";
import useLine from "./useLine";
import _ from 'lodash';

export default (plates, plateData, workspace, lineData) => {
    let altCode = null;

    const { handleLineFn } = useLine(plateData, (x, y, hType, vType) => {
        lineData.hTop = y;
        lineData.vLeft = x;
        lineData.hType = hType;
        lineData.vType = vType;
    });

    const clearFocusFn = () => {
        plates.value = plates.value.map(item => {
            item.focused = false;
            return item;
        });
        plateData.focused = [];
        plateData.unFocused = [];
    }

    const workspaceMousedownFn = (e) => {
        e.preventDefault();
        clearFocusFn();
    }
    const mousedownFn = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        workspace.value.addEventListener('mousemove', mousemoveFn);
        if (altCode != 17) {
            clearFocusFn();
        }
        plateData.focused = [];
        plateData.unFocused = [];
        plates.value = plates.value.map(ite => ite.id === item.id ? { ...ite, focused: true } : { ...ite });
        plates.value.forEach(ite => {
            ite.focused ? plateData.focused.push(ite) : plateData.unFocused.push(ite);
        })
    }
    const mousemoveFn = (e) => {
        plates.value = plates.value.map(item => {
            const _item = plateData.focused.find(ele => ele.id === item.id);
            if (_item) {
                item.top = item.top + e.movementY;
                item.left = item.left + e.movementX;
            }
            return item;
        });
        handleLineFn();
    }
    const mouseupFn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePositionFn();
        workspace.value.removeEventListener('mousemove', mousemoveFn);
    }
    const handlePositionFn = () => {
        const hTypes = ['bottom-top', 'top-top', 'middle-middle', 'top-bottom', 'bottom-bottom'];
        const vTypes = ['right-left', 'left-left', 'middle-middle', 'right-right', 'left-right'];
        if (hTypes.includes(lineData.hType) || vTypes.includes(lineData.vType)) {
            let _distanceTop = 0;
            switch (lineData.hType) {
                case 'bottom-top':
                    _distanceTop = lineData.hTop - plateData.focused[plateData.focused.length - 1].top - plateData.focused[plateData.focused.length - 1].height;
                    break;
                case 'top-top':
                    _distanceTop = lineData.hTop - plateData.focused[plateData.focused.length - 1].top;
                    break;
                case 'middle-middle':
                    _distanceTop = lineData.hTop - plateData.focused[plateData.focused.length - 1].top - plateData.focused[plateData.focused.length - 1].height / 2;
                    break;
                case 'bottom-bottom':
                    _distanceTop = lineData.hTop - plateData.focused[plateData.focused.length - 1].top - plateData.focused[plateData.focused.length - 1].height;
                    break;
                case 'top-bottom':
                    _distanceTop = lineData.hTop - plateData.focused[plateData.focused.length - 1].top;
                    break;
                default:
                    _distanceTop = 0;
                    return;
            }
            let _distanceLeft = 0;
            switch (lineData.vType) {
                case 'right-left':
                    _distanceLeft = lineData.vLeft - plateData.focused[plateData.focused.length - 1].left - plateData.focused[plateData.focused.length - 1].width;
                    break;
                case 'left-left':
                    _distanceLeft = lineData.vLeft - plateData.focused[plateData.focused.length - 1].left;
                    break;
                case 'middle-middle':
                    _distanceLeft = lineData.vLeft - plateData.focused[plateData.focused.length - 1].left - plateData.focused[plateData.focused.length - 1].width / 2;
                    break;
                case 'right-right':
                    _distanceLeft = lineData.vLeft - plateData.focused[plateData.focused.length - 1].left - plateData.focused[plateData.focused.length - 1].width;
                    break;
                case 'left-right':
                    _distanceLeft = lineData.vLeft - plateData.focused[plateData.focused.length - 1].left;
                    break;
                default:
                    _distanceLeft = 0;
                    return;
            }
            plates.value = plates.value.map(item => {
                const _item = plateData.focused.find(ele => ele.id === item.id);
                if (_item) {
                    item.top = item.top + _distanceTop;
                    item.left = item.left + _distanceLeft;
                }
                return item;
            });

        }
    }
    const keydownFn = (e) => {
        altCode = e.keyCode;
    }
    const keyupFn = (e) => {
        altCode = null;
    }
    onMounted(() => {
        document.addEventListener('keydown', keydownFn)
        document.addEventListener('keyup', keyupFn)
        workspace.value.addEventListener('mousedown', workspaceMousedownFn);
    })
    onBeforeUnmount(() => {
        document.removeEventListener('keydown', keydownFn);
        document.removeEventListener('keyup', keyupFn);
        workspace.value.removeEventListener('mousedown', workspaceMousedownFn);
    })

    return {
        mousedownFn,
        mouseupFn,
    }
}