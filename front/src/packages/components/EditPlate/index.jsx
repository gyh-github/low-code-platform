import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import './index.less';
import _ from 'lodash';
import useMaterialsStore from "@/packages/store/materials";

export default defineComponent({
    props: ['data'],
    setup(props) {
        const itemRef = ref(null);
        const curArea = ref(null);
        const { componentMap } = useMaterialsStore();
        const component = ref(componentMap[props.data.key]);
        const itemStyle = computed(() => ({
            top: props.data.top + 'px',
            left: props.data.left + 'px',
            width: props.data.attribute.style?.width + 'px',
            height: props.data.attribute.style?.height + 'px',
            zIndex: props.data.zIndex,
            position: 'absolute'
        }))
        const renderProps = computed(() => {
            const arr = ['width', 'height', 'top', 'left', 'bottom', 'right', 'font-size'];
            let _attribute = _.cloneDeep(props.data.attribute);
            for (let key in _attribute.style) {
                _attribute.style[key] = arr.includes(key) ? _attribute.style[key] + 'px' : _attribute.style[key];
            }
            component.value = componentMap[props.data.key];
            return {
                ..._attribute
            }
        });
        /**
         * 修改元素宽高相关逻辑 - start
        */
        const areaList = ['top-left', 'top-center', 'top-right', 'right-center', 'bottom-right',
            'bottom-center', 'bottom-left', 'left-center'
        ]
        const sizeMouseDownFn = (e) => {
            console.log(e.target)
            e.stopPropagation();
            curArea.value = e.target.dataset['key'];
            console.log(e.target.dataset['key'])
            if (areaList.includes(curArea.value)) {
                window.addEventListener('mousemove', sizeMouseMoveFn);
            }
        };
        const sizeMouseMoveFn = (e) => {
            e.stopPropagation();
            switch (curArea.value) {
                case 'top-left':
                    props.data.top = props.data.top + e.movementY;
                    props.data.left = props.data.left + e.movementX;
                    props.data.attribute.style.width = props.data.attribute.style?.width - e.movementX;
                    props.data.attribute.style.height = props.data.attribute.style?.height - e.movementY;
                    break;
                case 'top-center':
                    props.data.top = props.data.top + e.movementY;
                    props.data.attribute.style.height = props.data.attribute.style?.height - e.movementY;
                    break;
                case 'top-right':
                    props.data.top = props.data.top + e.movementY;
                    props.data.attribute.style.width = props.data.attribute.style?.width + e.movementX;
                    props.data.attribute.style.height = props.data.attribute.style?.height - e.movementY;
                    break;
                case 'right-center':
                    props.data.attribute.style.width = props.data.attribute.style?.width + e.movementX;
                    break;
                case 'bottom-right':
                    props.data.attribute.style.width = props.data.attribute.style?.width + e.movementX;
                    props.data.attribute.style.height = props.data.attribute.style?.height + e.movementY;
                    break;
                case 'bottom-center':
                    props.data.attribute.style.height = props.data.attribute.style?.height + e.movementY;
                    break;
                case 'bottom-left':
                    props.data.left = props.data.left + e.movementX;
                    props.data.attribute.style.width = props.data.attribute.style?.width - e.movementX;
                    props.data.attribute.style.height = props.data.attribute.style?.height + e.movementY;
                    break;
                case 'left-center':
                    props.data.left = props.data.left + e.movementX;
                    props.data.attribute.style.width = props.data.attribute.style?.width - e.movementX;
                    break;
                default:
                    return;
            }

        };
        const sizeMouseUpFn = (e) => {
            if (curArea.value) {
                window.removeEventListener('mousemove', sizeMouseMoveFn);
                curArea.value = '';
            }
        };
        /**
         * 修改元素宽高相关逻辑 - end
        */

        onMounted(() => {
            const { offsetWidth, offsetHeight } = itemRef.value;
            props.data.top = props.data.top - offsetHeight / 2;
            props.data.left = props.data.left - offsetWidth / 2;
            window.addEventListener('mouseup', sizeMouseUpFn);
        })
        onUnmounted(() => {
            window.removeEventListener('mouseup', sizeMouseUpFn);
        })

        const mousemoveFn = (e) => {
            e.preventDefault();
        }

        return () => (<div ref={itemRef} onMousemove={mousemoveFn} style={{ ...itemStyle.value, display: props.data.show ? 'block' : 'none' }} className={props.data.focused ? 'item focused' : 'item'} >
            {component.value.render({ ...renderProps.value })}
            {props.data.focused && areaList.map(item => <div className="area-item" data-key={item}
                onMousedown={sizeMouseDownFn}
            >
            </div>)}
        </div>)
    }
})