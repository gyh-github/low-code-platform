
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
                // width: '100px',
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
                // width: '100px',
                render: () => { }
            }],
        tableData: [
            {
                lie1: '小明1',
                lie2: '小明2',
                lie3: '小明3',
                lie4: '小明4',
            },
            {
                lie1: '小明1',
                lie2: '小明2',
                lie3: '小明3',
                lie4: '小明4',
            },
            {
                lie1: '小明1',
                lie2: '小明2',
                lie3: '小明3',
                lie4: '小明4',
            }],
        style: {
            height: 150,
            width: 300
        }
    }
};
register(mobileTable);