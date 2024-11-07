import { computed, defineComponent, inject } from "vue";
import './index.less';
import Background from "./components/Background";
import Tab from "./components/Tab";
export default defineComponent({
    setup() {
        const state = inject(['state']);
        const keyLabel = {
            width: '宽度',
            height: '高度',
            background: '背景色'
        };
        const hideBg = computed(() => (state.plates.find(item => item.focused)))
        return () => (<div className="attribute">
            {!hideBg.value && <Background />}
            {hideBg.value && <Tab />}

        </div>)
    }
})