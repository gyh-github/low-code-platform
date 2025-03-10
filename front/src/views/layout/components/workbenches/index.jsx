import { defineComponent } from "vue";
import './index.less';
import Module from "./components/Module";

export default defineComponent({
    setup() {
        return () => (<div className="workbenches">
            <Module className="positionCenter left" />
            <div className="container positionCenter">

            </div>

        </div>)
    }
})