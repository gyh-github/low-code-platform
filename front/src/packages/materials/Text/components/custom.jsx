import { defineComponent, inject, computed, ref, watch, watchEffect } from "vue";
import '@/packages/materials/index.less';
import { cloneDeep } from "lodash";

const fontSizeList = [12, 14, 16, 20, 22, 24, 32];
const fontWeightList = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const fontFamilyList = ['Times, "Times New Roman", Georgia, serif',
    'Verdana, Arial, Helvetica, sans-serif',
    '"Lucida Console", Courier, monospace',
    'cursive',
    'fantasy',
    'emoji',
    'math',
    'fangsong',
];

export default defineComponent({
    setup() {
        const state = inject('state');
        const plateState = computed(() => state.plates.find(item => item.focused));
        const plate = ref(cloneDeep({ ...plateState.value }))
        watch(plate.value, () => {
            state.plates = state.plates.map(item => item.focused ? plate.value : item)
        })
        return () => (<>
            <div className="row">
                <div className="col col-8">文案</div>
                <div className="col col-16">
                    <textarea rows={5} style="width:86%" v-model={plate.value.attribute['innerText']}></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col col-8">文字大小</div>
                <div className="col col-16">
                    <select name="fontSize" id="fontSize" v-model={plate.value.attribute.style['font-size']}
                        className="font-size-select">
                        {fontSizeList.map(item => <option value={item} >{item}px</option>)}
                    </select></div>
            </div>
            <div className="row">
                <div className="col col-8">文字样式</div>
                <div className="col col-16">
                    <select name="fontFamily" id="fontFamily" v-model={plate.value.attribute.style['font-family']}
                        className="font-size-select">
                        {fontFamilyList.map(item => <option value={item} >{item}</option>)}
                    </select></div>
            </div>
            <div className="row">
                <div className="col col-8">文字粗细</div>
                <div className="col col-16">
                    <select name="fontWeight" id="fontWeight" v-model={plate.value.attribute.style['font-weight']}
                        className="font-size-select">
                        {fontWeightList.map(item => <option value={item} >{item}</option>)}
                    </select></div>
            </div>
            <div className="row">
                <div className="col col-8">文字颜色</div>
                <div className="col col-16">
                    <input type="color" v-model={plate.value.attribute.style['color']} style="width:100% !important" /></div>
            </div>
            {JSON.stringify(plate.value)}
        </>)
    }
})