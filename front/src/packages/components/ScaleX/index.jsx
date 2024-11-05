import { defineComponent, ref } from 'vue';
import './index.less'
export default defineComponent({
    props: ['top'],
    setup(props) {
        let scales = [];
        for (
            let i = 0; i < 2000; i++
        ) {
            if (i % 100 === 0) {
                scales.push({
                    size: 15,
                    label: i
                })
            } else if (i % 100 != 0 && i % 50 === 0) {
                scales.push({
                    size: 10,
                    label: i
                })
            } else if (i % 100 != 0 && i % 50 != 0 && i % 5 === 0) {
                scales.push({
                    size: 5,
                    label: ''
                })
            } else {
                scales.push({
                    size: 0,
                    label: ''
                })
            }
        }
        const data = ref(scales);
        return () => <div className='scale' style={{ top: props.top.value + 'px' }}>
            {
                data.value.map((item) => (<div className='scale-item'>
                    <i style={{ height: item.size + 'px' }}></i>
                    <span style={{ top: item.size + 'px' }}>{item.label}</span>
                </div>))
            }
        </div>

    }
}) 