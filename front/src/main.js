import { createApp } from 'vue'
import './style.less'
import App from './App.vue';
import Preview from './views/preview/index.jsx';
import DropMenu from './packages/directives/DropMenu.js';
import { Button, Icon, Stepper, Row, Col, Empty, Uploader, Dialog } from 'vant';
import 'vant/lib/index.css';
console.log(import.meta.env.VITE_MODE)
const flag = import.meta.env.VITE_MODE === 'generate';
const app = flag ? createApp(Preview) : createApp(App);
app.directive('drop-menu', DropMenu)
app.use(Button).
    use(Icon).
    use(Stepper).
    use(Row).
    use(Col).
    use(Empty).
    use(Uploader).
    use(Dialog).
    mount('#app')

