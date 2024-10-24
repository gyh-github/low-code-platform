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
            if (Math.abs(plateData.unFocused[i]?.top - curMoveItem?.top - curMoveItem?.height) < 5) {
                y = plateData.unFocused[i].top;
                hType = 'bottom-top';
            } else if (Math.abs(plateData.unFocused[i]?.top - curMoveItem?.top) < 5) {
                y = plateData.unFocused[i]?.top;
                hType = 'top-top';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.height / 2 - curMoveItem?.top - curMoveItem?.height / 2) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.height / 2;
                hType = 'middle-middle';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.height - curMoveItem?.top - curMoveItem?.height) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.height;
                hType = 'bottom-bottom';
            } else if (Math.abs(plateData.unFocused[i]?.top + plateData.unFocused[i]?.height - curMoveItem?.top) < 5) {
                y = plateData.unFocused[i]?.top + plateData.unFocused[i]?.height;
                hType = 'top-bottom';
            } else {
                y = 0;
                hType = '';
            }
            if (Math.abs(plateData.unFocused[i]?.left - curMoveItem?.left - curMoveItem?.width) < 5) {
                x = plateData.unFocused[i]?.left;
                vType = 'right-left';
            } else if (Math.abs(plateData.unFocused[i]?.left - curMoveItem?.left) < 5) {
                x = plateData.unFocused[i]?.left;
                vType = 'left-left';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.width / 2 - curMoveItem?.left - curMoveItem?.width / 2) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.width / 2;
                vType = 'middle-middle';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.width - curMoveItem?.left - curMoveItem?.width) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.width;
                vType = 'right-right';
            } else if (Math.abs(plateData.unFocused[i]?.left + plateData.unFocused[i]?.width - curMoveItem?.left) < 5) {
                x = plateData.unFocused[i]?.left + plateData.unFocused[i]?.width;
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