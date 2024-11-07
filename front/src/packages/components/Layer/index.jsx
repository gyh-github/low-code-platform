import { defineComponent, inject, ref } from 'vue';
import './index.less';
import useDropmenu from '@/packages/utils/useDropmenu';
export default defineComponent({
    props: ['modelValue'],
    setup(props) {
        const componentMap = inject(['componentMap']);

        const { contextmenuFn } = useDropmenu(props.modelValue);


        const itemClickFn = (item) => {
            props.modelValue.value = props.modelValue.value.map(ele => {
                ele.focused = ele.id === item.id;
                return ele;
            })
        }

        return () => (<div className='layer'>
            {props.modelValue.value?.map(item => (<div v-click-outside="dropmenu"
                className={item.focused ? 'layer-item active' : 'layer-item'}
                onClick={() => itemClickFn(item)} onContextmenu={(e) => contextmenuFn(e, item)} >
                <van-row justify="space-between" align="center">
                    <van-col span={18}>
                        {componentMap[item.key].preview()}
                    </van-col>
                    <van-col span={6}>
                        <van-icon onClick={() => (item.show = !item.show)} name={item.show ? "eye-o" : "closed-eye"} />
                    </van-col>
                </van-row>
            </div>))}
        </div>)
    }
})