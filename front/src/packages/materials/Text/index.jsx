import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
register({
    label: '原生按钮',
    preview: () => <span>纯文字</span>,
    render: (props) =>
        <span {...props}>纯文字</span>,
    key: "Text",
    attribute: {
        style: {
            display: 'inline-block',
            height: 50,
            width: 100
        }
    }
});