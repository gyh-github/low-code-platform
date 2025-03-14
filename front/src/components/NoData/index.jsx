import { defineComponent } from "vue";
import './index.less';
import noDataImg from '@/assets/images/no-data.png';

export default defineComponent({
    props: {
        msg: {
            type: String,
            default: '暂无数据'
        }
    },
    setup({ msg }) {
        return () => (<div className="noData">
            <img src={noDataImg} alt="icon" /><br />
            <span>{msg}</span>
        </div>)
    }
})