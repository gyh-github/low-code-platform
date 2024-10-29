import { defineComponent, ref } from 'vue';
import './index.less';
export default defineComponent({

    setup() {
        const layers = [

        ];
        const active = ref('');
        return () => (<div className='layer'>
            <h3>图层</h3>
            {layers?.map(item => (<div className={active.value === item.key ? 'layer-item active' : 'layer-item'} onClick={() => (active.value = item.key)}>
                <span>{item.label}</span>
            </div>))}
        </div>)
    }
})