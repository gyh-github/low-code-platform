import { createApp } from 'vue'
import './style.less';
import 'animate.css';
import App from './App.vue';
import Preview from './views/preview/index.jsx';
import ClickOutside from './packages/directives/ClickOutside.js';
import { Button, Icon, Stepper, Row, Col, Empty, Uploader, Dialog, Field, Image as VanImage, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
import './packages/materials/index.js';
import pinia from './packages/store/index.js';
const flag = import.meta.env.VITE_MODE === 'generate';
const app = flag ? createApp(Preview) : createApp(App);
app.directive('ClickOutside', ClickOutside);
app.use(pinia);
app.use(Button).
    use(Icon).
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

