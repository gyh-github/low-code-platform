import { defineComponent, ref, reactive } from "vue";
import './index.less';
import { Steps, Step } from 'ant-design-vue';
import { addUser } from '@/apis/user';
import { message } from "ant-design-vue";
import Login from "../Login";

export default defineComponent({
    setup() {
        const steps = reactive(['登录信息', '基本信息', '注册结果']);
        const userInfo = reactive({
            user_name: '',
            user_password: '',
            user_phone: '',
            code: '',
            user_real_name: '',
            user_self_introduction: ''
        });
        const current = ref(0);
        const loginRef = ref(null);
        //确认注册
        const confirmFn = async () => {
            console.log(userInfo);
            if (!userInfo.user_name || !userInfo.user_password || !userInfo.user_phone) {
                message.warning('必填信息有遗漏，请确认是否填写，用户名、登录密码及用户手机号等信息~');
                return;
            }
            const res = await addUser(userInfo);
            if (res?.code === 'T0000') {
                message.success('注册成功！');
                current.value = 2;
            } else { 
                message.error('注册失败！');
            }
        };
        //下一步
        const nextFn = () => {
            current.value++;
        };
        // 返回上一步
        const callbackFn = () => {
            current.value--;
        };
        // 取消
        const cancelFn = () => {
            current.value = 0;
            for (const key in userInfo) {
                userInfo[key] = '';
            }
        };
        //去登录
        const loginFn = () => {
            loginRef.value.showLogin = true;
        };
        return () => (<div className="join">
            <div className="join-steps-content">
                <Steps v-model:current={current.value} label-placement="vertical">
                    {steps.map(item => (<Step title={item} />))}
                </Steps>
            </div>
            <div className="join-title">
                <strong>{steps[current.value]}</strong>
            </div>
            {
                current.value === 0 && <div className="join-content">
                    <div className="join-content-row">
                        <input type="text" v-model={userInfo.user_name} />
                        <span className={userInfo.user_name && 'active'}>用户名</span>
                    </div>
                    <div className="join-content-row">
                        <input type="text" v-model={userInfo.user_password} />
                        <span className={userInfo.user_password && 'active'}>登陆密码</span>
                    </div>
                    <div className="join-content-row">
                        <input type="text" v-model={userInfo.user_phone} />
                        <span className={userInfo.user_phone && 'active'}>手机号</span>
                    </div>
                    <div className="join-content-row">
                        <input type="text" v-model={userInfo.code} />
                        <span className={userInfo.code && 'active'}>验证码</span>
                        <button>获取验证码</button>
                    </div>
                </div>
            }
            {
                current.value === 1 && <div className="join-content">
                    <div className="join-content-row">
                        <input type="text" v-model={userInfo.user_real_name} />
                        <span className={userInfo.user_real_name && 'active'}>真实姓名</span>
                    </div>
                    <div className="join-content-row">
                        <input type="" v-model={userInfo.user_self_introduction} />
                        <span className={userInfo.user_self_introduction && 'active'}>个人简介</span>
                    </div>
                </div>
            }
            {
                current.value === 2 && <div className="join-result">注册成功</div>
            }
            <div className="join-btns">
                {
                    current.value <= 1 && <button onClick={() => confirmFn()}>确认注册</button>
                }
                {
                    current.value === 0 && <button onClick={() => nextFn()}>下一步</button>
                }
                {
                    current.value === 1 && <button onClick={() => callbackFn()}>返回上一步</button>
                }
                {
                    current.value != 2 && <button onClick={() => cancelFn()}>取消重置</button>
                }
                {
                    current.value === 2 && <button onClick={() => loginFn()}>去登录</button>
                }
            </div>
            <Login ref={loginRef} />
        </div>)
    }
})