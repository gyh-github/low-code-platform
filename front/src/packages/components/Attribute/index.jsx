import { computed, defineAsyncComponent, defineComponent, inject } from "vue";
import './index.less';
import Background from "./components/Background";
import LoadingComponent from "../LoadingComponent";
export default defineComponent({
    setup() {
        const state = inject(['state']);
        const plate = computed(() => (state.plates.find(item => item.focused)));
        const AttributeCom = defineAsyncComponent({
            loader: () => import(`./../../materials/${plate.value.key}/components/attribute.jsx`),
            loadingComponent: LoadingComponent
        })
        return () => (<div className="attribute">
            {!plate.value && <Background />}
            {plate.value && <AttributeCom />}

        </div>)
    }
})