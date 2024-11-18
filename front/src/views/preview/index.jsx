import { defineComponent, reactive } from "vue";
import useMaterialsStore from "../../packages/store/materials";
const flag = import.meta.env.VITE_MODE === 'generate';
import _ from 'lodash';

export default defineComponent({
    setup() {
        document.title = flag ? "H5" : "预览";
        const { componentMap } = useMaterialsStore();
        const _state = reactive({ container: {}, plates: [] });
        const mainStyle = reactive({
            width: '',
            height: '',
            background: '',
        });
        if (flag) {
            import('./../../generate-data.json').then(res => {
                const _def = JSON.parse(JSON.stringify(res.default));
                _state.container = _def.container;
                _state.plates = _def.plates;
                mainStyle.width = _state?.container.width + 'px';
                mainStyle.height = _state?.container.height + 'px';
                mainStyle.background = _state?.container.background;
            });
        } else {
            const _storage_state = JSON.parse(sessionStorage.getItem('state'));
            _state.container = _storage_state.container;
            _state.plates = _storage_state.plates;
            mainStyle.width = _state?.container.width + 'px';
            mainStyle.height = _state?.container.height + 'px';
            mainStyle.background = _state?.container.background;
        }
        const _componentMap = componentMap;
        const renderProps = (ele) => {
            const arr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
            let _props = _.cloneDeep(ele.attribute);
            if (_props.style) {
                _props.style.top = ele.top - 1000 + _state.container.height / 2;
                _props.style.left = ele.left - 1000 + _state.container.width / 2;
                for (let key in _props.style) {
                    _props.style[key] = arr.includes(key) ? _props.style[key] + 'px' : _props.style[key];
                }
            }
            return {
                ..._props
            }
        };
        return () => (
            <div style="overflow:auto;height:100vh;position:relative">
                <div style={mainStyle}>{
                    _state.plates.map(ele => (_componentMap[ele.key].render(renderProps(ele))))
                }</div>
            </div>
        )
    }
})