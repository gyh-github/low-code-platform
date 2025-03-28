import { defineComponent } from "vue";
import './index.less';
import PosterImg from '@/assets/images/poster-picture.png';
export default defineComponent({
    props: {
        info: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    setup({ info }) {

        return () => (<div className="item">
            <div className="item-title">{info?.title}</div>
            <img src={info?.thumbnail_url || PosterImg} alt="海报" className="item-poster" />
            <div className="item-action">

            </div>
        </div>)
    }
})