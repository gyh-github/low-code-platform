import { defineComponent } from "vue";
import './index.less';
import Module from "./components/Module";
import Detail from "./components/Detail";
import Container from "./components/ContainerW";

export default defineComponent({
    setup() {
        return () => (<div className="workbenches" >
            <Module />
            <Container />
            <Detail />
        </div>)
    }
})