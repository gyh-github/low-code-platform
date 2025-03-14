import { defineComponent } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { MenuOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { Dropdown, Menu } from "ant-design-vue";
import { VueDraggableNext } from 'vue-draggable-next';
import NoData from "@/components/NoData";
export default defineComponent({
    setup() {
        const store = useStore();
        const { containerModules } = storeToRefs(store);

        const onDragEnd = () => {
            console.log(containerModules.value)
        }

        const handleMenuClick = (e) => {
            console.log(e)
        }


        const menu = (
            <Menu class="custom-menu" onClick={handleMenuClick}>
                <Menu.Item key="1">选项 1</Menu.Item>
                <Menu.Item key="2">选项 2</Menu.Item>
                <Menu.Item key="3">选项 3</Menu.Item>
            </Menu>
        );

        return () => (<div className="layer">
            {
                containerModules.value?.length > 0 && <VueDraggableNext v-model={containerModules.value}
                    animation={400}
                    handle={'.anticon-menu'}
                    onChange={onDragEnd}>
                    {
                        containerModules.value.map((module) =>
                        (<div key={module.id} className="layer-item">
                            <Dropdown overlay={menu} trigger={['click']} >
                                <div >
                                    <MenuOutlined />
                                    <div className="layer-title"> {module.layerName}</div>
                                    <EllipsisOutlined />
                                </div>
                            </Dropdown>
                        </div>))
                    }
                </VueDraggableNext>
            }
            {
                !containerModules.value?.length && <NoData />
            }
        </div>)
    }
})