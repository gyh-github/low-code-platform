import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
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
        const ruleRef = ref(null);
        let dfference = {
            x: 0,
            y: 0
        };
        const rotateFn = () => {
            ruleRef.value.style.transform = ruleRef.value.style.transform === `rotate(90deg)` ? `rotate(0deg)` : `rotate(90deg)`;
        };
        const mousedownFn = (e) => {
            if (e.target.className != 'dividing-rule-cover') return;
            dfference.x = e.pageX - parseInt(ruleRef.value.style.left.replace('px', ''));
            dfference.y = e.pageY - parseInt(ruleRef.value.style.top.replace('px', ''));
            ruleRef.value.style.top = (e.pageY - dfference.y) + 'px';
            ruleRef.value.style.left = (e.pageX - dfference.x) + 'px';
            window.addEventListener('mousemove', mousemoveFn);
        };
        const mousemoveFn = (e) => {
            ruleRef.value.style.top = (e.pageY - dfference.y) + 'px';
            ruleRef.value.style.left = (e.pageX - dfference.x) + 'px';
        };
        const mouseupFn = (e) => {
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
        return () => <div className='dividing-rule' ref={ruleRef} style={{ top: '200px', left: '200px' }}>
            <div className="dividing-rule-cover"><span onClick={() => rotateFn()}>⇵</span></div>
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