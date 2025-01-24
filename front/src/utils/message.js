import { message } from 'ant-design-vue';

const msg = {
    'user_real_name':'真实姓名修改成功！',
    'user_name':'昵称修改成功！',
    'user_phone':'手机号修改成功！',
    'user_password':'登录密码修改成功！',
    'user_self_introduction':'自我介绍修改成功！',
};

export default (key) => { 
    msg[key] && message.success(msg[key]);
}