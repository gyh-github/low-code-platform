export default function (plates, workspace) {
    let _cur = null;

    const dragstartFn = (_, plate) => {
        _cur = plate;
        workspace.value.addEventListener('dragover', dragoverFn);
        workspace.value.addEventListener('drop', dropFn);
    }
    const dragendFn = () => {
        workspace.value.removeEventListener('dragover', dragoverFn);
        workspace.value.removeEventListener('drop', dropFn);
    }

    const dragoverFn = (e) => {
        e.preventDefault();
    }
    const dropFn = (e) => {
        e.stopPropagation();
        if (!_cur) return;
        plates.value = [...plates.value, {
            top: e.layerY,
            left: e.layerX,
            height: Number.parseFloat(_cur.style.height.replace('px', '')),
            width: Number.parseFloat(_cur.style.width.replace('px', '')),
            zIndex: 2,
            alignCenter: true,
            key: _cur.key,
            id: new Date().getTime().toString(),
            focused: false,
        }];
    }


    return {
        dragstartFn,
        dragendFn
    }
}