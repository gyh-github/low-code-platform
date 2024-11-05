import { defineComponent, inject } from "vue";
import './index.less';
import Background from "./components/Background";
import Tab from "./components/Tab";
export default defineComponent({
    setup() {
        const state = inject(['state']);
        const keyLabel = {
            width: '宽度',
            height: '高度',
            background: '背景色'
        };

        return () => (<div className="attribute">
            {state['plates'].filter(item => item.focused).length != 1 ? <Background />
                : <>
                    <Tab />
                    {state['plates'].filter(item => item.focused).map(item => {
                        return <div className="attribute-item">
                            <div className="attribute-item-title">元素id:{item.id}</div>
                            {Object.keys(item.attribute.style).map((attr) => (
                                <div>
                                    <span>{keyLabel[attr]}:</span>
                                    <input type="text" v-model={item.attribute.style[attr]} />
                                </div>
                            ))}
                        </div>
                    })}
                </>
            }

        </div>)
    }
})