import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
const materials = useMaterialsStore(pinia);
const { register } = materials;
register({
    label: '纯文字',
    preview: () => <span style="color:#ee0000">纯文字</span>,
    render: (props) =>
        <span {...props}>纯文字</span>,
    key: "Text",
    attribute: {
        style: {
            display: 'inline-block',
            padding: '10px 15px',
            color: '#ee0000',
            'font-size': 16,
            'font-weight': 400,
        }
    }
});