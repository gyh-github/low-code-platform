import { defineComponent, ref, provide, reactive, onMounted, onBeforeUnmount, nextTick, toRef } from "vue";
import plateConfig from './../packages/utils/plateConfig';
import data from './../packages/data.json';
import './container.less'
import EditPlate from "./components/EditPlate";
import ScaleX from "./components/ScaleX";
import ScaleY from "./components/ScaleY";
import Attribute from "./components/Attribute";
import useWorkspace from "./utils/useWorkspace";
import usePlateDrag from "./utils/usePlateDrag";
import defaultImg from './static/imgs/default.jpg';
import useGuide from "./utils/useGuide";
import { previewFn } from './utils/index.js'


export default defineComponent({

    setup() {
        const state = reactive(data);
        const { componentList, componentMap, register } = plateConfig();

        register({
            label: '文本',
            preview: () => "文本",
            render: (style) => <span style={style}>渲染文本</span>,
            key: "text",
            style: {
                width: '100px',
                height: '25px',
                color: 'green',
                position: 'absolute'
            }
        })
        register({
            label: '按钮',
            preview: () => <button>按钮</button>,
            render: (style) => <button style={style}>按钮</button>,
            key: "button",
            style: {
                width: '100px',
                height: '30px',
                background: 'bule',
                color: '#fff',
                position: 'absolute'
            }
        })
        register({
            label: '输入框',
            preview: () => <input placeholder="请输入" />,
            render: (style) => <input style={style} placeholder="请输入" />,
            key: "input",
            style: {
                width: '100px',
                height: '30px',
                color: '#333',
                position: 'absolute'
            }
        })
        register({
            label: '图片',
            preview: () => <img alt="图片" style="width:100px" src={defaultImg} />,
            render: (style) => <img style={style} alt="图片" src={defaultImg} />,
            key: "img",
            style: {
                width: '150px',
                height: '150px',
                border: 'thin solid #dcdcdc',
                position: 'absolute'
            }
        })

        provide('componentList', componentList)
        provide('componentMap', componentMap)

        const plates = toRef(state, 'plates');
        const containerCenter = ref(null);
        const containerCenterC = ref(null);
        const workspace = ref(null);
        const leftShow = ref(true);
        const rightShow = ref(true);
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

        const workspaceStyle = {
            width: state.container?.width + 'px',
            height: state.container?.height + 'px'
        }

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
                case 'left':
                    leftShow.value = !leftShow.value;
                    break;
                case 'right':
                    rightShow.value = !rightShow.value;
                    break;
                default:
                    return;
            }
            changeSize();
        }

        const { dragstartFn, dragendFn } = usePlateDrag(plates, workspace);
        const { mousedownFn, mouseupFn } = useWorkspace(plates, plateData, workspace, lineData);
        const { addGuideFn, selectGuideFn, releaseGuideFn } = useGuide(guideData, containerCenterC);

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
                    <button onClick={() => addGuideFn('h')}>+添加横向辅助线</button>
                    <button onClick={() => addGuideFn('v')}>+添加纵向辅助线</button>
                    <button onClick={() => previewFn(state, componentMap)}>导出</button>

                </div>
            </div>
            <div className="container-left" style={{ left: leftShow.value ? 0 : '-260px' }}>
                {componentList.map(item => (<div
                    className="container-left-item"
                    draggable
                    onDragstart={(e) => dragstartFn(e, item)}
                    ondragend={dragendFn}
                >
                    <span>{item.label}</span>
                    <div>{item.preview()}</div>
                </div>))}
            </div>
            <div className="container-center" ref={containerCenter} style={{ left: leftShow.value ? '260px' : 0, right: rightShow.value ? '260px' : 0 }}>
                <div className="container-center-container" ref={containerCenterC}>
                    <ScaleX top={scaleTop} />
                    <ScaleY left={scaleLeft} />
                    <div className="container-center-container-workspace"
                        ref={workspace}
                        style={workspaceStyle}> {
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
            <div className="container-right" style={{ right: rightShow.value ? 0 : '-260px' }}>
                <Attribute />
            </div>
            <div className="direction left" style={{ left: leftShow.value ? '260px' : 0 }} onClick={() => handleActionFn('left')}>
                <span> {'>'} </span></div>
            <div className="direction right" style={{ right: rightShow.value ? '260px' : 0 }} onClick={() => handleActionFn('right')}>
                <span> {'<'} </span></div>
        </div >)
    }
})