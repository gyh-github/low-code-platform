import { computed, defineComponent, inject, onMounted, ref } from "vue";
import './index.less';

export default defineComponent({
    props: ['data'],
    setup({ data }) {
        const itemRef = ref(null);
        const itemStyle = computed(() => ({
            top: data.top + 'px',
            left: data.left + 'px',
            zIndex: data.zIndex,
            position: 'absolute'
        }))
        onMounted(() => {
            const { offsetWidth, offsetHeight } = itemRef.value;
            data.top = data.top - offsetHeight / 2;
            data.left = data.left - offsetWidth / 2;
        })
        const component = inject('componentMap')[data.key];

        const mousemoveFn = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }

        return () => (<div ref={itemRef} onMousemove={mousemoveFn} style={{ ...itemStyle.value }} className={data.focused ? 'item focused' : 'item'}>
            {component.render()}
        </div>)
    }
})