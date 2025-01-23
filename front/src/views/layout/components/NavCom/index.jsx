import { defineComponent, reactive,onMounted } from "vue";
import './index.less';
import { useRouter, useRoute } from "vue-router";
import {getUser } from '@/utils/sessionStor'
import Login from "../Login";
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
            user_name:''
        });
        //导航跳转
        const handleClickFn = (item) => {
            router.push({
                path: item.value
            })
        };
        onMounted(() => { 
            const userInfo = getUser();
            user.user_name = userInfo?.user_name;
        })

        return () => (
            <div className="navs">
                <div className="navs-content">
                    {
                         (user.user_name ? [...memberNav] : [...generalNavs]).map((item) => (
                            <div className={route.path === item.value ? 'active navs-content-item' : "navs-content-item"} onClick={() => handleClickFn(item)}>
                                <span>{item.label}</span>
                            </div>))
                    }
                </div>
                <Login />
            </div>)
    }
})