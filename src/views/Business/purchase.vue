<!--货品档案-->
<template>
    <div>
        <div id="goods-list-display">
            <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin-top: 10px">
                <a-form layout="inline" :model="formInline" @submit.native.prevent>
                    <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                        <a-row type="flex">
                            <a-col :span="6" :order="1">
                                <a-form-item label="商家编码">
                                    <a-input v-model="formInline.shopName">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="2">
                                <a-form-item label="货品编号">
                                    <a-input v-model="formInline.orderNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="3">
                                <a-form-item label="货品名称">
                                    <a-input v-model="formInline.originOrderNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="4">
                                <a-form-item label="条码">
                                    <a-input v-model="formInline.logisticsNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row type="flex" v-if="advanced">
                            <a-col :span="6" :order="1">
                                <a-form-item label="分类">
                                    <a-input v-model="formInline.ClientNetName">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="2">
                                <a-form-item label="品牌">
                                    <a-input v-model="formInline.Phone">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="3">
                                <a-form-item label="规格名称">
                                    <a-input v-model="formInline.Type">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="4">
                                <a-form-item label="货品简称">
                                    <a-input v-model="formInline.Type">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>
                    <span :style="advanced?'float: right; padding-right: 30px':'float: right; margin-top: 18px; padding-right: 30px'">
                        <a-button type="primary" @click="submitList">查询</a-button>
                        <a-button style="margin-left: 8px" type="reset">重置</a-button>
                    </span>
                    <br>
                    <a @click="toggleAdvanced" style="margin-left: 50%">
                        <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                </a-form>
            </div>
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
            title: '分类',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true,
        },
        {
            title: '品牌',
            dataIndex: 'address',
            key: 'address 5',
            ellipsis: true,
        },
        {
            title: '货品类别',
            dataIndex: 'address',
            key: 'address 6',
            ellipsis: true,
        },
        {
            title: '规格数',
            dataIndex: 'address',
            key: 'address 7',
            ellipsis: true,
        },
        {
            title: '基本单位',
            dataIndex: 'address',
            key: 'address 8',
            ellipsis: true,
        },
        {
            title: '辅助单位',
            dataIndex: 'address',
            key: 'address 6',
            ellipsis: true,
        },
        {
            title: '产地',
            dataIndex: 'address',
            key: 'address 7',
            ellipsis: true,
        },
        {
            title: '标记名称',
            dataIndex: 'address',
            key: 'address 8',
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
                // 搜索栏
                formInline: {
                    shopName: '',
                    orderNo: '',
                    originOrderNo: '',
                    logisticsNo: '',
                    ClientNetName: '',
                    Phone: '',
                    Type: '',
                    // : '',
                    // : '',
                    // : '',
                },
                advanced: true,
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
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            console.log(that.tokenStr)
            axios.get('http://localhost:8080/backend/goods/', {headers:{
                    token: tokenStr
                }}).then( res => {
                console.log(res.data)
                // for (let i = 100; i <130; i++) {
                // res.data.data[i]['key'] = i
                // this.data.push(res.data.data[i]);
                // }
            }).catch()
        },
        mounted(){
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080/backend/goods/',{headers:{
                    token : tokenStr}}).then( res => {
                // console.log(res.data)
                that.total = res.data.data;
            }).catch()
        },
        methods: {
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            submitList(){
                console.log(this.formInline)
                if(!list){
                    console.log(list)
                }
                else{
                    console.log("提交表单")
                    axios.get('http://localhost:8080/backend/customer/getCustomers', {
                        params:{list},
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                    }).catch()
                }
            },
        }
    }

</script>

<style lang="less" scoped>
    .search{
        background-color: lightgrey;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block;
    }
    /* my design */
    #goods-list-display {
        height: 50%;
        padding-bottom: 20px;
        border-bottom: 1px solid #dfe6e9;
    /*from element*/
    .el-row {
        margin-bottom: 20px;

    &:last-child {
         margin-bottom: 0;
     }
    .el-col {
        border-radius: 4px;
    }
    }
    .page-roll {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    }
</style>