import { createApp } from 'vue'
import './style.less';
import 'animate.css';
import App from './App.vue';
import Preview from './views/preview/index.jsx';
import ClickOutside from './packages/directives/ClickOutside.js';
import { Icon, Stepper, Row, Col, Empty, Uploader, Dialog, Field, Image as VanImage, Swipe, SwipeItem } from 'vant';
import 'ant-design-vue/dist/reset.css';
import 'vant/lib/index.css';
import './packages/materials/index.js';
import pinia from './packages/store/index.js';
import router from '@/router';
import ColorPicker from 'colorpicker-v3'  // 注册组件
import 'colorpicker-v3/style.css' // 引入样式文件
const flag = import.meta.env.VITE_MODE === 'generate';
const app = flag ? createApp(Preview) : createApp(App);
app.directive('ClickOutside', ClickOutside);
app.use(pinia);
app.use(router);
app.use(ColorPicker);
app.use(Icon).
    use(Stepper).
    use(Row).
    use(Col).
    use(Empty).
    use(Uploader).
    use(Dialog).
    use(Field).
    use(VanImage).
    use(Swipe).
    use(SwipeItem).
    mount('#app')

