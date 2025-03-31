import { defineComponent } from "vue";
import './index.less';
import PosterImg from '@/assets/images/poster-picture.png';
import { DeleteOutlined, FormOutlined, TeamOutlined } from '@ant-design/icons-vue';
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
                    id: info?.id
                }
            })

        };
        //删除
        const delFn = async () => {
            console.log(info)
            const res = await del({ id: info.id });
            if (res) {
                emit('callback');
            }
        };
        //应用
        const copyFn = async () => {
            console.log(info)
            router.push({
                path: '/workbenches',
                query: {
                    id: info?.id
                }
            })
        };
        return () => (<div className="item">
            <div className="item-title">{info?.title}</div>
            <img src={info?.thumbnail_url || PosterImg} alt="海报" className="item-poster" />
            <div className="item-action">
                {type === 'private' && <DeleteOutlined onClick={delFn} />}
                {type === 'private' && <FormOutlined onClick={editFn} />}
                {type != 'private' && <TeamOutlined onClick={copyFn} />}

            </div>
        </div>)
    }
})