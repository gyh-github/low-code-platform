import { defineComponent, ref } from "vue";
import './../index.less';
import Custom from "./Custom";

export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup() {
        const arr = [
            {
                label: '定制',
                key: 'custom'
            },
            {
                label: '动画',
                key: 'animation'
            },
            {
                label: '数据',
                key: 'data'
            },
            {
                label: '事件',
                key: 'event'
            }
        ];
        const active = ref('custom');
        return () => (<>
            <div className="tab">
                {arr.map(item => (
                    <van-button className={active.value === item.key && "active"}
                        onClick={() => active.value = item.key}>{item.label}</van-button>))}
            </div>
            {active.value === 'custom' && <Custom />}
        </>)
    }
})