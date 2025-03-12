import { defineStore } from "pinia";

export const useStore = defineStore('main', {
    state: () => { 
        return {
            containerModules: [],//图层组件
            currentModuleId:'',//当前组件id
            moduleList: [
                {
                    type: 'Text',
                    key:'text-1',
                    label: '文字',
                    'ui:color': 'red',
                    'ui:fontSize':'32px',
                    'ui:width':'100px',
                    'ui:height':'35px'
                }
            ]//所有组件数据
        }
    },
    getters: {
        moduleMap(state) {//所有组件组成的map
            let obj = {};
            state.moduleList.forEach(element => {
                obj[element.key] = element;
            });
            return obj;
        }
    },
    actions: { 
        setCurrentModuleId(id) {
            this.currentModuleId = id;
        },
        setContainerModules(type,module) { 
            switch (type) { 
                case 'add':
                    this.containerModules.push(module);
                    break;
                case 'del':
                    this.containerModules = this.containerModules.filter(item => item.id != module.id);
                    break;
                case 'update':
                    this.containerModules = this.containerModules.map(item => item.id === module.id ? module : item);
                    break;
                case 'clear':
                    this.containerModules = [];
                default:
                    return;
            }
        },
        setModuleList(type,module) { 
            switch (type) { 
                case 'add':
                    this.moduleList.push(module);
                    break;
                case 'del':
                    this.moduleList = this.moduleList.filter(item => item.key != module.key);
                    break;
                case 'update':
                    this.moduleList = this.moduleList.map(item => item.key === module.key ? module : item);
                    break;
                case 'clear':
                    this.moduleList = [];
                default:
                    return;
            }
        }
    }
})