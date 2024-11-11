import { defineComponent, inject, ref } from "vue";

export default defineComponent({
    props: ['modelValue'],
    setup() {
        const fileList = ref([]);
        const model = ref('400*916');
        const state = inject(['state']);
        const modelList = [
            { label: '自定义', value: '400*916' },
            { label: 'iPhone SE', value: '375*667' },
            { label: 'iPhone XR', value: '414*896' },
            { label: 'iPhone 12 Pro', value: '390*844' },
            { label: 'Pixel 7', value: '412*915' },
            { label: 'Pixel 3', value: '393*786' },
            { label: 'Pixel 4', value: '353*745' },
        ];
        const selectChangeFn = (e) => {
            const _val = e.target.value;
            model.value = _val;
            const _arr = _val.split('*');
            if (_arr) {
                state.container.width = _arr[0];
                state.container.height = _arr[1];
            }
        };
        const afterReadFn = (file) => {
            state.container.background = `url(${file.content})`;
        };
        const beforeDeleteFn = () => {
            state.container.background = "#302e2edb";
            return true;
        };
        return () => <div className="background">
            <van-row>
                <van-col>
                    <span className="label">界面尺寸</span>
                    <select name="model" className="select" onChange={selectChangeFn}>
                        {
                            modelList.map((item) => <option value={item.value}>{item.label}</option>)
                        }
                    </select>
                </van-col>
            </van-row>
            <van-row justify="space-between" gutter="10">
                <van-col >
                    <span className="label">宽度</span>
                    <van-stepper disabled={model.value != "400*916"} v-model={state.container.width} input-width="50px" button-size="25px" />
                </van-col>
                <van-col>
                    <span className="label">高度</span>
                    <van-stepper disabled={model.value != "400*916"} v-model={state.container.height} input-width="50px" button-size="25px" />
                </van-col>
            </van-row>
            <div className="background-bg-img">
                <van-uploader v-model={fileList.value}
                    reupload max-count="1"
                    after-read={afterReadFn}
                    before-delete={beforeDeleteFn}
                    preview-size={['150px', '150px']}
                >
                    <van-empty description="界面背景图" image-size="69" />
                </van-uploader>
            </div>
            <van-row>
                <van-col>
                    <span className="label">背景色</span>
                    <input type="color" v-model={state.container.background} />
                </van-col>
            </van-row>
        </div>
    }
})