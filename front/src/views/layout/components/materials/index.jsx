import { defineComponent, ref } from "vue";
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

        const materials = ref([
            {
                label: '图片1',
                key: 'images1',
                iconName: 'photo'
            },
            {
                label: '图片2',
                key: 'images2',
                iconName: 'photo'
            },
            {
                label: '图片3',
                key: 'images3',
                iconName: 'photo'
            }
])

        return () => (<div className="materials">
            <div className="materials-search">
                
            </div>
            
            <van-row>
                <van-col span={4}>
                    <div className="materials-left">
                        {navs.map(item => (
                        <div className="materials-item">
                            <span>{ item.label}</span>
                        </div>
                    ))}
                    </div>
                </van-col>
                <van-col span={20}>
                    <div className="materials-right">
                        
                    {materials.value.map(item => (
                        <div className="materials-item">
                            <span>{ item.label}</span>
                        </div>
                    ))}
                    </div>
                </van-col>
            </van-row>
        </div>)
    }
})