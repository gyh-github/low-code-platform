import { computed, defineComponent } from "vue";
import './index.less';
import Background from "./components/Background";
import Tab from "./components/Tab";
import _ from 'lodash';
export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        console.log(props.modelValue, emit);
        const keyLabel = {
            width: '宽度',
            height: '高度',
            background: '背景色'
        };
        const attrBg = computed({
            get: () => {
                return props.modelValue['container']
            },
            set: (val) => {
                console.log(val)

                emit('update:modelValue', val)
            }
        })
        const attrData = computed({
            get: () => {
                return props.modelValue['plates'].filter(item => item.focused)
            },
            set: (val) => {
                console.log(val)
                // emit('update:modelValue', val)
            }
        })
        console.log(attrData.value)

        return () => (<div className="attribute">
            {JSON.stringify(attrData.value)}
            {attrData.value.length != 1 ? <Background v-model={attrBg.value} />
                : <>
                    <Tab />
                    {attrData.value.map(item => {
                        return <div className="attribute-item">
                            <div className="attribute-item-title">元素id:{item.id}</div>
                            {Object.keys(item.attribute).map((attr) => (
                                <div>
                                    <span>{keyLabel[attr]}:</span>
                                    <input type="text" v-model={item.attribute.attr} />
                                </div>
                            ))}
                        </div>
                    })}
                </>
            }

        </div>)
    }
})