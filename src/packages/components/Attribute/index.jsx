import { defineComponent } from "vue";

export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, emits) {
        console.log(props.modelValue, emits);


        return () => (<>
            <h2>属性</h2>
            {props.modelValue.value.map(item => {
                return <div>
                    <input type="text" v-model={item.attribute.width} />
                </div>
            })}
        </>)
    }
})