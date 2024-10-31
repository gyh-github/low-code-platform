import { computed, defineComponent, inject, onMounted, ref } from "vue";
import './index.less';

export default defineComponent({
    props: ['data'],
    setup(props) {
        const itemRef = ref(null);
        const itemStyle = computed(() => ({
            top: props.data.top + 'px',
            left: props.data.left + 'px',
            width: props.data.attribute.style.width + 'px',
            height: props.data.attribute.style.height + 'px',
            zIndex: props.data.zIndex,
            position: 'absolute'
        }))
        onMounted(() => {
            const { offsetWidth, offsetHeight } = itemRef.value;
            props.data.top = props.data.top - offsetHeight / 2;
            props.data.left = props.data.left - offsetWidth / 2;
        })
        const component = inject('componentMap')[props.data.key];

        const mousemoveFn = (e) => {
            e.preventDefault();
        }

        return () => (<div ref={itemRef} onMousemove={mousemoveFn} style={{ ...itemStyle.value }} className={props.data.focused ? 'item focused' : 'item'} >
            {component.render({ ...props.data.attribute.style, height: props.data.attribute.style.height + 'px', width: props.data.style.attribute.width + 'px' })}
        </div>)
    }
})