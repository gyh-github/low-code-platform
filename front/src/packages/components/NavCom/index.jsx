import { defineComponent, ref } from 'vue';
import './index.less';
export default defineComponent({

    setup() {
        const navs = [
            {
                label: '基础',
                key: 'basics',
                iconName: 'coupon'
            },
            {
                label: '图表',
                key: 'charts',
                iconName: 'invitation'
            },
            {
                label: '图片',
                key: 'images',
                iconName: 'photo'
            }
        ];
        const active = ref('basics');
        return () => (<div className='nav'>
            {navs.map(item => (<div className={active.value === item.key ? 'nav-item active' : 'nav-item'} onClick={() => (active.value = item.key)}>
                <van-icon name={item.iconName} /><br />
                <span>{item.label}</span>
            </div>))}
        </div>)
    }
})