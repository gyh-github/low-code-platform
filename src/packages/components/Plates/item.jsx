import { defineComponent } from "vue";

export default defineComponent({
    setup(props) {
        return <div>
            {JSON.stringify(props)}
        </div>
    }
})