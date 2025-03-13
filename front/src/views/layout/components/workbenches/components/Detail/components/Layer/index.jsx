import { defineComponent } from "vue";
import './index.less';
export default defineComponent({
    setup() {
        return () => (<div className="layer">layer</div>)
    }
})