import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import './index.less';
import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import Pack from "./components/Pack";
import { storeToRefs } from "pinia";

export default defineComponent({
    setup() {
        const { setContainerModules } = useStore();
        const store = useStore();
        const { moduleMap, containerModules } = storeToRefs(store)

        //拖拽元素被放下时回调
        const dropFn = (e) => {
            e.preventDefault();
            const _key = e.dataTransfer.getData('moduleKey');
            const _module = cloneDeep(moduleMap['value'][_key]);
            _module['id'] = new Date().getTime().toString();
            _module['selected'] = true;
            _module['ui:top'] = e.offsetY + 'px';
            _module['ui:left'] = e.offsetX + 'px';
            setContainerModules('add', _module);
        }
        //组件在元素上拖拽时回调
        const dragOverFn = (e) => {
            e.preventDefault();
        }
        //缩放组件
        const scaleWork = ref(0.75);
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
        onMounted(() => {
            screenChange();
            window.addEventListener('resize', screenChange);
            // const workDemo = document.getElementsByClassName('workbenches')[0];
            // workDemo.addEventListener('wheel', wheelChange);
        })
        onBeforeUnmount(() => {
            window.removeEventListener('resize', screenChange);
            // const workDemo = document.getElementsByClassName('workbenches')[0];
            // workDemo.removeEventListener('wheel', wheelChange);

        })
        return () => (<div className="container" style={{ transform: `scale(${scaleWork.value})` }}>
            <div className="container-main" draggable onDragover={(e) => dragOverFn(e)} onDrop={(e) => dropFn(e)}>
                {
                    containerModules.value.map((elem) => (<Pack data={elem} />))
                }
            </div>
        </div>)
    }
})