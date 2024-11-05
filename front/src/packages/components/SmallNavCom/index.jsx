import { defineComponent, ref } from 'vue';
import './index.less';
export default defineComponent({

    setup() {
        const navs = [
            {
                label: '所有',
                key: 'all',
            }
        ];
        const active = ref('all');
        return () => (<div className='smallNav'>
            {navs.map(item => (<div className={active.value === item.key ? 'nav-item active' : 'nav-item'} onClick={() => (active.value = item.key)}>
                <span>{item.label}</span>
            </div>))}
        </div>)
    }
})