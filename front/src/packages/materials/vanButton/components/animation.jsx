import { defineComponent, inject, computed } from "vue";
import Animate from "@/packages/components/Animate";

export default defineComponent({
    setup() {
        const state = inject('state');
        const plate = computed(() => state.plates.find(item => item.focused));
        const handleClickFn = (val) => {
            plate.value.attribute.class = 'animate__animated animate__' + val;
        }
        return () => (<>
            <Animate onHandleClick={handleClickFn} />
        </>)
    }
})