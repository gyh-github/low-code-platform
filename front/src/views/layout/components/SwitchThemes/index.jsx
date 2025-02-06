import { defineComponent, onMounted, ref } from "vue";
import './index.less';


export default defineComponent({
    setup() {
        const colorVal = ref('#1e0b1e');
        const handleColorFn = (color, n = 0) => {
            const obj = {
                10: 'a',
                11: 'b',
                12: 'c',
                13: 'd',
                14: 'e',
                15: 'f',
            };
            return color.split('').reduce((pre, cur, index) => {
                const _cur = Math.abs(15 - n - parseInt(cur, 16));
                return index === 0 ? '#' : pre + (_cur <= 9 ? _cur : obj[_cur])
            })
        };
        const changeFn = (e) => {
            colorVal.value = e.target.value;
            console.log(colorVal.value)
            document.documentElement.style.setProperty('--lcp-bg-color', colorVal.value)
            document.documentElement.style.setProperty('--lcp-n-bg-color', handleColorFn(colorVal.value, 2))
            document.documentElement.style.setProperty('--lcp-n-color', handleColorFn(colorVal.value,10))
        }
        onMounted(() => {
            document.documentElement.style.setProperty('--lcp-bg-color', colorVal.value)
            document.documentElement.style.setProperty('--lcp-n-bg-color', handleColorFn(colorVal.value, 2))
            document.documentElement.style.setProperty('--lcp-n-color', handleColorFn(colorVal.value,10))
        })

        return () => (
            <div className="theme">
                <input type="color" id="inp"onInput={(e) => changeFn(e)} value={colorVal.value} />
                <label htmlFor="inp">
                    
                </label>
            </div>)
    }
})