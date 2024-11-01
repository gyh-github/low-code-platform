import { createApp } from 'vue'
import Main from './index.jsx'
import vant from 'vant'
import 'vant/lib/index.css';

createApp(Main).
    use(vant).
    mount('#main')