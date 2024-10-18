import { onMounted, reactive } from "vue"

export default (elem) => {
    const state = reactive({
        top: null,
        left: null,
        border: null
    })
    const mousemoveFn = (e) => {
        state.left = e.layerX;
        state.top = e.layerY;
    }
    const mousedownFn = (e) => {
        state.border = "3px dashed #e00";
        e.addEventListener('mousemove', mousemoveFn)
    }
    onMounted(() => {
        elem.addEventListener('mousedown', mousedownFn)
    })

}