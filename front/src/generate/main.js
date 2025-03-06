import { createApp } from 'vue'
import './materialsIndex.js';
import pinia from '@/packages/store/index.js';
import App from './index.jsx';

const app = createApp(App);
app.use(pinia);
    app.mount('#app');
