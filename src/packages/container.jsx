import { defineComponent, ref, provide, reactive, onMounted, onBeforeUnmount, nextTick } from "vue";
import plateConfig from './../packages/utils/plateConfig';
import data from './../packages/data.json';
import './container.less'
import EditPlate from "./components/EditPlate";


export default defineComponent({

    setup() {
        const state = reactive(data);
        const { componentList, componentMap, register } = plateConfig();

        register({
            label: '文本',
            preview: () => "文本",
            render: () => <span>渲染文本</span>,
            key: "text"
        })
        register({
            label: '按钮',
            preview: () => <button>按钮</button>,
            render: () => <button>按钮</button>,
            key: "button"
        })
        register({
            label: '输入框',
            preview: () => <input placeholder="请输入" />,
            render: () => <input placeholder="请输入" />,
            key: "input"
        })


        provide('componentList', componentList)
        provide('componentMap', componentMap)

        const currentPlate = ref(null);

        const containerCenter = ref(null);
        const containerCenterC = ref(null);
        const workspace = ref(null);

        const plateData = reactive({
            focused: [],
            unFocused: []
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

        const plateDragstartFn = (e, plate) => {
            console.log(e, plate);
            currentPlate.value = plate;
            workspace.value.addEventListener('dragover', plateDragoverFn);
            workspace.value.addEventListener('drop', plateDropFn);

        }
        const plateDragendFn = () => {
            workspace.value.removeEventListener('dragover', plateDragoverFn);
            workspace.value.removeEventListener('drop', plateDropFn);
        }

        const plateDragoverFn = (e) => {
            e.preventDefault();
        }
        const plateDropFn = (e) => {
            const _currentPlate = currentPlate.value;
            if (!_currentPlate) return;
            state.plates = [...state.plates, {
                top: e.layerY,
                left: e.layerX,
                zIndex: 1,
                alignCenter: true,
                key: _currentPlate.key,
                id: new Date().getTime().toString(),
                focused: false,
            }];
        }

        const clearFocusFn = () => {
            state.plates.forEach(item => item.focused = false)
        }
        const mousedownFn = (e, item) => {
            e.preventDefault();
            // clearFocusFn();
            item.focused = true;
            console.log(e, item);
            plateData.focused.push({ ...item, rangeLeft: e.clientX - item.left, rangeTop: e.clientY - item.top });
            workspace.value.addEventListener('mousemove', mousemoveFn);
        }
        const mousemoveFn = (e) => {
            state.plates.forEach(item => {
                const _item = plateData.focused.find(ele => ele.key);
                if (item.focused) {
                    item.top = e.clientY - _item.rangeTop;
                    item.left = e.clientX - _item.rangeLeft;
                }
            })
        }
        const mouseupFn = (e) => {
            workspace.value.removeEventListener('mousemove', mousemoveFn);
        }

        onMounted(() => {
            changeSize()
            window.addEventListener('resize', changeSize)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', changeSize)
        })

        return () => (<div className="container">
            <div class="container-top"></div>
            <div className="container-left">
                {componentList.map(item => (<div
                    className="container-left-item"
                    draggable
                    onDragstart={(e) => plateDragstartFn(e, item)}
                    ondragend={plateDragendFn}
                >
                    <span>{item.label}</span>
                    <div>{item.preview()}</div>
                </div>))}
            </div>
            <div className="container-center" ref={containerCenter}>
                <div className="container-center-container" ref={containerCenterC}>
                    <div className="container-center-container-workspace"
                        ref={workspace}
                        style={workspaceStyle}>
                        {
                            state.plates.map(plate =>
                                <EditPlate data={plate} onmousedown={(e) => mousedownFn(e, plate)} onmouseup={mouseupFn}></EditPlate>)}
                    </div>
                </div>
            </div>
            <div className="container-right"></div>
        </div >)
    }
})