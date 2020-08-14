<!--订单管理-->
<template>
    <div>
        <div class="order-list-display">
            <div class="searchBar">
                <t>店铺：</t>
                <a-auto-complete
                        :data-source="dataSource"
                        style="width: 200px"
                        placeholder="input here"
                        :filter-option="filterOption"
                />
                <a-popover placement="bottomRight">
                    <template slot="content">
                        <p>循环输出所有店铺</p>
                        <a-input placeholder="输入关键字查询" />
                        <a-checkbox @change="onChange">
                            Checkbox
                        </a-checkbox>
                        <br />
                        <a-checkbox @change="onChange">
                            Checkbox
                        </a-checkbox>
                        <br />
                        <a-button-group>
                            <a-button type="primary">
                                全选
                            </a-button>
                            <a-button>反选</a-button>
                            <a-button>重置</a-button>
                            <a-button type="dashed">
                                确定
                            </a-button>
                        </a-button-group>
                    </template>
                    <template slot="title">
                        <span>店铺列表</span>
                    </template>
                    <a-button>多选<a-icon type="down" /></a-button>
                </a-popover>


            </div>
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300 }">
                <a slot="action" slot-scope="text" href="javascript:;">action</a>
            </a-table>
        </div>
        <div class="detail-display">
            <a-tabs default-active-key="2">
                <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="apple" />
        Tab 1
      </span>
                    Tab 1
                </a-tab-pane>
                <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="android" />
        Tab 2
      </span>
                    Tab 2
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import PageFooter from "../../layouts/PageFooter";
    const columns = [
        { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
        { title: 'Column 1', dataIndex: 'address', key: '1' },
        { title: 'Column 2', dataIndex: 'address', key: '2' },
        { title: 'Column 3', dataIndex: 'address', key: '3' },
        { title: 'Column 4', dataIndex: 'address', key: '4' },
        { title: 'Column 5', dataIndex: 'address', key: '5' },
        { title: 'Column 6', dataIndex: 'address', key: '6' },
        { title: 'Column 7', dataIndex: 'address', key: '7' },
        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        },
    ];

    export default {
        name: "manage",
        components: {PageFooter},
        data() {
            return {
                // 搜索栏
                dataSource: ['唯品会', '每日优鲜'],
                // 列表
                data,
                columns,
            //    token
                tokenStr: window.sessionStorage.getItem('token')
            };
        },
        created() {
            axios.get('http://localhost:8080/backend/order/listOders', {Headers:{
                token: this.tokenStr
            }
            }).then( res => {
                console.log(res.data)
            })
        },
        methods: {
            onChange(checkedValues) {
                console.log('checked = ', checkedValues);
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
                );
            },
        },
    }

</script>

<style scoped>
    .searchBar {
        margin: 20px 0;
    }
    .order-list-display {
        height: 50%;
        padding-bottom: 20px;
        border-bottom: 1px solid #dfe6e9;
    }
</style>