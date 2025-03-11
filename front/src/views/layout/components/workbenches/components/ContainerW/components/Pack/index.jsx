import { defineComponent } from "vue";
import './index.less';

export default defineComponent({
    props: ['data'],
    setup({ data }) {
        let renderData = {};
        const style = {};
        Object.entries(data).forEach(ele => {
            if (ele[0].indexOf('ui:') != -1) {
                style[ele[0].replace('ui:', '')] = ele[1];
            } else {
                renderData[ele[0]] = ele[1];
            }
        })
        delete renderData.render;
        delete renderData.preview;
        renderData['style'] = { ...style };
        return () => (<div className="pack" style={{ ...style }}>
            {data.render(renderData)}
        </div>)
    }
})