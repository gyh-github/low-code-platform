import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { Button, Icon, Stepper } from 'vant'
import 'vant/lib/index.css';

createApp(App).
    use(Button).use(Icon).use(Stepper).mount('#app')
