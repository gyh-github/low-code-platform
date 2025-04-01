import { defineComponent, createVNode } from "vue";
import './index.less';
import PosterImg from '@/assets/images/poster-picture.png';
import { Modal, message } from 'ant-design-vue';
import { DeleteOutlined, FormOutlined, TeamOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
import { del } from '@/apis/project';
export default defineComponent({
    props: {
        info: {
            type: Object,
            default: () => {
                return {}
            }
        },
        type: {
            type: String,
            default: 'private'
        }
    },
    emits: ['callback'],
    setup({ info, type }, { emit }) {
        const router = useRouter();
        //修改
        const editFn = () => {
            console.log(info)
            router.push({
                path: '/workbenches',
                query: {
                    id: info?.id,
                    actionKey: 'edit'
                }
            })

        };
        //删除
        const delFn = () => {
            Modal.confirm({
                title: '温馨提示',
                icon: createVNode(ExclamationCircleOutlined),
                content: '即将删除该项目，您要不要再考虑考虑？',
                okText: '狠心删除',
                cancelText: '容我想想',
                onOk: async () => {
                    const res = await del({ id: info.id });
                    if (res) {
                        message.success('删除成功！')
                        emit('callback');
                    }
                },
                onCancel: () => {
                    message.success('您再考虑考虑~')
                }
            });
        };
        //应用
        const copyFn = async () => {
            router.push({
                path: '/workbenches',
                query: {
                    id: info?.id,
                    actionKey: 'copy'
                }
            })
        };
        return () => (<div className="item">
            <div className="item-title">{info?.title}</div>
            <img src={info?.thumbnail_url || PosterImg} alt="海报" className="item-poster" />
            <div className="item-action">
                {type === 'private' && <DeleteOutlined onClick={delFn} />}
                {type === 'private' && <FormOutlined onClick={editFn} />}
                {type != 'private' && <div>作者：{info?.author_name}</div>}
                {type != 'private' && <div><TeamOutlined onClick={copyFn} /> {info?.cited_num}</div>}

            </div>
        </div>)
    }
})