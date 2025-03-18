import { defineComponent, computed, watch,ref } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Form, Input, Select, Textarea, Slider } from 'ant-design-vue';
import NoData from "@/components/NoData";

export default defineComponent({

    setup() {
        const store = useStore();
        const { containerModules } = storeToRefs(store);
        const detail = computed(() => containerModules.value?.find(item => item.selected));
        const sliderVal = ref(10);

        const fontSizeOptions = [
            { label: '12px', value: '12px' },
            { label: '14px',value:'14px'},
            {label: '16px',value:'16px'},
            {label: '18px',value:'18px'},
            {label: '20px',value:'20px'},
            { label: '24px', value: '24px' },
            { label: '32px', value: '32px' },
        ];

        //行高改变时回调
        const sliderChange = (val) => {
            detail['value']['ui:lineHeight'] = val + 'px';
         }

        watch(() => detail, () => { 
            store.setContainerModules('update', detail['value']);
            sliderVal.value = detail.value?.['ui:lineHeight']?.replace('px', '') || 10;
        }, { deep: true })
        
        return () => (<div className="attribute">
            {detail['value'] && <Form>
                <Form.Item label="文案内容">
                    <Textarea rows={4}  v-model:value={detail['value']['text']} />
                </Form.Item>
                <Form.Item label="文字大小">
                    <Select v-model:value={detail['value']['ui:fontSize']}
                        options={fontSizeOptions} />
                </Form.Item>
                <Form.Item label="文字颜色">
                    <color-picker v-model:hex={detail['value']['ui:color']}></color-picker>
                </Form.Item>
                <Form.Item label="文字行高">
                    <Slider min={10} max={ 150 } v-model:value={sliderVal.value} onChange={sliderChange} />
                </Form.Item>
            </Form>}
            {!detail['value'] &&<NoData/>}
        </div>)
    }
})