import { defineComponent } from "vue";
import NavCom from './components/NavCom';
import './index.less';

export default defineComponent({

    setup() {
        return () => (<div className="layout">
            <NavCom />
            <div className="layout-content">
                <RouterView />
            </div>
        </div>)
    }
})