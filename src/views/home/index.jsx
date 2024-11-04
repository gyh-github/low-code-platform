import { defineComponent } from "vue";
import { generateCode } from "../../packages/utils/apis";

export default defineComponent({
    setup() {
        const newProject = () => {
            location.href = '#/container';
        };

        const testFn = async () => {
            const res = await generateCode({ a: 123 });
            console.log(res)
        }

        return () => (<>
            <van-button onClick={() => testFn()}>测试</van-button>
            <van-button onClick={newProject}>新建项目</van-button>
            home</>)
    }
})