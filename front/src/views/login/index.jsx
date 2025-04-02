import { defineComponent, reactive, ref, onMounted } from "vue";
import './index.less';
import { message } from 'ant-design-vue';
import { parseInt } from "lodash";
import { login, getUserByToken } from "@/apis/user";
import { setUser, setToken, setRefreshToken, getUser } from '@/utils/sessionStor';
import { encryptFn } from '@/utils/crypt';
import LoginLeftImg from '@/assets/images/login-left-1.png';
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
    setup() {
        const userInfo = reactive({
            user_name: ''
        });
        const interval = ref(null);
        const times = ref(120);
        const code = ref('');
        const loginInfo = reactive({
            user_name: 'admin',
            user_password: 'admin@2025',
            code: ''
        })
        const redirectUrl = ref('');
        const router = useRouter();
        const route = useRoute();
        onMounted(() => {
            const _user = getUser();
            userInfo.user_name = _user?.user_name || ''
            redirectUrl.value = route.query?.redirectUrl || ''
        })

        //获取验证码
        const getCodeFn = () => {
            if (interval.value) return;
            interval.value = setInterval(() => {
                times.value--;
                if (times.value === 0) {
                    clearInterval(interval.value);
                    interval.value = null;
                    times.value = 120;
                }
            }, 1000);
            const _code = '' + (parseInt(Math.random() * 1000000) + 1000000);
            code.value = _code.substring(1, 7)
            message.success('验证码为：' + code.value);
        };
        //登录
        const loginFn = async () => {
            if (code.value && code.value != loginInfo.code) {
                message.error('验证码输入错误，请重新输入！' + code.value);
                return;
            }
            const params = { user_name: encryptFn(loginInfo.user_name), user_password: encryptFn(loginInfo.user_password) };
            const res = await login(params);
            if (res) {
                setToken(res?.accessToken);
                setRefreshToken(res?.refreshToken);
                const userInfo = await getUserByToken();
                setUser(userInfo)
                clearInterval(interval.value);
                interval.value = null;
                times.value = 120;
                router.push(redirectUrl.value || '/home');
            }

        };
        //取消
        const cancelFn = () => {
            clearInterval(interval.value);
            interval.value = null;
            times.value = 120;
        };
        //注册
        const registerFn = () => {
            router.push('/join');
        }

        return () => (
            <div className="login">
                <div className="login-left" style={{ 'background': `url(${LoginLeftImg}) no-repeat center` }}></div>
                <div className="login-right">
                    <div className="content">
                        <div className="title">
                            <span>登录账号</span>
                        </div>
                        <div className="row">
                            <label htmlFor="user_name">用户名 </label>
                            <input type="text" id="user_name" placeholder="请输入用户名或手机号" v-model={loginInfo.user_name} />
                        </div>
                        <div className="row">
                            <label htmlFor="user_password">密码 </label>
                            <input type="password" id="user_password" placeholder="请输入用户密码" v-model={loginInfo.user_password} />
                        </div>
                        <div className="row">
                            <label htmlFor="code">验证码 </label>
                            <input type="text" id="code" placeholder="请输入验证码" v-model={loginInfo.code} />
                            <button className="get_code" disabled={times.value != 120} onClick={() => getCodeFn()}>{times.value != 120 ? '有效期剩余：' + times.value + 's' : '获取验证码'}</button>
                        </div>
                        <div className="row btns">
                            <button className="backg" onClick={() => loginFn()}>登录</button>
                            <button onClick={() => registerFn()}>注册</button>
                            <button onClick={() => cancelFn()}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})