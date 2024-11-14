import defaultImg1 from './images/default-img-1.jpg';
import defaultImg2 from './images/default-img-2.jpg';
import defaultImg3 from './images/default-img-3.jpg';
import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
const vanSwipe = {
    label: '轮播图',
    preview: () => <van-swipe width='60px' height='60px' style="width:60px;height:60px">
        {[defaultImg1, defaultImg2, defaultImg3].map((item, index) =>
        (<van-swipe-item key={'item_' + index}>
            <div style={{ background: `url(${item}) no-repeat center`, backgroundSize: 'cover', height: '100%', width: '100%' }} ></div>
        </van-swipe-item>))}
    </van-swipe>,
    render: (props) =>
        <van-swipe {...props}>
            {props?.swipes.map((swipe, index) => (<van-swipe-item key={"swipe_" + index}>
                <div style={{ background: `url(${swipe}) no-repeat center`, backgroundSize: 'cover', height: props.height + 'px', width: props.width + 'px' }}></div>
            </van-swipe-item>))}
        </van-swipe>,
    key: "van-swipe",
    attribute: {
        height: 150,
        width: 300,
        autoplay: 2000,
        swipes: [defaultImg1, defaultImg2, defaultImg3],
        'lazy-render': true,
        style: {
            height: 150,
            width: 300
        }
    }
};
register(vanSwipe);