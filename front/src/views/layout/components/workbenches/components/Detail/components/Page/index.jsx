import {  defineComponent, reactive, watch } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Form, InputNumber, Input, Upload, Image } from 'ant-design-vue';
import NoData from '@/assets/images/no-data.png';
import { uploadFile } from '@/apis/common';
import { imgUrlToBase64 } from "@/utils";
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
                // new Promise((resolve, reject) => {
                //     const reader = new FileReader();
                //     reader.onloadend = () => resolve(reader.result); // 读取完成时返回 Base64
                //     reader.onerror = reject; // 读取失败时抛出错误
                //     reader.readAsDataURL(file); // 将 Blob 转换为 Base64
                // }).then(res => { 
                //     sessionStorage.setItem('pageBackgroundImage',res)
                // })
            } catch (error) {
                onError(error, file); // 上传失败
            }
        };


        watch(()=>page, (val) => {
            const _page = {
                width: val.width + 'px',
                height: val.height + 'px',
                backgroundColor: val.backgroundColor,
                backgroundImage: val.backgroundImage,
            };
            store.setPageInfo(_page);
            val.backgroundImage && imgUrlToBase64(val.backgroundImage);
        }, { deep: true, immediate:true})
        return () => (<div className="page">
            <Form>
                <Form.Item label="页面宽度">
                    <InputNumber v-model:value={page['width']} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item label="页面高度">
                    <InputNumber v-model:value={page['height']} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item label="背景颜色">
                    <color-picker v-model:hex={page['backgroundColor']}></color-picker>
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