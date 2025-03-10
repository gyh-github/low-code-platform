import { defineComponent, reactive, onMounted, onUnmounted, ref } from "vue";
import './index.less';
import { useRouter, useRoute } from "vue-router";
import { getUser, clearSessStor } from '@/utils/sessionStor'
import profilePicture from '@/assets/images/profile-picture.jpg';
import { debounce } from 'lodash';
import { message } from 'ant-design-vue';
const generalNavs = [
    {
        label: '源平台',
        value: '/home'
    },
    {
        label: '工作台',
        value: '/container'
    },
    // {
    //     label: '发现',
    //     value: '/materials'
    // },
    // {
    //     label: '关于',
    //     value: '/about'
    // },
    // {
    //     label: '加入我们',
    //     value: '/join'
    // },
];

const memberNav = [
    {
        label: '源平台',
        value: '/home'
    },
    {
        label: '工作台',
        value: '/container'
    },
    // {
    //     label: '发现',
    //     value: '/materials'
    // },
    // {
    //     label: '关于',
    //     value: '/about'
    // },
    // {
    //     label: '个人中心',
    //     value: '/personalCenter'
    // },
]

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
            screenWidth.value = e.target.innerWidth;
        };
        //登陆或退出
        const userClick = () => {
            if (user.user_name) {
                clearSessStor();
                location.reload();
            } else {
                router.push({
                    path: '/login',
                    query: {
                        redirectUrl: route.path
                    }
                })
            }
        };
        //创建模板
        const createTemplateFn = () => {
            if (!user.user_name) {
                message.warning('请先登陆，谢谢！');
                return;
            }
            router.push('/workbenches');
        }
        onMounted(() => {
            const userInfo = getUser();
            user.user_name = userInfo?.user_name;
            screenWidth.value = window.innerWidth;
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
                            <van-icon name="wap-nav" onClick={() => openDrop.value = !openDrop.value} />
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
                <div className="navs-user">
                    <button onClick={() => createTemplateFn()}>创建模板</button>
                    <button onClick={() => userClick()} className="navs-user-info">
                        {user.user_name && <img src={user?.photo || profilePicture} alt="" />}
                        <span>{user.user_name || '去登陆'}</span>
                    </button>
                </div>
            </div>)
    }
})