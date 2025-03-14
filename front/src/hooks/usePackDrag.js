import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import { onBeforeUnmount, onMounted } from 'vue';

export function usePackDrag(data, element) {
    const { setContainerModules } = useStore();
    const eleData = cloneDeep(data);
    let initY = 0;
    let initX = 0;

    //开始拖拽
    const handleMousedown = (e) => {
        setContainerModules('select', eleData);
        e.preventDefault();
        initY = e.clientY - element.value.offsetTop;
        initX = e.clientX - element.value.offsetLeft;
        window.addEventListener('mousemove', handleMousemove);
        element.value.style.zIndex = 999;
    }
    //拖拽中
    const handleMousemove = (e) => {
        e.preventDefault();
        element.value.style.top = (e.clientY - initY) + 'px';
        element.value.style.left = (e.clientX - initX) + 'px';
        eleData['ui:top'] = (e.clientY -  initY) + 'px';
        eleData['ui:left'] = (e.clientX - initX) + 'px';
        setContainerModules('update', eleData);
    }
    //拖拽结束
    const handleMouseup = (e) => {
        e.preventDefault();
        element.value.style.zIndex = 'inherit';
        window.removeEventListener('mousemove', handleMousemove);
        
    }
    onMounted(() => { 
        window.addEventListener('mouseup', handleMouseup);
    })
    onBeforeUnmount(() => { 
        window.removeEventListener('mouseup', handleMouseup);
    })

    return {
        handleMousedown
    };
}