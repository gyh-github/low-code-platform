import { defineComponent, inject, computed, ref } from "vue";
import '@/packages/components/Attribute/index.less';
import UploadImage from "@/packages/components/UploadImage";

export default defineComponent({
    setup() {
        const state = inject('state');
        const plate = computed(() => state.plates.find(item => item.focused));
        const uploadCallbackFn = (file) => {
            plate.value.attribute.swipes = plate.value.attribute?.swipes.map(
                (item, ind) => ind === file.index ? file.url : item);
        };

        return () => (<>
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
            {plate.value.attribute.swipes && plate.value.attribute?.swipes?.map((item, index) => (
                <van-row>
                    <van-col span={5}>
                        <span className="label">图片-{index + 1}</span>
                    </van-col>
                    <van-col span={19}><div className="">
                        <div className="background-bg-img">
                            <UploadImage file={{ url: item, index }} onCallback={(value) => uploadCallbackFn(value)} />
                        </div>
                    </div>
                    </van-col>
                </van-row>
            ))}
        </>)
    }
})