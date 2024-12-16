import { defineComponent } from "vue";
import MobileTable from '@/packages/materials/mobileTable/index.vue';

export default defineComponent({
    setup() {
        const newProject = () => {
            location.href = '#/container';
        };

        return () => (<>
            <van-button onClick={newProject}>新建项目</van-button>
            <MobileTable />
        </>)
    }
})