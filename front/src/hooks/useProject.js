import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

export function useProject() {
    const store = useStore();
    const { pageInfo, containerModules } = storeToRefs(store);
    
    //保存
    const saveProject = () => { };
    //设置为模板
    const setProjectModule = () => { };
    //设置为作品
    const saveProjectCreation = () => { };

    return {
        saveProject,
        setProjectModule,
        saveProjectCreation
    };
}