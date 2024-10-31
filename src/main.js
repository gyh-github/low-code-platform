import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { Button, Icon, Stepper, Row, Col, Empty, Uploader } from 'vant'
import 'vant/lib/index.css';

createApp(App).
    use(Button).
    use(Icon).
    use(Stepper).
    use(Row).
    use(Col).
    use(Empty).
    use(Uploader).
    mount('#app')
