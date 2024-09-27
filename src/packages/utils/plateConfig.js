
export default function createEditConfig() {
    let componentList = [];
    let componentMap = {};

    return {
        componentList,
        componentMap,
        register: (elem) => {
            componentList.push(elem);
            componentMap[elem.key] = elem;
        }
    }
}

// const registerConfig = createEditConfig();
// registerConfig.register({
//     label: '文本',
//     preview: () => "文本",
//     render: () => "渲染文本",
//     key: "text"
// })
// registerConfig.register({
//     label: '按钮',
//     preview: () => "<button>按钮</button>",
//     render: () => "<button>按钮</button>",
//     key: "button"
// })