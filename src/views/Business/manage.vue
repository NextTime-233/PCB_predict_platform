<!--订单管理-->
<template>
    <div>
        <a-card>
            <div class="order-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin-top: 10px">
                    <a-form layout="horizontal" :model="formInline" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16">
                                <a-col :span="6">
                                    <a-form-item label="店铺名称" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.shopName">
                                        </a-input>
                                        <a-popover placement="bottomRight">
                                            <template slot="title">
                                                <a-input placeholder="输入关键字查询" />
                                            </template>
                                            <template slot="content">
                                                <!--                                                <p>循环输出所有店铺</p>-->
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
                                            <a-button><a-icon type="down" /></a-button>
                                        </a-popover>
                                    </a-form-item>

                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单编号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.orderNo">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="原始单号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.originOrderNo">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="物流单号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.logisticsNo">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row type="flex" v-if="advanced">
                                <a-col :span="6">
                                    <a-form-item label="客户网名" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.ClientNetName">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="电话号码" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="formInline.Phone">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单类型" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
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
                <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }" :pagination="false" size="small" style="margin-top: 10px">
                    <a slot="action" slot-scope="text">action</a>
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
                            @change="currentPage"
                    >
                        <template slot="buildOptionText" slot-scope="props">
                            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                            <span v-if="props.value === '50'">全部</span>
                        </template>
                    </a-pagination>
                </div>
            </div>
            <div class="detail-display">
                <a-tabs default-active-key="2">
                    <a-tab-pane key="1" @click="moreDetail('YX97899')">
                      <span slot="tab">
                        <a-icon type="apple" />
                        货品列表
                      </span>
                        <div>
                        <a-descriptions
                                title="Responsive Descriptions"
                                bordered
                                :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                        >
                            <a-descriptions-item label="Product">
                                Cloud Database
                            </a-descriptions-item>
                            <a-descriptions-item label="Billing">
                                Prepaid
                            </a-descriptions-item>
                            <a-descriptions-item label="Time">
                                18:00:00
                            </a-descriptions-item>
                            <a-descriptions-item label="Amount">
                                $80.00
                            </a-descriptions-item>
                            <a-descriptions-item label="Discount">
                                $20.00
                            </a-descriptions-item>
                            <a-descriptions-item label="Official">
                                $60.00
                            </a-descriptions-item>
                            <a-descriptions-item label="Config Info">
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1
                            </a-descriptions-item>
                        </a-descriptions>
                    </div>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                      <span slot="tab">
                        <a-icon type="unordered-list" />
                        订单详情
                      </span>
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
                </a-tabs>
            </div>
            <page-footer></page-footer>
        </a-card>
    </div>
</template>

<script>
    import PageFooter from "../../layouts/PageFooter";
    const columns = [
        { title: '订单编号', width: 100, dataIndex: 'tradeNo', key: 'tradeNo', 'fixed': 'left' },
        { title: '平台类型', width: 100, dataIndex: 'platformType', key: 'platformType', 'fixed': 'left' },
        { title: '店铺名称', width: 100, dataIndex: 'shopName', key: '1' },
        { title: '仓库名称', width: 100, dataIndex: 'warehouseName', key: '2' },
        { title: '仓库类型', width: 100, dataIndex: 'warehouseType', key: '3' },
        { title: '原始单号', width: 100, dataIndex: 'srcTids', key: '4' },
        { title: '订单状态', width: 100, dataIndex: 'tradeStatus', key: '5' },
        { title: '发货状态', width: 100, dataIndex: 'consignStatus', key: '6' },
        { title: '平台发货状态', width: 100, dataIndex: 'platformConsignStatus', key: '7' },
        { title: '订单类型', width: 100, dataIndex: 'tradeType', key: '8' },
        { title: '发货条件', width: 100, dataIndex: 'deliveryTerm', key: '9' },
        { title: '冻结原因', width: 100, dataIndex: 'freezeReason', key: '10' },
        { title: '退款状态', width: 100, dataIndex: 'refundStatus', key: '11' },
        { title: '分销类别', width: 100, dataIndex: 'fenxiaoType', key: '12' },
        { title: '分销商名称', width: 100, dataIndex: 'fenxiaoNick', key: '13' },
        { title: '下单时间', width: 100, dataIndex: 'tradeTime', key: '14' },
        { title: '付款时间', width: 100, dataIndex: 'payTime', key: '15' },
        { title: '买家付款账号', width: 100, dataIndex: 'payAccount', key: '16' },
        { title: '客户网名', width: 100, dataIndex: 'buyerNick', key: '17' },
        { title: '收件人', width: 100, dataIndex: 'receiverName', key: '18' },
        { title: '省市县', width: 100, dataIndex: 'receiverArea', key: '19' },
        { title: '地址', width: 100, dataIndex: 'receiverAddress', key: '20' },
        { title: '手机', width: 100, dataIndex: 'receiverMobile', key: '21' },
        { title: '电话', width: 100, dataIndex: 'receiverTelno', key: '22' },
        { title: '邮编', width: 100, dataIndex: 'receiverZip', key: '23' },
        { title: '区域', width: 100, dataIndex: 'receiverRing', key: '24' },
        { title: '大头笔', width: 100, dataIndex: 'receiverDtb', key: '25' },
        { title: '派送时间', width: 100, dataIndex: 'toDeliverTime', key: '26' },
        { title: '物流公司', width: 100, dataIndex: 'logisticsName', key: '27' },
        { title: '物流单号', width: 100, dataIndex: 'logisticsNo', key: '28' },
        { title: '买家留言', width: 100, dataIndex: 'buyerMessage', key: '29' },
        { title: '客服备注', width: 100, dataIndex: 'csRemark', key: '30' },
        { title: '标旗', width: 100, dataIndex: 'remarkFlag', key: '31' },
        { title: '打印备注', width: 100, dataIndex: 'printRemark', key: '32' },
        { title: '货品种类数', width: 100, dataIndex: 'goodsTypeCount', key: '33' },
        { title: '货品总数', width: 100, dataIndex: 'goodsCount', key: '34' },
        { title: '货品总额', width: 100, dataIndex: 'goodsAmount', key: '35' },
        { title: '邮资', width: 100, dataIndex: 'postAmount', key: '36' },
        { title: '其它费用', width: 100, dataIndex: 'otherAmount', key: '37' },
        { title: '优惠', width: 100, dataIndex: 'discount', key: '38' },
        { title: '应收金额', width: 100, dataIndex: 'receivable', key: '39' },
        { title: '销项税', width: 100, dataIndex: 'outputTax', key: '40' },
        { title: '款到发货金额', width: 100, dataIndex: 'dapAmount', key: '41' },
        { title: 'COD金额', width: 100, dataIndex: 'codAmount', key: '42' },
        { title: '买家COD费用', width: 100, dataIndex: 'extCodFee', key: '43' },
        { title: '佣金', width: 100, dataIndex: 'commission', key: '44' },
        { title: '货品预估成本', width: 100, dataIndex: 'goodsCost', key: '45' },
        { title: '预估邮资成本', width: 100, dataIndex: 'postCost', key: '46' },
        { title: '已付金额', width: 100, dataIndex: 'paid', key: '47' },
        { title: '预估重量', width: 100, dataIndex: 'weight', key: '48' },
        { title: '预估毛利', width: 100, dataIndex: 'profit', key: '49' },
        { title: '发票类型', width: 100, dataIndex: 'invoiceType', key: '50' },
        { title: '发票抬头', width: 100, dataIndex: 'invoiceTitle', key: '51' },
        { title: '发票内容', width: 100, dataIndex: 'invoiceContent', key: '52' },
        { title: '业务员', width: 100, dataIndex: 'salesman', key: '53' },
        { title: '审核人', width: 100, dataIndex: 'checkerName', key: '54' },
        { title: '财审人', width: 100, dataIndex: 'fchecker', key: '55' },
        { title: '签出人', width: 100, dataIndex: 'checkouter', key: '56' },
        { title: '出库单号', width: 100, dataIndex: 'stockoutNo', key: '57' },
        { title: '标记名称', width: 100, dataIndex: 'flagName', key: '58' },
        { title: '处理天数', width: 100, dataIndex: 'disposeDays', key: '59' },
        { title: '订单来源', width: 100, dataIndex: 'tradeFrom', key: '60' },
        { title: '货品商家编码', width: 100, dataIndex: 'singleSpecNo', key: '61' },
        { title: '原始货品种类数', width: 100, dataIndex: 'rawGoodsCount', key: '62' },
        { title: '原始货品数量', width: 100, dataIndex: 'rawGoodsTypeCount', key: '63' },
        { title: '递交时间', width: 100, dataIndex: 'submitTime', key: '64' },
        { title: '币种', width: 100, dataIndex: 'currency', key: '65' },
        { title: '线上包裹拆分数', width: 100, dataIndex: 'splitPackageNum', key: '66' },
        { title: '激活时间', width: 100, dataIndex: 'activationTime', key: '67' },
        { title: '已开具发票', width: 100, dataIndex: 'Invoiced', key: '68' },
        { title: '体积', width: 100, dataIndex: 'volume', key: '69' },
        { title: '证件号码', width: 100, dataIndex: 'idCard', key: '70' },
        { title: '加载时间', width: 100, dataIndex: 'loadTime', key: '71' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
        },
    ];

    const data = [];

    export default {
        name: "manage",
        components: {PageFooter},
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
                // 列表
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
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            // console.log(that.tokenStr)
            axios.get('http://localhost:8080/backend/order/listOrders/1/10', {headers:{
                token: tokenStr
            }}).then( res => {
                // console.log( JSON.stringify(res.data.data[100]))
                console.log(res.data)
                for (let i = 0; i <10; i++) {
                    res.data.data[i]['key'] = i
                    this.data.push(res.data.data[i])
                }
            }).catch()
        },
        mounted(){
            // data amount of book maps
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            // 如果改变了咋办呢，这个只在创建时候有用
            axios.get('http://localhost:8080/backend/order/countOrders',{headers:{
                    token : tokenStr}}).then( res => {
                // console.log(res.data)
                that.total = res.data.data;
            }).catch()
        },
        methods: {
            // 多选
            onChange(checkedValues) {
                console.log('checked = ', checkedValues);
            },
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

                    axios.get('/backend/order/getOrders', {
                        params:{list},
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                    }).catch()
                }
            },
            // 分页
            currentPage(currentPage, size){
                // console.log("当前页码")
                // console.log(currentPage)
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrders/'+currentPage+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <10; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.data = datalist
                }).catch()
            },
            onShowSizeChange(current, size) {
                console.log("页面数据量")
                console.log(size)
                this.pageSize = size;
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrders/'+current+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <size; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.data = datalist
                }).catch()
            },
            //订单详情
            moreDetail(record_no){
                axios.get('/backend/order/getOrderDetail', {
                    params : {tradeNo : record_no},
                    headers : {token : this.tokenStr},
                    tokenBackend : this.tokenStr
                }).then( res => {
                    console.log(res.data)
                }).catch()
            }
        },
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
    @media screen and (max-width: 900px) {
        .fold {
            /*width: 100%;*/
        }
    }
    /* my design */
    .order-list-display {
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