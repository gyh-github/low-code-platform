import {
    defineComponent, ref, provide, reactive, onMounted,
    onBeforeUnmount, nextTick, toRef, computed, watch
} from "vue";
import plateConfig from './../packages/utils/plateConfig.jsx';
import data from './../packages/data.json';
import './container.less';
import EditPlate from "./components/EditPlate";
import ScaleX from "./components/ScaleX";
import ScaleY from "./components/ScaleY";
import Attribute from "./components/Attribute";
import NavCom from "./components/NavCom";
import SmallNavCom from "./components/SmallNavCom";
import Layer from "./components/Layer";
import useWorkspace from "./utils/useWorkspace";
import usePlateDrag from "./utils/usePlateDrag";
import useGuide from "./utils/useGuide";
import { previewFn, exportJSONFn } from './utils/index.js';
import { dataProcessing } from "@/packages/utils/apis";


export default defineComponent({

    setup() {
        const state = reactive(data);
        const { componentList, componentMap } = plateConfig();

        provide('componentList', componentList)
        provide('componentMap', componentMap)
        provide('state', state)

        const plates = toRef(state, 'plates');
        const containerCenter = ref(null);
        const containerCenterC = ref(null);
        const workspace = ref(null);
        const layerShow = ref(false);
        const dragShow = ref(true);
        const detailShow = ref(true);
        const scaleTop = ref(2);//顶部标尺
        const scaleLeft = ref(2);//左侧标尺
        const plateData = reactive({
            focused: [],
            unFocused: []
        });//已选中、未选中元素信息
        const lineData = reactive({
            hTop: 0,
            vLeft: 0,
            hType: '',
            vType: '',
        });//指示线信息
        const guideData = ref([]);//辅助线信息

        const centerContainerLeft = computed(() => {
            const _l = layerShow.value ? 150 : 0;
            const _d = dragShow.value ? 200 : 0;
            return _l + _d + 60;
        })

        const workspaceStyle = computed(() => {
            return {
                background: state.container?.background,
                width: state.container?.width + 'px',
                height: state.container?.height + 'px'
            }
        })

        const changeSize = () => {
            nextTick(() => {
                containerCenter.value.scrollTo({
                    top: (containerCenterC.value.clientHeight - containerCenter.value.clientHeight) / 2,
                    left: (containerCenterC.value.clientWidth - containerCenter.value.clientWidth) / 2,
                    behavior: "smooth",
                })
            })
        }
        //监听滚动条滚动
        const handleScrollFn = (e) => {
            scaleTop.value = e.target.scrollTop;
            scaleLeft.value = e.target.scrollLeft;
        }
        // 操作栏展开收起
        const handleActionFn = (key) => {
            switch (key) {
                case 'right':
                    detailShow.value = !detailShow.value;
                    break;
                default:
                    return;
            }
            changeSize();
        }

        //发版
        const publishFn = async () => {
            const res = await dataProcessing(state);
            if (res) {
                console.log(res)
            }
        }

        const { dragstartFn, dragendFn } = usePlateDrag(plates, workspace, componentMap);
        const { mousedownFn, mouseupFn } = useWorkspace(plates, plateData, workspace, lineData);
        const { addGuideFn, selectGuideFn, releaseGuideFn } = useGuide(guideData, containerCenterC);


        // watch(() => plates, (val) => {
        //     console.log(val)
        // }, {
        //     deep: true
        // })

        onMounted(() => {
            changeSize()
            window.addEventListener('resize', changeSize);
            containerCenter.value.addEventListener('scroll', handleScrollFn);
            window.addEventListener('mouseup', releaseGuideFn);
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', changeSize);
            containerCenter.value.removeEventListener('scroll', handleScrollFn);
            window.removeEventListener('mouseup', releaseGuideFn)

        })

        return () => (<div className="container">
            <div class="container-top">
                <div className="container-top-actions">
                    <button onClick={() => (location.href = '/')}>首页</button>
                    <button className={dragShow.value && 'active'} onClick={() => (dragShow.value = !dragShow.value)}>组件</button>
                    <button className={layerShow.value && 'active'} onClick={() => (layerShow.value = !layerShow.value)}>图层</button>
                    <button className={detailShow.value && 'active'} onClick={() => (detailShow.value = !detailShow.value)}>详情</button>
                    <button onClick={() => addGuideFn('h')}>+添加横向辅助线</button>
                    <button onClick={() => addGuideFn('v')}>+添加纵向辅助线</button>
                    <button onClick={() => exportJSONFn(state)}>导出</button>
                    <button onClick={() => previewFn(state, componentMap)}>预览</button>
                    <button onClick={() => publishFn()}>发布</button>

                </div>
            </div>
            <div className="container-left">
                <div className="container-left-title">
                    导航<van-icon name="wap-nav" />
                </div>
                <div className="container-left-content">
                    <NavCom />
                    {dragShow.value && <SmallNavCom />}
                    {dragShow.value && <div className="container-left-dragContainer">
                        {componentList.map(item => (<div
                            className="container-left-item"
                            draggable
                            onDragstart={(e) => dragstartFn(e, item)}
                            ondragend={dragendFn}
                        >
                            <span>{item.label}</span>
                            <div>{item.preview()}</div>
                        </div>))}
                    </div>}
                    {layerShow.value && <Layer v-model={plates} />}
                </div>
            </div>
            <div className="container-center" ref={containerCenter} style={{ left: centerContainerLeft.value + 'px', right: detailShow.value ? '300px' : 0 }}>
                <div className="container-center-container" ref={containerCenterC}>
                    <ScaleX top={scaleTop} />
                    <ScaleY left={scaleLeft} />
                    <div className="container-center-container-workspace"
                        ref={workspace}
                        style={workspaceStyle.value}>
                        {
                            plates.value.map(item =>
                                <EditPlate data={item} onmousedown={(e) => mousedownFn(e, item)} onmouseup={mouseupFn}
                                ></EditPlate>)}
                    </div>
                    {lineData.hType && <div className="line h" style={{ top: lineData.hTop + 'px' }}></div>}
                    {lineData.vType && <div className="line v" style={{ left: lineData.vLeft + 'px' }}></div>}
                    {
                        guideData.value.map(item => (item.type === 'h' ?
                            <div className="line h" style={{ top: item.top + 'px' }} onmousedown={(e) => selectGuideFn(e, item)}></div>
                            : <div className="line v" style={{ left: item.left + 'px' }} onmousedown={(e) => selectGuideFn(e, item)} ></div>))
                    }
                </div>
            </div>
            <div className="container-right" style={{ right: detailShow.value ? 0 : '-300px' }}>
                <Attribute />
            </div>
            <div className="direction right" style={{ right: detailShow.value ? '300px' : 0 }} onClick={() => handleActionFn('right')}>
                <span> {'<'} </span></div>
        </div >)
    }
})