import { defineComponent } from "vue";
import './index.less';
export default defineComponent({
    emits: ['handleClick'],
    setup(_, { emit }) {
        const animations = [
            {
                label: '淡入淡出',
                value: 'fade',
                children: [
                    { label: '淡入', value: 'fadeIn' },
                    { label: '向下淡入', value: 'fadeInDown' },
                    { label: '向下快速淡入', value: 'fadeInDownBig' },
                    { label: '向右淡入', value: 'fadeInLeft' },
                ]
            }
        ];
        return () => (<div className="animation">
            {animations.map(item => (<div className="animation-row">
                <div className="animation-title">{item.label}</div>
                <div className="animation-content">
                    {item.children.map(ele => (<van-button
                        className={'animation-item animate__animated animate__' + ele.value}
                        onClick={() => (emit('handleClick', ele.value))}
                    >{ele.label}</van-button>))}
                </div>
            </div>))}
        </div>)
    }
})