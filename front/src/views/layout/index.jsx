import { defineComponent } from "vue";
import NavCom from './components/NavCom';
import SwitchThemes from './components/SwitchThemes';
import './index.less';

export default defineComponent({

    setup() {
        return () => (<div className="layout">
            <NavCom />
            <SwitchThemes />
            <div className="layout-content">
                <RouterView />
            </div>
        </div>)
    }
})