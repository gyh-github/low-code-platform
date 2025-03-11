import { defineComponent } from "vue";
import './index.less';
import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import Pack from "./components/Pack";

export default defineComponent({
    setup() {
        const { moduleMap, setContainerModules, containerModules } = useStore();
        const dropFn = (e) => {
            e.preventDefault();
            const _key = e.dataTransfer.getData('moduleKey');
            console.log(moduleMap, '---drop');
            const _module = cloneDeep(moduleMap[_key]);
            _module['id'] = new Date().getTime().toString();
            // _module['ui:position'] = 'absolute';
            _module['ui:top'] = e.offsetY + 'px';
            _module['ui:left'] = e.offsetX + 'px';
            setContainerModules('add', _module);
            console.log(containerModules, '-----:containerModules')
        }
        const dragOverFn = (e) => {
            e.preventDefault();
        }
        return () => (<div className="container" draggable onDragover={(e) => dragOverFn(e)} onDrop={(e) => dropFn(e)}>
            {
                containerModules.map(ele => (<Pack data={ele} />))
            }
        </div>)
    }
})