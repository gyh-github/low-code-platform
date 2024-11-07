import defaultImg from '@/packages/static/imgs/default.jpg';
export default function createEditConfig() {
    let componentList = [];
    let componentMap = {};
    const register = (elem) => {
        componentList.push(elem);
        componentMap[elem.key] = elem;
    }


    register({
        label: '文本',
        preview: () => "文本",
        render: (props) => <span {...props}></span>,
        key: "text",
        attribute: {
            style: {
                width: 100,
                height: 25,
                color: 'green',
                position: 'absolute'
            },
            innerText: '渲染文本'
        }
    })
    register({
        label: '按钮',
        preview: () => <button>按钮</button>,
        render: (props) => <button {...props}></button>,
        key: "button",
        attribute: {
            style: {
                width: 100,
                height: 30,
                background: 'blue',
                color: '#fff',
                position: 'absolute'
            },
            innerText: '按钮'
        }
    })
    register({
        label: '输入框',
        preview: () => <input placeholder="请输入" style="width:70px" />,
        render: (props) => <input {...props} placeholder="请输入" />,
        key: "input",
        attribute: {
            style: {
                width: 100,
                height: 30,
                color: '#333',
                position: 'absolute'
            }
        }
    })
    register({
        label: '图片',
        preview: () => <img alt="图片" style="width:60px" src={defaultImg} />,
        render: (props) => <img {...props} />,
        key: "img",
        attribute: {
            style: {
                width: 150,
                height: 150,
                border: 'thin solid #dcdcdc',
                position: 'absolute'
            },
            alt: '图片',
            src: defaultImg
        }
    })
    register({
        label: 'vant-button',
        preview: () => <van-button>vant按钮</van-button>,
        render: (props) => <van-button  {...props}></van-button>,
        key: "vant-button",
        attribute: {
            style: {
                width: 100,
                height: 50,
                border: 'thin solid #dcdcdc',
                position: 'absolute'
            },
            innerText: 'vant按钮'
        }
    })

    return {
        componentList,
        componentMap,
        register
    }
}
