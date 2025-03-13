import { defineComponent, ref } from "vue";
import './index.less';
import Attribute from "./components/Attribute";
import Layer from "./components/Layer";
import Page from "./components/Page";

export default defineComponent({
    setup() {
        const activeKey = ref('attribute');
        const handleTabClick = (e) => {
            console.log(e.target.name)
            activeKey.value = e.target.name;
        }
        return () => (<div className="detail">
            <div className="detail-tabs" onClick={handleTabClick}>
                <button name="attribute" className={activeKey.value === 'attribute' && 'active'}>属性设置</button>
                <button name="layer" className={activeKey.value === 'layer' && 'active'}>图层设置</button>
                <button name="page" className={activeKey.value === 'page' && 'active'}>页面设置</button>
            </div>
            {activeKey.value === 'attribute' && <Attribute />}
            {activeKey.value === 'layer' && <Layer />}
            {activeKey.value === 'page' && <Page />}
        </div>)
    }
})