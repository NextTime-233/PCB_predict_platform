<!--货品档案-->
<template>
    <div>
        <div id="goods-search-list">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-form-item label="货品编号">
                        <a-input placeholder="货品编号"/>
                    </a-form-item>
                    <a-form-item label="商家编码">
                        <a-input placeholder="商家编码"/>
                    </a-form-item>
                    <a-form-item label="货品名称">
                        <a-input placeholder="货品名称"/>
                    </a-form-item>
                    <a-form-item label="条码">
                        <a-input placeholder="条码"/>
                    </a-form-item>
                <a-row>
                    <a-col :span="24" :style="{ textAlign: 'right' }">
                        <a-button type="primary" html-type="submit">
                            Search
                        </a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            Clear
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <a-table :pagination="false" :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
        <PageRoll></PageRoll>
    </div>

</template>

<script>
    import PageRoll from "../../components/PageRoll";
    const columns = [
        {
            title: '货品编号',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '货品名称',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: true,
        },
        {
            title: '货品简称',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,
        },
        {
            title: '货品别名',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: true,
        },
        {
            title: '货品类别',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true,
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    export default {
        name: "purchase",
        components: {PageRoll},
        data() {
            return {
                // table
                data,
                columns,
            // 搜索栏
            //     expand: false,
                form: this.$form.createForm(this, { name: 'advanced_search' }),
            };
        },
        // 搜索栏
        computed: {
            // count() {
            //     return this.expand ? 11 : 7;
            // },
        },
        updated() {
            console.log('updated');
        },
        created() {
            axios.get('http://localhost:8080/backend/').then( res => {
                console.log(res.data)
            })
        },
        methods: {
            // 搜索栏
            handleSearch(e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    console.log('error', error);
                    console.log('Received values of form: ', values);
                });
            },

            handleReset() {
                this.form.resetFields();
            },

            toggle() {
                this.expand = !this.expand;
            },
        }
    }

</script>

<style scoped>
    /*搜索栏*/
    .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }

    #goods-search-list .ant-form {
        max-width: none;
    }
    #goods-search-list .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }

</style>