import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
register({
    label: '按钮',
    preview: () => <van-button>按钮</van-button>,
    render: (props) =>
        <van-button {...props}>按钮</van-button>,
    key: "vanButton",
    attribute: {
        style: {
            height: 50,
            width: 100
        }
    }
});