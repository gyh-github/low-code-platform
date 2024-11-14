import { defineComponent, inject, computed, ref } from "vue";
import AttriTab from "@/packages/components/AttriTab";
import Custom from './custom.jsx';

export default defineComponent({
    setup() {
        const active = ref('custom');
        return () => (<>
            <AttriTab v-model={active.value} />
            {active.value === 'custom' && <Custom />}
        </>)
    }
})