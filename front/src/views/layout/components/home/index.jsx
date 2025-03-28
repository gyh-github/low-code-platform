import { defineComponent, onMounted, ref } from "vue";
import './index.less';
import HomeItem from './components/Item';
import homeImg from '@/assets/images/home-img-3.png';
import { all } from '@/apis/project';

export default defineComponent({
    setup() {
        const popularData = ref([]);
        const privateData = ref([]);
        //获取所有项目
        const getAllProject = async () => {
            const res = await all();
            popularData.value = res;
        }
        onMounted(() => {
            getAllProject();
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
                    {popularData.value?.map((item) => (<div className="home-row-content-item"><HomeItem info={item} /></div>))}
                </div>
            </div>
        </div>)
    }
})