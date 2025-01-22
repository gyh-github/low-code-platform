import { defineComponent, reactive,onMounted } from "vue";
import './index.less';
import { useRouter, useRoute } from "vue-router";
import {getUser } from '@/utils/sessionStor'
import Login from "../Login";
const navs = [
    {
        label: '首页',
        value: '/home'
    },
    {
        label: '发现',
        value: '/find'
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
        label: '加入我们',
        value: '/join'
    },
    {
        label: '物料管理',
        value: '/materials'
    },
];

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const user = reactive({
            role:''
        });
        //导航跳转
        const handleClickFn = (item) => {
            router.push({
                path: item.value
            })
        };
        onMounted(() => { 
            const userInfo = getUser();
            user.role = userInfo?.userRole;
        })

        return () => (
            <div className="navs">
                <div className="navs-content">
                    {
                         (user.role ==='admin' ? [...navs] : navs.filter(item => item.value != '/materials')).map((item) => (
                            <div className={route.path === item.value ? 'active navs-content-item' : "navs-content-item"} onClick={() => handleClickFn(item)}>
                                <span>{item.label}</span>
                            </div>))
                    }
                </div>
                <Login />
            </div>)
    }
})