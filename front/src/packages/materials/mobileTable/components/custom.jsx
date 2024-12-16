import { defineComponent, inject, computed } from "vue";
import '@/packages/components/Attribute/index.less';

export default defineComponent({
    setup() {
        const state = inject('state');
        const plate = computed(() => state.plates.find(item => item.focused));

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
            {plate.value.attribute.tableColumn.map((_, index) => (
                <van-row>
                    <van-col span={5}>
                        <span className="label">列--{index + 1}</span>
                    </van-col>
                    <van-col span={19}>
                        <van-row>
                            <van-col span={6}>
                                <span className="label">列名</span></van-col>
                            <van-col span={18}><van-field v-model={plate.value.attribute.tableColumn[index]['label']} /></van-col>
                        </van-row>
                        <van-row>
                            <van-col span={6}>
                                <span className="label">列key</span></van-col>
                            <van-col span={18}><van-field v-model={plate.value.attribute.tableColumn[index]['prop']} /></van-col>
                        </van-row>
                        <van-row>
                            <van-col span={6}>
                                <span className="label">列宽度</span></van-col>
                            <van-col span={18}><van-stepper v-model={plate.value.attribute.tableColumn[index]['width']}
                                input-width="40px" button-size="25px" />
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            ))}
        </>)
    }
})