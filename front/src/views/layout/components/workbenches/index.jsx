import { defineComponent, createVNode, onMounted } from "vue";
import './index.less';
import Module from "./components/Module";
import Detail from "./components/Detail";
import Container from "./components/ContainerW";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { Modal } from "ant-design-vue";
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { useProject } from "@/hooks/useProject";
import { useStore } from '@/store';
import { storeToRefs } from "pinia";
import { detail } from '@/apis/project';
import { cloneDeep } from 'lodash';

export default defineComponent({
    setup() {
        const { saveProject } = useProject();
        const store = useStore();
        const { moduleMap, containerModules, pageInfo } = storeToRefs(store)
        const { query } = useRoute();
        let initPageInfo = {};
        let initContainerModules = [];
        onBeforeRouteLeave((to, from, next) => {
            next();
            return;
            if (containerModules['value'] === initContainerModules && pageInfo['value'] === initPageInfo) {
                return;
            }
            Modal.confirm({
                title: '温馨提示',
                centered: 'true',
                icon: createVNode(ExclamationCircleFilled),
                content: createVNode('div', { padding: '30px' }, [
                    createVNode('p', { style: 'color:#ee0000;font-weight:600;' }, '即将离开该页面，是否保存本次修改？'),
                    createVNode('span', {}, '项目名称：'),
                    createVNode('input', { value: store.projectTitle, onChange: (e) => store.setProjectTitle(e.target.value) })]),
                okText: '保存后离开',
                cancelText: '直接离开',
                async onOk() {
                    await saveProject();
                    next()
                },
                onCancel() {
                    next()
                },
            });
        })
        onMounted(async () => {
            if (query?.id) {
                store.setPageInfo({
                    width: '375px',
                    height: '667px',
                    backgroundColor: '#ffffff',
                    backgroundImage: ''
                });
                store.setContainerModules('clear');
                const res = await detail({ id: query?.id });
                if (res) {
                    const jsonData = JSON.parse(res.json_data);
                    store.setProjectId(res.id);
                    store.setProjectTitle(res.title);
                    store.setPageInfo(jsonData.pageInfo);
                    jsonData.modules.forEach(element => {
                        const _module = cloneDeep(element);
                        _module['render'] = moduleMap['value'][element.key]['render'];
                        store.setContainerModules('add', _module);
                    });
                    initPageInfo = jsonData.pageInfo;
                    initContainerModules = jsonData.modules;
                }
            }
        })
        return () => (<div className="workbenches" >
            <Module />
            <Container />
            <Detail />
        </div>)
    }
})