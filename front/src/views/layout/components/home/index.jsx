import { defineComponent, onMounted, reactive, ref } from "vue";
import './index.less';
import HomeItem from './components/Item';
import homeImg from '@/assets/images/home-img-3.png';
import { popular, privatePage } from '@/apis/project';
import { getUser } from '@/utils/sessionStor';

export default defineComponent({
    setup() {
        const { user_id } = getUser();
        const popularData = ref([]);
        const privateData = ref([]);
        const params = reactive({
            author_id: user_id,
            pageCurrent: 1,
            pageSize: 12
        });
        //获取热门项目
        const getPopular = async () => {
            popularData.value = [];
            const res = await popular();
            popularData.value = res;
        };
        //获取私有项目
        const getPrivate = async () => {
            privateData.value = [];
            const res = await privatePage({ ...params });
            if (res) {
                privateData.value = res;
            }
        };
        //初始化
        const initFn = () => {
            getPopular();
            if (user_id) {
                getPrivate();
            }
        };

        onMounted(() => {
            initFn();
        })


        return () => (<div className="home">
            <div className="home-search" style={{ background: `url(${homeImg}) no-repeat center` }}>
                <div className="home-search-content" >
                    <input type="text" />
                    <button>搜</button>
                </div>
            </div>
            <div className="home-row">
                <div className="home-row-title">热门模板</div>
                <div className="home-row-content">
                    {popularData.value?.map((item) =>
                        (<div className="home-row-content-item"><HomeItem info={item} type='popular' /></div>))}
                </div>
            </div>
            {
                privateData.value?.length > 0 &&
                <div className="home-row">
                    <div className="home-row-title">我的项目</div>
                    <div className="home-row-content">
                        {privateData.value?.map((item) => (<div className="home-row-content-item"><HomeItem info={item} type='private' onCallback={initFn} /></div>))}
                    </div>
                </div>
            }
        </div>)
    }
})