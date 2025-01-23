import { defineComponent, onMounted, reactive, ref } from "vue";
import './index.less';
import { getUser,setUser  } from '@/utils/sessionStor';
import { editUser,getUserById } from "@/apis/user";
import { uploadFile} from '@/apis/common';
import perfilePicture from '@/assets/images/profile-picture.jpg';

export default defineComponent({
    setup() {
        const userInfo = reactive({
            user_id: "",
            user_name: "",
            user_phone: "",
            user_photo: null,
            user_real_name: null,
            user_role: "normal",
            user_self_introduction: ''
        });
        const editKey = ref('');

        //点击上传
        const handleUploadFn = () => {
            const _input = document.createElement('input');
            _input.type = 'file';
            _input.click();
            _input.onchange = handleChangeFn;
        }
        //获取文件
        const handleChangeFn = async (e) => {
            const file = e.target.files[0];
            var formData = new FormData();
            formData.append('file', file);
            const uploadRes = await uploadFile(formData);
            await editUser({
                user_id: userInfo.user_id,
                column_key: 'user_photo',
                user_photo: uploadRes || ''
            })
            const userRes = await getUserById(userInfo.user_id);
            setUser(userRes)

        }
        //inputChange
        const inputChangeFn = (e, key) => {
            userInfo[key] = e.target.value;
        }
        //修改信息
        const editFn = (key) => {
            editKey.value = key;
        }
        //确认修改信息
        const confirmEditFn = async (key) => {
            editKey.value = '';
            await editUser({
                user_id: userInfo.user_id,
                column_key: key,
                [key]: userInfo[key]
            })
            const userRes = await getUserById(userInfo.user_id);
                setUser(userRes)
        }
        onMounted(() => {
            const _user = getUser();
            for (let key in _user) {
                userInfo[key] = _user[key]
            }
        })

        return () => (<div className="personal">
            <van-row>
                <van-col span={24} justify="center">
                    <div className="photo-content item">
                        <img src={userInfo?.['user_photo'] || perfilePicture} alt="头像" className="photo" />
                        <p>
                            <span className="btn" onClick={() => handleUploadFn()}>点击修改</span><br />
                            <span className="tip">支持jpg,大小2M以内</span>
                        </p>
                    </div>
                </van-col>
            </van-row>
            <van-row gutter={20}>
                <van-col span={12}>
                    <div className="item">
                        <span className="label">昵称</span>
                        {
                            editKey.value === 'user_name' ?
                                <>
                                    <input type="text" value={userInfo?.['user_name']} onChange={(e) => inputChangeFn(e, 'user_name')} />
                                    <span className="btn" onClick={() => confirmEditFn('user_name')}>确认</span>
                                </>
                                :
                                <>
                                    <span className="value">{userInfo?.['user_name']}</span>
                                    <span className="btn" onClick={() => editFn('user_name')}>修改</span>
                                </>
                        }
                    </div>
                </van-col>
                <van-col span={12}>
                    <div className="item">
                        <span className="label">姓名</span>
                        {
                            editKey.value === 'user_real_name' ?
                                <>
                                    <input type="text" value={userInfo?.['user_real_name']} onChange={(e) => inputChangeFn(e, 'user_real_name')} />
                                    <span className="btn" onClick={() => confirmEditFn('user_real_name')}>确认</span>
                                </>
                                :
                                <>
                                    <span className="value">{userInfo?.['user_real_name'] || '--'}</span>
                                    <span className="btn" onClick={() => editFn('user_real_name')}>修改</span>
                                </>
                        }
                    </div>
                </van-col>
                <van-col span={12}>
                    <div className="item">
                        <span className="label">手机号</span>
                        {
                            editKey.value === 'user_phone' ?
                                <>
                                    <input type="text" value={userInfo?.['user_phone']} onChange={(e) => inputChangeFn(e, 'user_phone')} />
                                    <span className="btn" onClick={() => confirmEditFn('user_phone')}>确认</span>
                                </>
                                :
                                <>
                                    <span className="value">{userInfo?.['user_phone'] || '--'}</span>
                                    <span className="btn" onClick={() => editFn('user_phone')}>修改</span>
                                </>
                        }
                    </div>
                </van-col>
                <van-col span={12}>
                    <div className="item">
                        <span className="label">登录密码</span>
                        {
                            editKey.value === 'user_password' ?
                                <>
                                    <input type="text" value={userInfo?.['user_password']} onChange={(e) => inputChangeFn(e, 'user_password')} />
                                    <span className="btn" onClick={() => confirmEditFn('user_password')}>确认</span>
                                </>
                                :
                                <>
                                    <span className="value">{'******'}</span>
                                    <span className="btn" onClick={() => editFn('user_password')}>修改</span>
                                </>
                        }
                    </div>
                </van-col>
                <van-col span={24}>
                    <div className="item" style="align-items: baseline;">
                        <span className="label">自我介绍</span>
                        <textarea rows={10} cols={50} value={userInfo?.['user_self_introduction']} onChange={(e) => inputChangeFn(e, 'user_self_introduction')}></textarea>
                        {
                            editKey.value === 'user_self_introduction' ?
                                <span className="btn" onClick={() => confirmEditFn('user_self_introduction')}>确认</span> :
                                <span className="btn" onClick={() => editFn('user_self_introduction')}>修改</span>
                        }
                    </div>
                </van-col>
            </van-row>
        </div>)
    }
})