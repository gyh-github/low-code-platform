export default function (dragRef, data) {
    const dragstart = (e) => {
        dragRef.value.addEventListener('dragover', dragover);
        dragRef.value.addEventListener('drop', drop);
    }
    const dragover = (e) => {
        e.preventDefault();
    }
    const dragend = (e) => {
        dragRef.value.removeEventListener('dragove', dragover);
        dragRef.value.removeEventListener('drop', drop);
    }
    const drop = (e) => { }
}