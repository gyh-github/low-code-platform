import { defineStore } from "pinia";

export const useStore = defineStore('main', {
    state: () => {
        return {
            pageInfo: {
                width: '375px',
                height: '667px',
                backgroundColor: '#ffffff',
                backgroundImage: ''
            },//页面信息
            containerModules: [],//图层组件
            projectTitle: '',//项目标题
            projectId: '',//项目Id
            projectOperate: '',//操作项目 add新增；edit修改；copy引用
            currentModuleId: '',//当前组件id
            moduleAll: [],//所有组件数据
            moduleList: []//组件数据
        }
    },
    getters: {
        moduleMap(state) {//所有组件组成的map
            let obj = {};
            state.moduleAll.forEach(element => {
                obj[element.key] = element;
            });
            return obj;
        }
    },
    actions: {
        setCurrentModuleId(id) {
            this.currentModuleId = id;
        },
        setProjectId(id) {
            this.projectId = id;
        },
        setProjectOperate(active) {
            this.projectOperate = active;
        },
        setProjectTitle(title) {
            this.projectTitle = title;
        },
        setContainerModules(type, module = null) {
            let _list = [...this.containerModules];
            switch (type) {
                case 'add':
                    _list.forEach(item => item.selected = false)
                    _list.push(module);
                    break;
                case 'del':
                    _list = _list.filter(item => item.id != module?.id);
                    break;
                case 'update':
                    _list = _list.map((item) => {
                        if (item.id === module?.id) {
                            return module;
                        } else {
                            return item;
                        }
                    })
                    break;
                case 'select':
                    _list = _list.map((item) => {
                        if (item.id === module?.id) {
                            item.selected = true;
                        } else {
                            item.selected = false;
                        }
                        return item;
                    })
                    break;
                case 'clearSelect':
                    _list.forEach(item => item.selected = false);
                    break;
                case 'clear':
                    _list = [];
                    break;
                default:
                    return;
            }
            this.$patch(state => {
                state.containerModules = _list; // ✅ 通过 $patch 安全替换
            });
            // console.log(this.containerModules, '------setContainerModules的结果！')
            // console.log(module, '------setContainerModules的结果！module')
        },
        setModuleList(type, module) {
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
        },
        setModuleAll(val) {
            this.moduleAll = val;
         },
        setPageInfo(page) {
            this.$patch(state => {
                state.pageInfo = page;
            })
        }
    }
})