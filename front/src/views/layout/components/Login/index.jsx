import { defineComponent, ref } from "vue";
import './index.less';

export default defineComponent({
    setup() {
        const showLogin = ref(false);
        const flag = ref('login');
        const interval = ref(null);
        const times = ref(120);

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
                                <input type="text" id="username" placeholder="请输入用户名或手机号" />
                            </div>
                            <div className="row">
                                <label htmlFor="username">密码 </label>
                                <input type="text" id="username" placeholder="请输入用户密码" />
                            </div>
                            <div className="row">
                                <label htmlFor="username">验证码 </label>
                                <input type="text" id="username" placeholder="请输入验证码" />
                                <button className="get_code" disabled={times.value != 120} onClick={() => getCodeFn()}>{times.value != 120 ? '有效期剩余：' + times.value + 's' : '获取验证码'}</button>
                            </div>
                            <div className="row btns">
                                {flag.value === 'login' && <button className="backg" >登录</button>}
                                {flag.value === 'register' && <button className="backg">确定</button>}
                                <button onClick={() => showLogin.value = false}>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            }</>)
    }
})