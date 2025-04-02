import { defineComponent, defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useStore } from '@/store';
import { storeToRefs } from "pinia";
import './index.less';
import { data as modules } from '@/store/modules.json';

export default defineComponent({
    setup() {
        const store = useStore();
        const { moduleAll } = storeToRefs(store);
        const activeKey = ref('text');//tabkey
        //tab点击回调
        const handleTabClick = (e) => {
            activeKey.value = e.target.name;
        }
        //组件拖拽时设置组件key
        const dragstartFn = (e, item) => {
            e.dataTransfer.setData('moduleKey', item.key);
        }
        //绘制组件
        onBeforeMount(() => {
            modules?.forEach(element => {
                const ModuleCom = defineAsyncComponent({
                    loader: () => import(`./../../../../../../components/modules/${element['type']}/index.jsx`)
                })
                element['preview'] = () => <ModuleCom />;
                element['render'] = (props) => <ModuleCom {...props} />;
            });
            store.setModuleAll(modules);
        })

        return () => (<div className="module">
            <div className="workbenches-tabs" onClick={handleTabClick}>
                <button name="text" className={activeKey.value === 'text' && 'active'}>文本组件</button>
                <button name="form" className={activeKey.value === 'form' && 'active'}>表单组件</button>
                <button name="senior" className={activeKey.value === 'senior' && 'active'}>进阶组件</button>
            </div>
            {
                moduleAll.value?.filter(element => element.category === activeKey.value)?.map(ele =>
                    <div draggable className="item"
                        onDragstart={(e) => dragstartFn(e, ele)} >{ele.preview()}
                    </div>)
            }
        </div>)
    }
})