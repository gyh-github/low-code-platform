import { defineComponent } from "vue";
import './index.less';
import Module from "./components/Module";
import Container from "./components/ContainerW";

export default defineComponent({
    setup() {
        return () => (<div className="workbenches" >
            <Module />
            <Container />

        </div>)
    }
})