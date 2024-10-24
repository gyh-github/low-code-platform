import { defineComponent, ref, provide, reactive, onMounted, onBeforeUnmount, nextTick, toRef } from "vue";
import plateConfig from './../packages/utils/plateConfig';
import data from './../packages/data.json';
import './container.less'
import EditPlate from "./components/EditPlate";
import ScaleX from "./components/ScaleX";
import ScaleY from "./components/ScaleY";
import useWorkspace from "./utils/useWorkspace";
import usePlateDrag from "./utils/usePlateDrag";
import defaultImg from './static/imgs/default.jpg';


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
                color: 'green'
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
                color: '#fff'
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
                color: '#333'
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
                border: 'thin solid #dcdcdc'
            }
        })

        provide('componentList', componentList)
        provide('componentMap', componentMap)

        const plates = toRef(state, 'plates');
        const containerCenter = ref(null);
        const containerCenterC = ref(null);
        const workspace = ref(null);
        const topShow = ref(false);
        const leftShow = ref(true);
        const rightShow = ref(true);
        const scaleTop = ref(2);
        const scaleLeft = ref(2);
        const plateData = reactive({
            focused: [],
            unFocused: []
        })
        const lineData = reactive({
            hTop: 0,
            vLeft: 0,
            hType: '',
            vType: '',
        })

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
            console.log(e.target.scrollTop);
            scaleTop.value = e.target.scrollTop;
            scaleLeft.value = e.target.scrollLeft;
        }
        // 操作栏展开收起
        const handleActionFn = (key) => {
            switch (key) {
                case 'top':
                    topShow.value = !topShow.value;
                    break;
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

        onMounted(() => {
            changeSize()
            window.addEventListener('resize', changeSize);
            containerCenter.value.addEventListener('scroll', handleScrollFn);
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', changeSize);
            containerCenter.value.removeEventListener('scroll', handleScrollFn);
        })

        return () => (<div className="container">

            <div class="container-top" style={{ height: topShow.value ? '90px' : 0 }}></div>
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
            <div className="container-center" ref={containerCenter} style={{ top: topShow.value ? '90px' : 0, left: leftShow.value ? '260px' : 0, right: rightShow.value ? '260px' : 0 }}>
                <div className="container-center-container" ref={containerCenterC}>
                    <ScaleX top={scaleTop} />
                    <ScaleY left={scaleLeft} />
                    <div className="container-center-container-workspace"
                        ref={workspace}
                        style={workspaceStyle}> {
                            plates.value.map(item =>
                                <EditPlate data={item} onmousedown={(e) => mousedownFn(e, item)} onmouseup={mouseupFn}
                                ></EditPlate>)}
                        {lineData.hType && <div className="line h" style={{ top: lineData.hTop + 'px' }}></div>}
                        {lineData.vType && <div className="line v" style={{ left: lineData.vLeft + 'px' }}></div>}
                    </div>
                </div>
            </div>
            <div className="container-right" style={{ right: rightShow.value ? 0 : '-260px' }}></div>

            <div className="direction top" style={{ top: topShow.value ? '90px' : 0 }} onClick={() => handleActionFn('top')}>
                <span style={{ transform: `rotate(90deg)` }}> {'>'} </span></div>
            <div className="direction left" style={{ left: leftShow.value ? '260px' : 0 }} onClick={() => handleActionFn('left')}>
                <span> {'>'} </span></div>
            <div className="direction right" style={{ right: rightShow.value ? '260px' : 0 }} onClick={() => handleActionFn('right')}>
                <span> {'<'} </span></div>
        </div >)
    }
})