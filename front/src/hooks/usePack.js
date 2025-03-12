import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import { onBeforeUnmount, onMounted } from 'vue';

export function usePack(data,element) {
    const { setContainerModules } = useStore();
    const eleData = cloneDeep(data);

    //开始拖拽
    const handleMousedown = (e) => {
        e.preventDefault();
        console.log(e, '开始拖拽')
        window.addEventListener('mousemove', handleMousemove);

        element.value.style.top = e.offsetY + 'px';
        element.value.style.left = e.offsetX + 'px';
    }
    //拖拽中
    const handleMousemove = (e) => {
        console.log(e, '拖拽中')
        element.value.style.top = e.offsetY + 'px';
        element.value.style.left = e.offsetX + 'px';
        setContainerModules('update',eleData);
        
    }
    //拖拽结束
    const handleMouseup = (e) => {
        console.log(e, '拖拽结束')
        eleData['ui:top'] = e.offsetY + 'px';
        eleData['ui:left'] = e.offsetX + 'px';
        setContainerModules('update',eleData);
        window.removeEventListener('mousemove', handleMousemove);
        
    }
    onMounted(() => { 
        element.value.addEventListener('mousedown', handleMousedown);
        window.addEventListener('mouseup', handleMouseup);
    })
    onBeforeUnmount(() => { 
        window.removeEventListener('mouseup', handleMouseup);
    })

    return {
        handleMousedown
    };
}