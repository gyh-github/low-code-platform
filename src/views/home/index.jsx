import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const newProject = () => {
            location.href = '#/container';
        };

        return () => (<>
            <van-button onClick={newProject}>新建项目</van-button>
            home</>)
    }
})