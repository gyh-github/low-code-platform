import plateConfig from '@/packages/utils/plateConfig.jsx';
import defaultImg from '@/packages/static/imgs/default.jpg';
import { provide } from 'vue';
export default () => {
    const { register, componentList } = plateConfig();

    register({
        label: '轮播图',
        preview: () => <van-swipe width='60px' height='60px' style="width:60px;height:60px">
            {[defaultImg, defaultImg, defaultImg].map((item, index) =>
            (<van-swipe-item key={'item_' + index}>
                <img src={item} alt="" style="height:100%;width:100%" />
            </van-swipe-item>))}
        </van-swipe>,
        render: (props) =>
            <van-swipe {...props}>
                {props?.swipes.map((swipe, index) => (<van-swipe-item key={"swipe_" + index}>
                    <img src={swipe} style="height:100px;width:100px" />
                </van-swipe-item>))}
            </van-swipe>,
        key: "van-swipe",
        attribute: {
            height: 100,
            width: 100,
            autoplay: 1000,
            swipes: [defaultImg, defaultImg, defaultImg],
            'lazy-render': true,
            style: {
                height: 100,
                width: 100
            }
        }
    });
    console.log('注册了', componentList)
    provide('componentList', componentList)

}