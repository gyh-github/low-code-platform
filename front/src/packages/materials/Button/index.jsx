import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
register({
    label: '原生按钮',
    preview: () => <button>原生按钮</button>,
    render: (props) =>
        <button {...props}>原生按钮</button>,
    key: "Button",
    attribute: {
        style: {
            height: 50,
            width: 100
        }
    }
});