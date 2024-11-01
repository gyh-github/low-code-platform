import { defineComponent, computed } from "vue";
import plateConfig from '@/packages/utils/componentConfig.jsx';
import _ from 'lodash'

export default defineComponent({
    setup() {
        document.title = "预览";
        const { componentMap } = plateConfig();
        // const _state = JSON.parse(sessionStorage.getItem('state'))
        const _state = JSON.parse(JSON.stringify({
            "container": {
                "height": 916,
                "width": 400,
                "background": "#333"
            },
            "plates": [
                {
                    "top": 825,
                    "left": 798,
                    "zIndex": 2,
                    "alignCenter": true,
                    "key": "button",
                    "id": "1730440511086",
                    "focused": false,
                    "attribute": {
                        "style": {
                            "width": 100,
                            "height": 30,
                            "background": "bule",
                            "color": "#fff",
                            "position": "absolute"
                        },
                        "innerText": "按钮"
                    }
                },
                {
                    "top": 934,
                    "left": 900,
                    "zIndex": 2,
                    "alignCenter": true,
                    "key": "input",
                    "id": "1730440511962",
                    "focused": false,
                    "attribute": {
                        "style": {
                            "width": 100,
                            "height": 30,
                            "color": "#333",
                            "position": "absolute"
                        }
                    }
                },
                {
                    "top": 998,
                    "left": 933,
                    "zIndex": 2,
                    "alignCenter": true,
                    "key": "img",
                    "id": "1730440513645",
                    "focused": false,
                    "attribute": {
                        "style": {
                            "width": 150,
                            "height": 150,
                            "border": "thin solid #dcdcdc",
                            "position": "absolute"
                        },
                        "alt": "图片",
                        "src": "/src/packages/static/imgs/default.jpg"
                    }
                },
                {
                    "top": 1185,
                    "left": 904,
                    "zIndex": 2,
                    "alignCenter": true,
                    "key": "vant-button",
                    "id": "1730440642367",
                    "focused": false,
                    "attribute": {
                        "style": {
                            "width": 100,
                            "height": 50,
                            "border": "thin solid #dcdcdc",
                            "position": "absolute"
                        },
                        "innerText": "vant按钮"
                    }
                }
            ]
        }));

        const _componentMap = componentMap;
        const mainStyle = computed(() => {
            return {
                width: _state.container.width + 'px',
                height: _state.container.height + 'px',
                background: _state.container.background,
            }
        })
        const renderProps = (ele) => {
            const arr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
            let _props = _.cloneDeep(ele.attribute);
            _props.style.top = ele.top - 1000 + _state.container.height / 2;
            _props.style.left = ele.left - 1000 + _state.container.width / 2;
            for (let key in _props.style) {
                _props.style[key] = arr.includes(key) ? _props.style[key] + 'px' : _props.style[key];
            }
            return {
                ..._props
            }
        };
        return () => (
            <div style="overflow:auto;height:100vh;position:relative">
                <div style={mainStyle.value}>{
                    _state.plates.map(ele => (_componentMap[ele.key].render(renderProps(ele))))
                }</div>
            </div>
        )
    }
})