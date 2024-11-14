import { defineComponent, ref } from "vue";
import './index.less';

export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
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
        const changeActiveFn = (key) => {
            console.log(key)
            emit('update:modelValue', key)
        }
        return () => (<>
            <div className="tab">
                {arr.map(item => (
                    <van-button className={props.modelValue === item.key && "active"}
                        onClick={() => changeActiveFn(item.key)}>{item.label}</van-button>))}
            </div>
        </>)
    }
})