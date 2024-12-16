import { defineComponent } from "vue";
import './index.less';
import NavCom from "../../components/NavCom";

export default defineComponent({
    setup() {
        return () => (<div className="login">
            <NavCom />
            登陆</div>)
    }
})