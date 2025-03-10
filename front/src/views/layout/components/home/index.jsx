import { defineComponent, onMounted, ref } from "vue";
import './index.less';
import HomeItem from './components/Item';
import homeImg from '@/assets/images/home-img-3.png';

export default defineComponent({
    setup() {
        const popularData = ref([
            { title: 'xxx', id: 'xxx-0', poster: '' },
            { title: 'xxx1', id: 'xxx-1', poster: '' },
            { title: 'xxx2', id: 'xxx-2', poster: '' },
            { title: 'xxx3', id: 'xxx-3', poster: '' },
            { title: 'xxx4', id: 'xxx-4', poster: '' },
        ]);
        const privateData = ref([]);
        onMounted(() => {
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
                    {popularData.value.map((item) => (<div className="home-row-content-item"><HomeItem info={item} /></div>))}
                </div>
            </div>
        </div>)
    }
})