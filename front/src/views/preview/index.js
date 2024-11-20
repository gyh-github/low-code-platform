import { createApp } from 'vue'
import './style.less';
import 'animate.css';
import Preview from './views/preview/index.jsx';
import { Button, Icon, Stepper, Row, Col, Empty, Uploader, Dialog, Field, Image as VanImage, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
const app = createApp(Preview);
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


