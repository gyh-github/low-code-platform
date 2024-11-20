<template>
    <div class="mobile-table">
        <div class="mobile-table-left">
            <div class="mobile-table-header">
                <div class="mobile-table-td" v-for="item in leftColumn" :key="item.prop" :style="{ width: item.width }">
                    {{ item.label }}</div>
            </div>
            <div class="mobile-table-content scrollbar-hidden" ref="leftRef" @scroll="scrollLeftFn">
                <div class="mobile-table-tr" v-for="item in leftTableData" :key="item">
                    <div class="mobile-table-td" v-for="ite in item" :key="ite">{{ ite }}</div>
                </div>
            </div>
        </div>
        <div class="mobile-table-center">
            <div class="mobile-table-header scrollbar-hidden" ref="centerHeaderRef" @scroll="scrollCenterHeaderFn"
                style="overflow: auto;">
                <div class="mobile-table-td" style="flex: 1 0 auto;" v-for="item in centerColumn" :key="item.prop"
                    :style="{ width: item.width }">{{ item.label }}</div>
            </div>
            <div class="mobile-table-content scrollbar-hidden" ref="centerRef" @scroll="scrollCenterFn"
                style="overflow: auto;">
                <div class="mobile-table-tr" v-for="item in centerTableData" :key="item">
                    <div class="mobile-table-td" style="flex: 1 0 auto;" v-for="ite in item" :key="ite">{{ ite }}</div>
                </div>
            </div>
        </div>
        <div class="mobile-table-right">
            <div class="mobile-table-header">
                <div class="mobile-table-td" v-for="item in rightColumn" :key="item.prop"
                    :style="{ width: item.width }">{{ item.label }}</div>
            </div>
            <div class="mobile-table-content scrollbar-hidden" ref="rightRef" @scroll="scrollRightFn">
                <div class="mobile-table-tr" v-for="item in rightTableData" :key="item">
                    <div class="mobile-table-td" v-for="ite in item" :key="ite">{{ ite }}</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'mobileTable',
    props: {
        tableColumn: {
            type: Array,
            default: () => ([
                {
                    label: '列一',
                    prop: 'lie1',
                    key: 'lie1',
                    fixed: 'left',
                    width: '100px',
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
                    width: '100px',
                    render: () => { }
                },
                {
                    label: '列五',
                    prop: 'lie5',
                    key: 'lie5',
                    fixed: 'none',
                    width: '100px',
                    render: () => { }
                },
            ])
        },
        tableData: {
            type: Array,
            default: () => [
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
                }
            ]
        }
    },
    computed: {
        leftColumn: function () {
            return this.tableColumn?.filter(item => item.fixed === 'left');
        },
        centerColumn: function () {
            return this.tableColumn?.filter(item => !item.fixed || item.fixed === 'none');
        },
        rightColumn: function () {
            return this.tableColumn?.filter(item => item.fixed === 'right');
        },
        leftTableData: function () {
            const _column = this.tableColumn?.filter(item => item.fixed === 'left').map(item => item.prop);
            const _data = this.tableData?.map(item => {
                let _arr = [];
                for (let key in item) {
                    if (_column.includes(key)) {
                        _arr.push(item[key])
                    }
                }
                return _arr;
            });
            return _data;
        },
        centerTableData: function () {
            const _column = this.tableColumn?.filter(item => !item.fixed || item.fixed === 'none').map(item => item.prop);
            const _data = this.tableData?.map(item => {
                let _arr = [];
                for (let key in item) {
                    if (_column.includes(key)) {
                        _arr.push(item[key])
                    }
                }
                return _arr;
            });
            return _data;
        },
        rightTableData: function () {
            const _column = this.tableColumn?.filter(item => item.fixed === 'right').map(item => item.prop);
            const _data = this.tableData?.map(item => {
                let _arr = [];
                for (let key in item) {
                    if (_column.includes(key)) {
                        _arr.push(item[key])
                    }
                }
                return _arr;
            });
            return _data;
        }
    },
    data() {
        return {
            leftRef: null,
            centerRef: null,
            centerHeaderRef: null,
            rightRef: null,
            currentNode: null
        }
    },
    methods: {
        mouseFn(e) {
            this.currentNode = e.target.parentNode.parentNode.parentNode.className;
        },
        scrollLeftFn(e) {
            const _top = e.target.scrollTop;
            if (this.currentNode === 'mobile-table-left') {
                this.$refs.centerRef.scroll({ top: _top });
                this.$refs.rightRef.scroll({ top: _top });
            }
        },
        scrollCenterFn(e) {
            const _top = e.target.scrollTop;
            const _left = e.target.scrollLeft;
            if (this.currentNode === 'mobile-table-center') {
                this.$refs.leftRef.scrollTo({ top: _top });
                this.$refs.rightRef.scrollTo({ top: _top });
                this.$refs.centerHeaderRef.scrollTo({ left: _left });
            }
        },
        scrollCenterHeaderFn(e) {
            const _left = e.target.scrollLeft;
            this.$refs.centerRef.scrollTo({ left: _left });
        },
        scrollRightFn(e) {
            const _top = e.target.scrollTop;
            if (this.currentNode === 'mobile-table-right') {
                this.$refs.leftRef.scrollTo({ top: _top });
                this.$refs.centerRef.scrollTo({ top: _top });
            }
        },


    },
    mounted() {
        document.addEventListener('touchstart', (e) => this.mouseFn(e));
    },
    beforeUnmount() {
        document.removeEventListener('touchstart', (e) => this.mouseFn(e));
    }
}
</script>
<style lang="less" scoped>
.mobile-table {
    height: 100%;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-around;
    overflow: hidden;

    &-header {
        display: flex;
        height: 35px;
        background: bisque;
    }

    &-content {
        height: calc(100% - 35px);
        overflow: auto;
    }

    &-left {
        width: auto;
        height: 100%;
        box-shadow: 0 4px 4px #dcdcdc;
    }

    &-center {
        width: calc(100% - 200px);
        flex: 1 1 auto;
        height: 100%;

    }

    &-right {
        width: auto;
        height: 100%;
        box-shadow: 0 -4px 4px #dcdcdc;
    }

    &-tr {
        display: flex;
    }

    &-td {
        border: thin solid #efefef;
        width: 100px;
        height: 35px;
        line-height: 35px;
        flex: 1 1 auto;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}

/* 针对Firefox浏览器 */
.scrollbar-hidden {
    scrollbar-width: none;
    /* Firefox */
}

/* 针对IE浏览器 */
.scrollbar-hidden {
    -ms-overflow-style: none;
    /* IE 10+ */
}

/* 针对Chrome和Safari浏览器 */
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}

/* 通用样式，确保内容可滚动 */
.scrollbar-hidden {
    overflow-x: hidden;
    /* 隐藏水平滚动条 */
    overflow-y: auto;
    /* 垂直滚动条可用 */
}
</style>