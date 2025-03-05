import { defineComponent, ref } from "vue";
import AttriTab from "@/packages/components/AttriTab";
import Custom from './custom.jsx';
import Animation from './animation.jsx';

export default defineComponent({
    setup() {
        const active = ref('custom');
        return () => (<>
            <AttriTab v-model={active.value} />
            {active.value === 'custom' && <Custom />}
            {active.value === 'animation' && <Animation />}
        </>)
    }
})