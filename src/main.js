import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import Preview from './views/preview/index.jsx'
import { Button, Icon, Stepper, Row, Col, Empty, Uploader, Dialog } from 'vant'
import 'vant/lib/index.css';
const flag = false;
if (flag) {
    createApp(Preview).
        use(Button).
        use(Icon).
        use(Stepper).
        use(Row).
        use(Col).
        use(Empty).
        use(Uploader).
        use(Dialog).
        mount('#main')
} else {

    createApp(App).
        use(Button).
        use(Icon).
        use(Stepper).
        use(Row).
        use(Col).
        use(Empty).
        use(Uploader).
        use(Dialog).
        mount('#app')
}

