import { defineComponent } from "vue";
import './index.less';

export default defineComponent({
    setup() {
        const navs = [
            {
                label: '首页',
                value: 'home'
            },
            {
                label: '发现',
                value: 'find'
            },
            {
                label: '关于',
                value: 'about'
            },
            {
                label: '加入我们',
                value: 'join'
            },
        ];
        return () => (<>
            <div className="navs">
                {
                    navs.map((item) => (
                        <div className="navs-item">
                            <span>{item.label}</span>
                        </div>))
                }
            </div>
        </>)
    }
})