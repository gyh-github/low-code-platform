import { defineComponent } from "vue";
import Tab from "./Tab";

export default defineComponent({
    props: ['modelValue'],
    setup(props) {
        console.log(props.modelValue)
        return () => <div>
            <Tab flag="bg" />
            <span>宽度</span>
            <van-stepper v-model={props.modelValue.width} />
        </div>
    }
})