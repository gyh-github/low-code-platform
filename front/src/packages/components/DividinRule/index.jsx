import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';
import _ from 'lodash';
import './index.less'
export default defineComponent({
    setup() {
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
        const styleRule = reactive({
            top: 100,
            left: 100
        });
        let dfference = {
            x: 0,
            y: 0
        };
        const mousedownFn = (e) => {
            console.log(e, '---mousedown');
            dfference.x = e.offsetX - styleRule.left;
            dfference.y = e.offsetY - styleRule.top;
            window.addEventListener('mousemove', mousemoveFn);
        };
        const mousemoveFn = (e) => {
            styleRule.top = e.offsetY - dfference.y;
            styleRule.left = e.offsetX - dfference.x;

        };
        const mouseupFn = (e) => {
            styleRule.top = e.offsetY - dfference.y;
            styleRule.left = e.offsetX - dfference.x;
            window.removeEventListener('mousemove', mousemoveFn);
        };
        onMounted(() => {
            window.addEventListener('mousedown', mousedownFn);
            window.addEventListener('mouseup', mouseupFn);
        })
        onUnmounted(() => {
            window.removeEventListener('mousedown', mousedownFn);
            window.removeEventListener('mouseup', mouseupFn);
        })
        return () => <div className='dividing-rule' style={{ top: styleRule.top + 'px', left: styleRule.left + 'px' }}>
            <div className="dividing-rule-cover"></div>
            <div className="dividing-rule-scale">
                {
                    scales.map((item) => (<div className='dividing-rule-scale-item'>
                        <i style={{ height: item.size + 'px' }}></i>
                        <span style={{ top: item.size + 'px' }}>{item.label}</span>
                    </div>))
                }</div>
        </div>

    }
}) 