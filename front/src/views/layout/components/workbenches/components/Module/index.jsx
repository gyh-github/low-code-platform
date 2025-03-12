import { defineComponent, defineAsyncComponent, onBeforeMount } from "vue";
import { useStore } from '@/store';
import './index.less';

export default defineComponent({
    setup() {
        const { moduleList, setModuleList } = useStore();

        onBeforeMount(() => {
            moduleList?.forEach(element => {
                const ModuleCom = defineAsyncComponent({
                    loader: () => import(`./../../../../../../components/modules/${element['type']}/index.jsx`)
                })
                element['preview'] = () => <ModuleCom />;
                element['render'] = (props) => <ModuleCom {...props} />;
                setModuleList('update', element);
            });
        })

        const dragstartFn = (e, item) => {
            e.dataTransfer.setData('moduleKey', item.key);
        }
        return () => (<div className="module">
            {
                moduleList.map(ele => <div draggable onDragstart={(e) => dragstartFn(e, ele)} >{ele.preview()}</div>)
            }
        </div>)
    }
})