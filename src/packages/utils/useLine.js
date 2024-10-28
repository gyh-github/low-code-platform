export default (plateData, callback) => {
    let x = 0;
    let y = 0;
    let hType = '';
    let vType = '';

    const handleLineFn = () => {
        const curMoveItem = plateData.focused[plateData.focused.length - 1];
        y = 0;
        x = 0;
        hType = '';
        vType = '';
        for (let i = 0; i < plateData.unFocused.length; i++) {
            if (Math.abs(plateData.unFocused[i]?.top - curMoveItem?.top - curMoveItem?.attribute.height) < 5) {
                y = plateData.unFocused[i].top;
                hType = 'bottom-top';
            } else if (Math.abs(plateData.unFocused[i]?.top - curMoveItem?.top) < 5) {
                y = plateData.unFocused[i]?.top;
                hType = 'top-top';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height / 2 - curMoveItem?.top - curMoveItem?.attribute.height / 2) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height / 2;
                hType = 'middle-middle';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height - curMoveItem?.top - curMoveItem?.attribute.height) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height;
                hType = 'bottom-bottom';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height - curMoveItem?.top) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.attribute.height;
                hType = 'top-bottom';
            } else {
                y = 0;
                hType = '';
            }
            if (Math.abs(plateData.unFocused[i]?.left - curMoveItem?.left - curMoveItem?.attribute.width) < 5) {
                x = plateData.unFocused[i]?.left;
                vType = 'right-left';
            } else if (Math.abs(plateData.unFocused[i]?.left - curMoveItem?.left) < 5) {
                x = plateData.unFocused[i]?.left;
                vType = 'left-left';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width / 2 - curMoveItem?.left - curMoveItem?.attribute.width / 2) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width / 2;
                vType = 'middle-middle';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width - curMoveItem?.left - curMoveItem?.attribute.width) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width;
                vType = 'right-right';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width - curMoveItem?.left) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.attribute.width;
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