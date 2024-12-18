import { defineComponent } from "vue";
import NavCom from './components/NavCom';
import './index.less';

export default defineComponent({

    setup() {
        return () => (<div className="layout">
            <NavCom />
            <RouterView />
        </div>)
    }
})