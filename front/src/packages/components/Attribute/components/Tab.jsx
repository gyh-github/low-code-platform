import { defineComponent, ref } from "vue";
import './../index.less';

export default defineComponent({
    props: ['flag'],
    setup(props) {
        const arr = [
            {
                label: '定制',
                key: 'customized'
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
        const active = ref('customized');
        return () => (<div className="tab">
            {props.flag === 'bg' && <van-button className="active">背景设置</van-button>}
            {props.flag != 'bg' && arr.map(item => (<van-button className={active.value === item.key && "active"} onClick={() => active.value = item.key}>{item.label}</van-button>))}
        </div>)
    }
})