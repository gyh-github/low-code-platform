import _ from 'lodash';
export default (plateData, callback) => {
    let x = 0;
    let y = 0;
    let hType = '';
    let vType = '';

    const handleLineFn = () => {
        const curMoveItem = _.cloneDeep(plateData.focused[plateData.focused.length - 1]);
        y = 0;
        x = 0;
        hType = '';
        vType = '';
        for (let i = 0; i < plateData.unFocused.length; i++) {
            const _unFocusedItem = _.cloneDeep(plateData.unFocused[i]);
            if (Math.abs(_unFocusedItem?.top - curMoveItem?.top - curMoveItem?.attribute.style.height) < 5) {
                y = _unFocusedItem?.top - 0;
                hType = 'bottom-top';
            } else if (Math.abs(_unFocusedItem?.top - curMoveItem?.top) < 5) {
                y = _unFocusedItem?.top - 0;
                hType = 'top-top';
            } else if (Math.abs(_unFocusedItem?.top + _unFocusedItem?.attribute.style.height / 2 - curMoveItem?.top - curMoveItem?.attribute.style.height / 2) < 5) {
                y = _unFocusedItem?.top + _unFocusedItem?.attribute.style.height / 2;
                hType = 'middle-middle';
            } else if (Math.abs(_unFocusedItem?.top + _unFocusedItem?.attribute.style.height - curMoveItem?.top - curMoveItem?.attribute.style.height) < 5) {
                y = _unFocusedItem?.top + _unFocusedItem?.attribute.style.height;
                hType = 'bottom-bottom';
            } else if (Math.abs(_unFocusedItem?.top + _unFocusedItem?.attribute.style.height - curMoveItem?.top) < 5) {
                y = _unFocusedItem?.top + _unFocusedItem?.attribute.style.height;
                hType = 'top-bottom';
            } else {
                y = 0;
                hType = '';
            }
            if (Math.abs(_unFocusedItem?.left - curMoveItem?.left - curMoveItem?.attribute.style.width) < 5) {
                x = _unFocusedItem?.left - 0;
                vType = 'right-left';
            } else if (Math.abs(_unFocusedItem?.left - curMoveItem?.left) < 5) {
                x = _unFocusedItem?.left - 0;
                vType = 'left-left';
            } else if (Math.abs(_unFocusedItem?.left + _unFocusedItem?.attribute.style.width / 2 - curMoveItem?.left - curMoveItem?.attribute.style.width / 2) < 5) {
                x = _unFocusedItem?.left + _unFocusedItem?.attribute.style.width / 2;
                vType = 'middle-middle';
            } else if (Math.abs(_unFocusedItem?.left + _unFocusedItem?.attribute.style.width - curMoveItem?.left - curMoveItem?.attribute.style.width) < 5) {
                x = _unFocusedItem?.left + _unFocusedItem?.attribute.style.width;
                vType = 'right-right';
            } else if (Math.abs(_unFocusedItem?.left + _unFocusedItem?.attribute.style.width - curMoveItem?.left) < 5) {
                x = _unFocusedItem?.left + _unFocusedItem?.attribute.style.width;
                vType = 'left-right';
            } else {
                x = 0;
                vType = '';
            }
        }
        callback(x, y, hType, vType);
    }

    return {
        handleLineFn
    }
}