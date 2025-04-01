import { defineComponent, onMounted } from "vue";
import './index.less';
import Module from "./components/Module";
import Detail from "./components/Detail";
import Container from "./components/ContainerW";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useProject } from "@/hooks/useProject";
import { useStore } from '@/store';
import { storeToRefs } from "pinia";
import { detail } from '@/apis/project';
import { cloneDeep } from 'lodash';
import { imgUrlToBase64 } from "@/utils";

export default defineComponent({
    setup() {
        const { saveConfirm } = useProject();
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
            saveConfirm()
        })
        onMounted(async () => {
            store.setProjectId('');
            store.setProjectOperate(query?.actionKey || 'add');
            store.setProjectTitle('');
            store.setPageInfo({
                width: '375px',
                height: '667px',
                backgroundColor: '#ffffff',
                backgroundImage: ''
            });
            store.setContainerModules('clear');
            if (query?.id) {
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
                    jsonData.pageInfo?.backgroundImage && imgUrlToBase64(jsonData.pageInfo?.backgroundImage);
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