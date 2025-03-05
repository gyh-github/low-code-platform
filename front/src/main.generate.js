import { createApp } from 'vue'
import './style.less';
import 'animate.css';
import Preview from './views/preview/index.jsx';

const app = createApp(Preview);
    app.mount('#app');
