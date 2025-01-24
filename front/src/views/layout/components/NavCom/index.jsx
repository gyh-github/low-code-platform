import { defineComponent, reactive, onMounted, onUnmounted, ref } from "vue";
import './index.less';
import { useRouter, useRoute } from "vue-router";
import { getUser } from '@/utils/sessionStor'
import Login from "../Login";
import { debounce } from 'lodash';
const generalNavs = [
    {
        label: '首页',
        value: '/home'
    },
    {
        label: '发现',
        value: '/materials'
    },
    {
        label: '关于',
        value: '/about'
    },
    {
        label: '加入我们',
        value: '/join'
    },
];

const memberNav = [
    {
        label: '首页',
        value: '/home'
    },
    {
        label: '发现',
        value: '/materials'
    },
    {
        label: '工作台',
        value: '/container'
    },
    {
        label: '关于',
        value: '/about'
    },
    {
        label: '个人中心',
        value: '/personalCenter'
    },]

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const user = reactive({
            user_name: ''
        });
        const screenWidth = ref(0);
        const openDrop = ref(false);
        //导航跳转
        const handleClickFn = (item) => {
            openDrop.value = false;
            router.push({
                path: item.value
            })
        };
        //媒体查询
        const screenWidthChange = (e) => {
            console.log(e.target.innerWidth)
            screenWidth.value = e.target.innerWidth;
        };
        onMounted(() => {
            const userInfo = getUser();
            user.user_name = userInfo?.user_name;
            window.addEventListener('resize', debounce(screenWidthChange, 150));
        });
        onUnmounted(() => {
            window.removeEventListener('resize', debounce(screenWidthChange, 150));
        })

        return () => (
            <div className="navs">
                {
                    screenWidth.value - 600 < 0 ?
                        <div className="navs-drop">
                            <van-icon name="wap-nav" onClick={ ()=>openDrop.value = !openDrop.value} />
                            {
                                openDrop.value &&
                                <div className="navs-drop-content">
                                    {
                                        (user.user_name ? [...memberNav] : [...generalNavs]).map((item) => (
                                            <div className={route.path === item.value ? 'active navs-drop-content-item' : "navs-drop-content-item"} onClick={() => handleClickFn(item)}>
                                                <span>{item.label}</span>
                                            </div>))
                                    }
                                </div>
                            }
                        </div> :
                        <div className="navs-content">
                            {
                                (user.user_name ? [...memberNav] : [...generalNavs]).map((item) => (
                                    <div className={route.path === item.value ? 'active navs-content-item' : "navs-content-item"} onClick={() => handleClickFn(item)}>
                                        <span>{item.label}</span>
                                    </div>))
                            }
                        </div>
                }
                <Login />
            </div>)
    }
})