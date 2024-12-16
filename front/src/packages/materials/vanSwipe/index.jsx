import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
const vanSwipe = {
    label: '轮播图',
    preview: () => <van-swipe width='60px' height='60px' style="width:60px;height:60px">
        {['http://localhost:8025/uploads/default-img-1.jpg', 'http://localhost:8025/uploads/default-img-2.jpg', 'http://localhost:8025/uploads/default-img-3.jpg'].map((item, index) =>
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
    key: "vanSwipe",
    attribute: {
        height: 150,
        width: 300,
        autoplay: 2000,
        swipes: ['http://localhost:8025/uploads/default-img-1.jpg', 'http://localhost:8025/uploads/default-img-2.jpg', 'http://localhost:8025/uploads/default-img-3.jpg'],
        'lazy-render': true,
        style: {
            height: 150,
            width: 300
        }
    }
};
register(vanSwipe);