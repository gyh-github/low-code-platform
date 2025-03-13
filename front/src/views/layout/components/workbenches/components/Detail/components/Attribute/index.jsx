import { defineComponent, computed } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
export default defineComponent({

    setup() {
        const store = useStore();
        const { containerModules } = storeToRefs(store);
        const detail = computed(() => containerModules.value?.find(item => item.selected));
        return () => (<div className="attribute">
            <div className="row">
                <label htmlFor="content">文案</label>
                <textarea name="content" id="content" cols="30" rows="10" value={detail['value']?.['text']}></textarea>
            </div>
            <div className="row">
                <label htmlFor="fontSize">文字大小</label>{JSON.stringify(detail.value)}
            </div>
        </div>)
    }
})