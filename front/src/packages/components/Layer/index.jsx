import { defineComponent, inject, ref } from 'vue';
import './index.less';
export default defineComponent({
    props: ['modelValue'],
    setup(props) {
        const componentMap = inject(['componentMap']);
        const active = ref('');
        return () => (<div className='layer'>
            <h3>图层</h3>
            {props.modelValue.value?.map(item => (<div className={active.value === item.id ? 'layer-item active' : 'layer-item'} onClick={() => (active.value = item.id)}>
                <span>{componentMap[item.key].label}</span>
                {componentMap[item.key].preview()}
            </div>))}
        </div>)
    }
})