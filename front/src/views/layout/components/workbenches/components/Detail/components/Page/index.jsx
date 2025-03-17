import {  defineComponent, reactive, watch } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Form, InputNumber, Input, Upload, Image } from 'ant-design-vue';
import NoData from '@/assets/images/no-data.png';
import { uploadFile } from '@/apis/common';
export default defineComponent({
    setup() {
        const store = useStore();
        const { pageInfo } = storeToRefs(store);
        const page = reactive({
            width: pageInfo.value?.['width']?.replace('px', '') - 0,
            height: pageInfo.value?.['height']?.replace('px', '') - 0,
            backgroundColor: pageInfo.value?.['backgroundColor'] || '',
            backgroundImage: pageInfo.value?.['backgroundImage'] || '',
        });

        //自定义图片上传
        const customRequest = async (options) => {
            const { file, onError } = options;
            try {
                const formData = new FormData();
                formData.append('file', file);
                const data = await uploadFile(formData);
                data && (page['backgroundImage'] = data);
            } catch (error) {
                onError(error, file); // 上传失败
            }
        };


        watch(()=>page, (val) => {
            console.log(val, '-----')
            const _page = {
                width: val.width + 'px',
                height: val.height + 'px',
                backgroundColor: val.backgroundColor,
                backgroundImage: val.backgroundImage,
            };
            store.setPageInfo(_page);
        }, {deep:true})
        return () => (<div className="page">
            <Form>
                <Form.Item label="页面宽度">
                    <InputNumber v-model:value={page['width']} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item label="页面高度">
                    <InputNumber v-model:value={page['height']} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item label="背景颜色">
                    <Input type="color" v-model:value={page['backgroundColor']} style={{ inlineSize:'100% !important'}}/>
                </Form.Item>
                <Form.Item label="背景图片">
                     <Upload
                        name="file"
                        showUploadList={false}
                        customRequest={customRequest}
                    >
                        <Image preview={false} src={page['backgroundImage'] || NoData} />
                    </Upload>
                </Form.Item>
            </Form>
        </div>)
    }
})