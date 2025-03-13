import { defineComponent, computed, ref } from "vue";
import { usePackDrag } from '@/hooks/usePackDrag';
import './index.less';
import { useStore } from '@/store';

export default defineComponent({
    props: ['data'],
    setup({ data }) {
        const eleRef = ref(null);
        const { handleMousedown } = usePackDrag(data, eleRef);
        const { setContainerModules } = useStore();
        let renderData = computed(() => {
            const _renderData = {};
            const _style = {};
            Object.entries(data).forEach(ele => {
                if (ele[0].indexOf('ui:') != -1) {
                    _style[ele[0].replace('ui:', '')] = ele[1];
                } else {
                    _renderData[ele[0]] = ele[1];
                }
            })
            delete _renderData.render;
            delete _renderData.preview;
            _renderData['style'] = { ...style };
            return _renderData;
        });
        const style = computed(() => {
            const _style = {};
            Object.entries(data).forEach(ele => {
                if (ele[0].indexOf('ui:') != -1) {
                    _style[ele[0].replace('ui:', '')] = ele[1];
                }
            })
            return _style;
        });
        const handleClick = () => {
            setContainerModules('select', data);
        }
        return () => (<div className={data.selected ? 'pack selected' : 'pack'}
            ref={eleRef}
            style={{ ...style.value, position: 'absolute' }}
            onMousedown={handleMousedown}
            onClick={handleClick}
        >
            {data.render(renderData.value)}
        </div>)
    }
})