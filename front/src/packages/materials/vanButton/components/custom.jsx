import { defineComponent, inject, computed, ref } from "vue";
import '@/packages/components/Attribute/index.less';

const fontSizeList = [12, 14, 16, 20, 22, 24, 32];

export default defineComponent({
    setup() {
        const state = inject('state');
        const plate = computed(() => state.plates.find(item => item.focused));
        console.log(plate.value.attribute.style.backgroundImage);
        const fileList = ref([]);
        const afterReadFn = (file, plate) => {
            plate.value.attribute.style.backgroundImage = `url(${file.content})`;
            plate.value.attribute.style.backgroundSize = 'cover';
        };

        return () => (<>
            <van-row align="center" justify="space-between">
                <van-col span={4}>
                    <span className="label">文案</span>
                </van-col>
                <van-col span={20}>
                    <van-field v-model={plate.value.attribute['innerText']} /></van-col>
            </van-row>
            <van-row align="center" justify="space-between">
                <van-col span={12}>
                    <van-row align="center" justify="space-between">
                        <van-col>
                            <span className="label">字体大小</span></van-col>
                        <van-col>
                            <select name="fontSize" id="fontSize" v-model={plate.value.attribute.style['font-size']}
                                className="font-size-select">
                                {fontSizeList.map(item => <option value={item} >{item}px</option>)}

                            </select></van-col>
                    </van-row></van-col>
                <van-col span={12}>
                    <van-row align="center" justify="space-between">
                        <van-col>
                            <span className="label">&nbsp;&nbsp;&nbsp;字体颜色</span></van-col>
                        <van-col>
                            <input type="color" value="#ffffff" v-model={plate.value.attribute.style['color']} style="width:60px !important" /></van-col>
                    </van-row></van-col>
            </van-row><van-row align="center" justify="space-between">
                <van-col span={4}>
                    <span className="label">尺寸</span>
                </van-col>
                <van-col span={20} >
                    <div className="small-row">
                        <span className="label">宽</span><van-stepper v-model={plate.value.attribute.style['width']}
                            input-width="40px" button-size="25px" />
                        <span className="label">高</span><van-stepper v-model={plate.value.attribute.style['height']}
                            input-width="40px" button-size="25px" />
                    </div>
                </van-col>
            </van-row><van-row>
                <van-col>
                    <span className="label">背景色</span>
                    <input type="color" value="#ffffff" v-model={plate.value.attribute.style['background']} />
                </van-col>
            </van-row>
            <div className="background-bg-img">
                <van-uploader
                    v-model={fileList.value}
                    reupload
                    max-count="1"
                    after-read={(file) => afterReadFn(file, plate)}
                    deletable={false}
                    preview-size={['150px', '150px']}
                >
                    <van-empty description="界面背景图" image-size="69" />
                    {plate.value.attribute.style?.backgroundImage &&
                        <van-image className="default-img"
                            src={plate.value.attribute.style?.backgroundImage?.replace('url(', '')?.replace(')', '')}></van-image>}
                </van-uploader>
            </div>
        </>)
    }
})