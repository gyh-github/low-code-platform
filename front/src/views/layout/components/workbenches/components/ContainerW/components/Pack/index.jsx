import { defineComponent, computed, ref } from "vue";
import { usePackDrag } from '@/hooks/usePackDrag';
import './index.less';

export default defineComponent({
    props: ['data'],
    setup(props) {
        const eleRef = ref(null);
        const element = computed(() => props.data);
        const style = computed(() => {
            const _style = {};
            Object.entries(props.data).forEach(ele => {
                if (ele[0].indexOf('ui:') != -1) {
                    _style[ele[0].replace('ui:', '')] = ele[1];
                }
            })
            return _style;
        });
        const { handleMousedown } = usePackDrag(element.value, eleRef);

        return () => (<div className={element.value.selected ? 'pack selected' : 'pack'}
            ref={eleRef}
            style={{ ...style.value }}
            onMousedown={handleMousedown}
        >
            {element.value['render']({ ...element.value, style: style.value })}
        </div>)
    }
})