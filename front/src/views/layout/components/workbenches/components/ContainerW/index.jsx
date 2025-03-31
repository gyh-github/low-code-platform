import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import './index.less';
import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import Pack from "./components/Pack";
import { storeToRefs } from "pinia";

export default defineComponent({
    setup() {
        const targetRef = ref(null);
        const { setContainerModules } = useStore();
        const store = useStore();
        const { moduleMap, containerModules, pageInfo } = storeToRefs(store)
        //拖拽元素被放下时回调
        const dropFn = (e) => {
            e.preventDefault();
            const _key = e.dataTransfer.getData('moduleKey');
            if (!_key) return;
            const _module = cloneDeep(moduleMap['value'][_key]);
            _module['id'] = new Date().getTime().toString();
            _module['layerName'] = `图层（${containerModules.value.length + 1}）`;
            _module['selected'] = true;
            _module['locked'] = false;
            _module['ui:top'] = e.offsetY + 'px';
            _module['ui:left'] = e.offsetX + 'px';
            setContainerModules('add', _module);
        }
        //组件在元素上拖拽时回调
        const dragOverFn = (e) => {
            e.preventDefault();
        }
        //缩放组件
        const scaleWork = ref(1);
        //监听页面尺寸变化
        const screenChange = (e) => {
            const totalHeight = document.documentElement.scrollHeight;
            const totalWidth = document.documentElement.scrollWidth;
            const visibleHeight = window.innerHeight;
            const visibleWidth = window.innerWidth;

            // 计算中间位置
            const middlePositionH = (totalHeight - visibleHeight) / 2;
            const middlePositionW = (totalWidth - visibleWidth) / 2;

            // 设置滚动条位置
            window.scrollTo({
                top: middlePositionH,
                left: middlePositionW,
                behavior: 'smooth' // 可选：平滑滚动效果
            });
        }
        //监听滚轮滑动，进行元素缩放
        const wheelChange = (e) => {
            e.preventDefault();
            e.stopPropagation();
            scaleWork.value = e.deltaY < 0 ? scaleWork.value * 0.9 : scaleWork.value * 1.1;
            scaleWork.value = Math.min(Math.max(0.75, scaleWork.value), 1.25);
        }
        // 监听点击事件的回调函数
        const handleClick = (event) => {
            event.preventDefault();
            if (targetRef.value && targetRef.value.contains(event.target)) {
                store.setContainerModules('clearSelect');
            }
        };
        onMounted(() => {
            screenChange();
            window.addEventListener('resize', screenChange);
            document.addEventListener('click', handleClick);
            // const workDemo = document.getElementsByClassName('workbenches')[0];
            // workDemo.addEventListener('wheel', wheelChange);
        })
        onBeforeUnmount(() => {
            window.removeEventListener('resize', screenChange);
            document.removeEventListener('click', handleClick);
            // const workDemo = document.getElementsByClassName('workbenches')[0];
            // workDemo.removeEventListener('wheel', wheelChange);'即将离开该页面，是否保存本次修改？'

        })
        return () => (<div className="container" style={{ transform: `scale(${scaleWork.value})` }}>
            <div className="container-main"
                ref={targetRef}
                id="containerMain"
                style={{
                    width: pageInfo.value['width'],
                    height: pageInfo.value['height'],
                    backgroundColor: pageInfo.value['backgroundColor'],
                    backgroundImage: `url(${pageInfo.value['backgroundImage']})`,
                }}
                draggable onDragover={(e) => dragOverFn(e)} onDrop={(e) => dropFn(e)}>
                {
                    containerModules.value.map((elem) => (<Pack data={elem} />))
                }
            </div>
        </div>)
    }
})