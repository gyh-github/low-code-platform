
import pinia from '@/packages/store';
import useMaterialsStore from '@/packages/store/materials';
import MobileTable from './index.vue';
const materials = useMaterialsStore(pinia);
const { register } = materials;
const mobileTable = {
    label: '移动端Table',
    preview: () => <MobileTable style="width:60px;height:60px"></MobileTable>,
    render: (props) =>
        <MobileTable {...props}></MobileTable>,
    key: "mobileTable",
    attribute: {
        tableColumn: [
            {
                label: '列一',
                prop: 'lie1',
                key: 'lie1',
                fixed: 'left',
                width: 100,
                render: () => { }
            },
            {
                label: '列二',
                prop: 'lie2',
                key: 'lie2',
                fixed: 'none',
                render: () => { }
            },
            {
                label: '列三',
                prop: 'lie3',
                key: 'lie3',
                fixed: 'none',
                render: () => { }
            },
            {
                label: '列四',
                prop: 'lie4',
                key: 'lie4',
                fixed: 'right',
                width: 100,
                render: () => { }
            }],
        tableData: [
            {
                lie1: '小明',
                lie2: '19',
                lie3: '北京',
                lie4: '大一',
            },
            {
                lie1: '小芳',
                lie2: '18',
                lie3: '上海',
                lie4: '高三',
            },
            {
                lie1: '小艾',
                lie2: '20',
                lie3: '天津',
                lie4: '大二',
            }],
        style: {
            height: 150,
            width: 300
        }
    }
};
register(mobileTable);