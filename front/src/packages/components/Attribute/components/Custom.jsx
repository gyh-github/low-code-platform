import { computed, defineComponent, inject } from "vue";
import './../index.less';

const fontSizeList = [12, 14, 16, 20, 22, 24, 32];

export default defineComponent({
    setup() {
        const state = inject('state');
        const plate = computed(() => state.plates.find(item => item.focused));
        return () => (<div className="custom">
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
                            <input type="color" v-model={plate.value.attribute.style['color']} style="width:60px !important" /></van-col>
                    </van-row></van-col>
            </van-row>
            <van-row align="center" justify="space-between">
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
            </van-row>
            <van-row>
                <van-col>
                    <span className="label">背景色</span>
                    <input type="color" v-model={plate.value.attribute.style['background']} />
                </van-col>
            </van-row>
        </div>)
    }
})