import { defineComponent, ref, createVNode } from "vue";
import './index.less';
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { MenuOutlined, EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons-vue';
import { Dropdown, Menu, Modal } from "ant-design-vue";
import { VueDraggableNext } from 'vue-draggable-next';
import NoData from "@/components/NoData";
import { cloneDeep } from "lodash";
export default defineComponent({
    setup() {
        const store = useStore();
        const { containerModules } = storeToRefs(store);
        const currentModuleId = ref('');

        //点击下拉菜单内按钮回调
        const handleMenuClick = (e) => {
            const _module = cloneDeep(containerModules.value?.find(item => item.id === currentModuleId.value));
            if (!_module) return;
            switch (e.key) {
                case 'lock':
                    _module['locked'] = true;
                    store.setContainerModules('update', _module);
                    break;
                case 'unlock':
                    _module['locked'] = false;
                    store.setContainerModules('update', _module);
                    break;
                case 'del':
                    //删除确认提示框
                    Modal.confirm({
                        title: '温馨提示',
                        icon: createVNode(ExclamationCircleFilled),
                        content: '即将删除该图层，是否继续？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            store.setContainerModules('del', _module);
                        },
                        onCancel() { },
                    });
                    break;
                default:
                    return;
            }
        }
        //点击下拉菜单回调
        const handleDropClick = (item) => {
            currentModuleId.value = item.id;
        };

        //下拉菜单
        const menu = (module) => (
            <Menu class="custom-menu" onClick={handleMenuClick}>
                <Menu.Item key="lock" disabled={module.locked}>锁定</Menu.Item>
                <Menu.Item key="unlock" disabled={!module.locked}>解锁</Menu.Item>
                <Menu.Item key="del" disabled={module.locked}>删除</Menu.Item>
            </Menu>
        );



        return () => (<div className="layer">
            {
                containerModules.value?.length > 0 && <VueDraggableNext v-model={containerModules.value}
                    animation={400}
                    handle={'.anticon-menu'}>
                    {
                        containerModules.value.map((module) =>
                        (<div key={module.id} className="layer-item">
                            <Dropdown overlay={menu(module)} trigger={['click']} onClick={() => handleDropClick(module)}>
                                <div>
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