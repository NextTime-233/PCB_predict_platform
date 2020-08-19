<!--客户档案-->
<template>
    <div>
        <div class="client-list-display">
            <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin-top: 10px">
                <a-form layout="inline" :model="formInline" @submit.native.prevent>
                    <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                        <a-row type="flex">
                            <a-col :span="6" :order="1">
                                <a-form-item label="店铺名称">
                                    <a-input v-model="formInline.shopName">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="2">
                                <a-form-item label="订单编号">
                                    <a-input v-model="formInline.orderNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="3">
                                <a-form-item label="原始单号">
                                    <a-input v-model="formInline.originOrderNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="4">
                                <a-form-item label="物流单号">
                                    <a-input v-model="formInline.logisticsNo">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row type="flex" v-if="advanced">
                            <a-col :span="6" :order="1">
                                <a-form-item label="客户网名">
                                    <a-input v-model="formInline.ClientNetName">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="2">
                                <a-form-item label="电话号码">
                                    <a-input v-model="formInline.Phone">
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" :order="3">
                                <a-form-item label="订单类型">
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
            <a-table :pagination="false" :columns="columns" :data-source="data" style="margin-top: 10px">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <!--            <span slot="customTitle">Name</span>-->
                <span slot="tags" slot-scope="tags">
              <a-tag
                      v-for="tag in tags"
                      :key="tag"
                      :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
                <span slot="action" slot-scope="text, record">
              <a>编辑</a>
              <a-divider type="vertical" />
              <a>删除</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link"> 更多操作 <a-icon type="down" /> </a>
            </span>
            </a-table>
            <span>共{{total}}条数据</span>
            <div class="page-roll">
                <a-pagination
                        v-model="current"
                        :page-size-options="pageSizeOptions"
                        :total="total"
                        show-size-changer
                        show-quick-jumper
                        :page-size="pageSize"
                        @showSizeChange="onShowSizeChange"
                >
                    <template slot="buildOptionText" slot-scope="props">
                        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                        <span v-if="props.value === '50'">全部</span>
                    </template>
                </a-pagination>
            </div>
        </div>
        <div class="detail-display">
            <div>
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="订单明细">
                        <template>
                            <a-descriptions title="" bordered>
                                <a-descriptions-item label="Product">
                                    Cloud Database
                                </a-descriptions-item>
                                <a-descriptions-item label="Billing Mode">
                                    Prepaid
                                </a-descriptions-item>
                                <a-descriptions-item label="Automatic Renewal">
                                    YES
                                </a-descriptions-item>
                                <a-descriptions-item label="Order time">
                                    2018-04-24 18:00:00
                                </a-descriptions-item>
                                <a-descriptions-item label="Usage Time" :span="2">
                                    2019-04-24 18:00:00
                                </a-descriptions-item>
                                <a-descriptions-item label="Status" :span="3">
                                    <a-badge status="processing" text="Running" />
                                </a-descriptions-item>
                                <a-descriptions-item label="Negotiated Amount">
                                    $80.00
                                </a-descriptions-item>
                                <a-descriptions-item label="Discount">
                                    $20.00
                                </a-descriptions-item>
                                <a-descriptions-item label="Official Receipts">
                                    $60.00
                                </a-descriptions-item>
                                <a-descriptions-item label="Config Info">
                                    Data disk type: MongoDB
                                </a-descriptions-item>
                            </a-descriptions>
                        </template>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="历史订单" force-render>
                        Content of Tab Pane 2
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
            title: '姓名',
        },
        {
            title: '客户网名',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    export default {
        name: "Client",
        data() {
            return {
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
                data,
                columns,
                // 分页
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                current: 1,
                pageSize: 10,
                total: 0,
                //    token
                tokenStr: '',
            };
        },
        watch: {
            pageSize(val) {
                console.log('pageSize', val);
            },
            current(val) {
                console.log('current', val);
            },
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            console.log(that.tokenStr)
          axios.get('http://localhost:8080/backend/customer/listCustomers/1/10', {headers:{
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
            axios.get('http://localhost:8080/backend/customer/countCustomer',{headers:{
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
            // 分页
            onShowSizeChange(current, pageSize) {
                this.pageSize = pageSize;
            },
            // 标签页
            callback(key) {
                console.log(key);
            },
        },
    };
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
    .client-list-display {
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
