import { defineComponent } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
export default defineComponent({
    setup() {
        const store = useStore();
        const { containerModules } = storeToRefs(store);
        return () => (<div className="layer">
            {
                containerModules.map((elem) => (<div>

                </div>))
            }
        </div>)
    }
})