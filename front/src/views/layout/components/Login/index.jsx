import { defineComponent, reactive, ref } from "vue";
import './index.less';
import { message } from 'ant-design-vue';
import { parseInt } from "lodash";
import { login } from "@/apis/user";

export default defineComponent({
    setup(_, { expose }) {
        const showLogin = ref(false);
        const flag = ref('login');
        const interval = ref(null);
        const times = ref(120);
        const code = ref('');
        const loginInfo = reactive({
            username: 'test1',
            password: 'test',
            code: ''
        })
        expose({
            showLogin
        });

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
            if (code.value != loginInfo.code) {
                message.error('验证码输入错误，请重新输入！' + code.value);
                return;
            }
            const params = { user_name: loginInfo.username, user_password: loginInfo.password };
            const res = await login(params);
            sessionStorage.setItem('accessToken', res?.accessToken);
            sessionStorage.setItem('refreshToken', res?.refreshToken);
            clearInterval(interval.value);
            interval.value = null;
            times.value = 120;
            showLogin.value = false;
        };
        //取消
        const cancelFn = () => {
            showLogin.value = false;
            clearInterval(interval.value);
            interval.value = null;
            times.value = 120;
        };

        return () => (<>
            <button className="btn" onClick={() => (showLogin.value = true)}>登录 / 注册</button>
            {
                showLogin.value && <div className="login">
                    <div className="login-content animate__animated animate__zoomInDown">
                        <div className="title">
                            <span className={flag.value === 'login' && 'active'} onClick={() => (flag.value = 'login')}>登录账号 </span> |
                            <span className={flag.value === 'register' && 'active'} onClick={() => (flag.value = 'register')}> 账号注册</span>
                        </div>
                        <div className="content">
                            <div className="row">
                                <label htmlFor="username">用户名 </label>
                                <input type="text" id="username" placeholder="请输入用户名或手机号" v-model={loginInfo.username} />
                            </div>
                            <div className="row">
                                <label htmlFor="username">密码 </label>
                                <input type="text" id="username" placeholder="请输入用户密码" v-model={loginInfo.password} />
                            </div>
                            <div className="row">
                                <label htmlFor="username">验证码 </label>
                                <input type="text" id="username" placeholder="请输入验证码" v-model={loginInfo.code} />
                                <button className="get_code" disabled={times.value != 120} onClick={() => getCodeFn()}>{times.value != 120 ? '有效期剩余：' + times.value + 's' : '获取验证码'}</button>
                            </div>
                            <div className="row btns">
                                {flag.value === 'login' && <button className="backg" onClick={() => loginFn()}>登录</button>}
                                {flag.value === 'register' && <button className="backg">确定</button>}
                                <button onClick={() => cancelFn()}>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            }</>)
    }
})