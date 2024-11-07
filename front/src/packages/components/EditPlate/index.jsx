import { computed, defineComponent, inject, onMounted, ref } from "vue";
import './index.less';
import _ from 'lodash';

export default defineComponent({
    props: ['data'],
    setup(props) {
        const itemRef = ref(null);
        const componentMap = inject('componentMap')
        const component = ref(componentMap[props.data.key]);
        const itemStyle = computed(() => ({
            top: props.data.top + 'px',
            left: props.data.left + 'px',
            width: props.data.attribute.style.width + 'px',
            height: props.data.attribute.style.height + 'px',
            zIndex: props.data.zIndex,
            position: 'absolute'
        }))
        const renderProps = computed(() => {
            const arr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
            let _attribute = _.cloneDeep(props.data.attribute);
            for (let key in _attribute.style) {
                _attribute.style[key] = arr.includes(key) ? _attribute.style[key] + 'px' : _attribute.style[key];
            }
            // console.log(_attribute)
            component.value = componentMap[props.data.key];
            return {
                ..._attribute
            }
        });
        onMounted(() => {
            const { offsetWidth, offsetHeight } = itemRef.value;
            props.data.top = props.data.top - offsetHeight / 2;
            props.data.left = props.data.left - offsetWidth / 2;
        })

        const mousemoveFn = (e) => {
            e.preventDefault();
        }

        return () => (<div ref={itemRef} onMousemove={mousemoveFn} style={{ ...itemStyle.value, display: props.data.show ? 'block' : 'none' }} className={props.data.focused ? 'item focused' : 'item'} >
            {component.value.render({ ...renderProps.value })}
        </div>)
    }
})