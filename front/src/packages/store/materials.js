import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useMaterialsStore = defineStore('materails', () => {
    const state = reactive({
        componentMap: {},
        componentList: []
    });
    const register = (elem) => {
        state.componentList.push(elem);
        state.componentMap[elem.key] = elem;

    };
    return {
        ...state, register
    }
})

export default useMaterialsStore;