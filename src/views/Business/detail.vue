<!--订单明细-->
<template>
    <div>
        <a-card>
            <div class="detail-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin: 10px 0">
                    <a-form id="odForm" layout="horizontal" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16" >
                                <a-col :span="6">
                                    <a-form-item label="店铺" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">天猫</a-select-option>
                                            <a-select-option value="2">淘宝</a-select-option>
                                            <a-select-option value="3">其他</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="订单编号" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="formInline.trade_no" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="原始单号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="客户网名" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="8">
                                <a-col :md="6" >
                                    <a-form-item label="电话号码" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item
                                            label="货到付款"
                                            :labelCol="{span:7}"
                                            :wrapperCol="{span: 12, offset: 1}"
                                    >
                                        <a-select placeholder="请选择" size="small">
                                            <a-select-option value="1">是</a-select-option>
                                            <a-select-option value="2">否</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="订单状态" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="已取消">已取消</a-select-option>
                                            <a-select-option value="未付款">未付款</a-select-option>
                                            <a-select-option value="待尾款">待尾款</a-select-option>
                                            <a-select-option value="待选仓">待选仓</a-select-option>
                                            <a-select-option value="等未付">等未付</a-select-option>
                                            <a-select-option value="延时审核">延时审核</a-select-option>
                                            <a-select-option value="预订单">预订单</a-select-option>
                                            <a-select-option value="待抢单">待抢单</a-select-option>
                                            <a-select-option value="待客审">待客审</a-select-option>
                                            <a-select-option value="待财审">待财审</a-select-option>
                                            <a-select-option value="已递交仓库">已递交仓库</a-select-option>
                                            <a-select-option value="已审核">已审核</a-select-option>
                                            <a-select-option value="已发货">已发货</a-select-option>
                                            <a-select-option value="部分打款">部分打款</a-select-option>
                                            <a-select-option value="已完成">已完成</a-select-option>
                                            <a-select-option value="异常发货">异常发货</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="所在店铺" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">天猫</a-select-option>
                                            <a-select-option value="2">淘宝</a-select-option>
                                            <a-select-option value="2">其他</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="16">
                                <a-col :md="7" >
                                    <a-form-item
                                            label="上次购买时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="用户登记时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="付款时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </div>
                        <span :style="advanced?'float: right; padding-right: 30px':'float: right; margin-top: 18px; padding-right: 30px'">
                        <a-button type="primary" @click="submitList">查询</a-button>
                        <a-button style="margin-left: 8px" type="reset" @click="resetInput">重置</a-button>
                    </span>
                        <br>
                        <a @click="toggleAdvanced" style="margin-left: 50%">
                            <a-icon :type="advanced ? 'up' : 'down'" />
                        </a>
                    </a-form>
                </div>
            </div>
            <div>
                <standard-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :selectedRows.sync="selectedRows"
                        :scroll="{ x: 1500, y: 300 }"
                        @clear="onClear"
                        @change="onChange"
                        @selectedRowChange="onSelectChange"
                >
                    <div slot="description" slot-scope="{text}">
                        {{text}}
                    </div>
                    <template slot="statusTitle">
                        <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                    </template>
                </standard-table>
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
        </a-card>
    </div>
</template>

<script>
    import StandardTable from '@/components/StandardTable'

    const columns = [
        {title: '订单编号', width: 140, dataIndex: 'tradeNo', key: 'tradeNo', 'fixed': 'left'},
        {title: '店铺', width: 160, dataIndex: 'shopName', key: 1},
        {title: '订单来源', width: 100, dataIndex: 'tradeFrom', key: 2},
        {title: '仓库', width: 110, dataIndex: 'warehouseName', key: 3},
        {title: '子单原始单号', width: 150, dataIndex: 'sonSrcTid', key: 4},
        {title: '订单状态', width: 100, dataIndex: 'tradeStatus', key: 5},
        {title: '订单类型', width: 100, dataIndex: 'tradeType', key: 6},
        {title: '货到付款', width: 100, dataIndex: 'cashOnDelivery', key: 7},
        {title: '订单退款状态', width: 100, dataIndex: 'refundStatus', key: 8},
        {title: '交易时间', width: 120, dataIndex: 'tradeTime', key: 9},
        {title: '付款时间', width: 120, dataIndex: 'payTime', key: 10},
        {title: '客户网名', width: 100, dataIndex: 'buyerNick', key: 11},
        {title: '收件人', width: 100, dataIndex: 'receiverName', key: 12},
        {title: '收货地区', width: 200, dataIndex: 'receiverArea', key: 13},
        {title: '收货地址', width: 400, dataIndex: 'receiverAddress', key: 14},
        {title: '收件人手机', width: 100, dataIndex: 'receiverMobile', key: 15},
        {title: '分销商', width: 100, dataIndex: 'fenxiaoNick', key: 16},
        {title: '子单原始子单号', width: 150, dataIndex: 'zidanTid', key: 17},
        {title: '来源组合装编号', width: 150, dataIndex: 'sourcePackageNum', key: 18},
        {title: '收件人电话', width: 100, dataIndex: 'receiverTelno', key: 19},
        {title: '邮编', width: 100, dataIndex: 'receiverZip', key: 20},
        {title: '区域', width: 100, dataIndex: 'receiverRing', key: 21},
        {title: '物流公司', width: 100, dataIndex: 'logisticsName', key: 22},
        {title: '物流单号', width: 100, dataIndex: 'logisticsNo', key: 23},
        {title: '买家留言', width: 100, dataIndex: 'buyerMessage', key: 24},
        {title: '客服备注', width: 100, dataIndex: 'csRemark', key: 25},
        {title: '打印备注', width: 100, dataIndex: 'printRemark', key: 26},
        {title: '备注', width: 100, dataIndex: 'remark', key: 27},
        {title: '客服标旗', width: 100, dataIndex: 'remarkFlag', key: 28},
        {title: '订单支付金额', width: 100, dataIndex: 'paid', key: 29},
        {title: '邮费', width: 100, dataIndex: 'postAmount', key: 30},
        {title: '其它费用', width: 100, dataIndex: 'otherAmount', key: 31},
        {title: '订单总优惠', width: 100, dataIndex: 'orderDiscount', key: 32},
        {title: '应收金额', width: 100, dataIndex: 'receivable', key: 33},
        {title: '款到发货金额', width: 100, dataIndex: 'dapAmount', key: 34},
        {title: '货到付款金额', width: 100, dataIndex: 'huodaoAmount', key: 35},
        {title: '订单预估成本', width: 100, dataIndex: 'goodsCost', key: 36},
        {title: '邮资成本', width: 100, dataIndex: 'postCost', key: 37},
        {title: '预估重量', width: 100, dataIndex: 'preWeight', key: 38},
        {title: '需要发票', width: 100, dataIndex: 'invoiceNeeded', key: 39},
        {title: '发票抬头', width: 100, dataIndex: 'invoiceTitle', key: 40},
        {title: '发票内容', width: 100, dataIndex: 'invoiceContent', key: 41},
        {title: '业务员', width: 100, dataIndex: 'salesman', key: 42},
        {title: '审核人', width: 100, dataIndex: 'checker', key: 43},
        {title: '财审人', width: 100, dataIndex: 'fchecker', key: 44},
        {title: '商家编码', width: 100, dataIndex: 'specNo', key: 45},
        {title: '货品编号', width: 100, dataIndex: 'goodsNo', key: 46},
        {title: '货品名称', width: 100, dataIndex: 'goodsName', key: 47},
        {title: '规格名称', width: 100, dataIndex: 'specName', key: 48},
        {title: '平台货品名称', width: 200, dataIndex: 'apiGoodsName', key: 49},
        {title: '平台规格名称', width: 100, dataIndex: 'apiSpecName', key: 50},
        {title: '下单数量', width: 100, dataIndex: 'num', key: 51},
        {title: '标价', width: 100, dataIndex: 'price', key: 52},
        {title: '货品总优惠', width: 100, dataIndex: 'goodsDiscount', key: 53},
        {title: '成交价', width: 100, dataIndex: 'orderPrice', key: 54},
        {title: '分摊后价格', width: 100, dataIndex: 'sharePrice', key: 55},
        {title: '折扣', width: 100, dataIndex: 'discount', key: 56},
        {title: '实发数量', width: 100, dataIndex: 'actualNum', key: 57},
        {title: '分摊后总价', width: 100, dataIndex: 'shareAmount', key: 58},
        {title: '退款前支付金额', width: 100, dataIndex: 'prePaid', key: 59},
        {title: '分摊邮费', width: 100, dataIndex: 'sharePost', key: 60},
        {title: '单品支付金额', width: 100, dataIndex: 'singlePaid', key: 61},
        {title: '佣金', width: 100, dataIndex: 'commission', key: 62},
        {title: '拆自组合装', width: 100, dataIndex: 'suiteName', key: 63},
        {title: '估重', width: 100, dataIndex: 'weight', key: 64},
        {title: '赠品方式', width: 100, dataIndex: 'giftType', key: 65},
        {title: '证件号码', width: 100, dataIndex: 'idCard', key: 66},
        {title: '标记名称', width: 100, dataIndex: 'flagName', key: 67},
        {title: '激活时间', width: 120, dataIndex: 'activationTime', key: 68},
    ]

    export default {
        name: "detail",
        components: {StandardTable},
        data () {
            return {
                formInline: {
                    trade_no: '',
                    shop_name: '',
                    pay_account: '',
                    trade_status: '',
                    goods_name: '',
                    trade_type: '',
                    refund_status: '',
                    receiver_name: '',
                    orderDateStart: '',
                    orderDateEnd: '',
                    orderPayDateStart: '',
                    orderPayDateEnd: '',
                    orderSubmitDateStart: '',
                    orderSubmitDateEnd: '',
                },
                advanced: false,
                columns: columns,
                dataSource: [],
                selectedRows: [],
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                //    token
                tokenStr: '',
            }
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            axios.get('http://localhost:8080//backend/order/listOrderDetail/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
                for (let i = 0; i < 5; i++) {
                        res.data.data[i]['key'] = i
                        this.dataSource.push(res.data.data[i])
                    }
                }).catch()
        },
        mounted(){
            // data amount
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080/backend/order/countOrderDetail',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data;
            }).catch()
        },
        methods: {
            // 搜索
            submitList(){
                const that = this
                if(this.formInline.trade_no!== null){
                    console.log("提交订单号：")
                    console.log(this.formInline.trade_no)
                    console.log(this.tokenStr)
                    axios.get('http://localhost:8080/backend/order/getOrderDetail', {
                        params:{
                            tradeNo: that.formInline.trade_no,
                        },
                        headers:{token : this.tokenStr},
                        // tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        if(!res.data.data.length){
                            alert("未能查找到订单相关信息，订单数据缺失！！")
                        }
                        else{
                            let list = []
                            for (let i = 0; i < res.data.data.length; i++) {
                                res.data.data[i]['key'] = i
                                list.push(res.data.data[i])
                            }
                            this.dataSource = list
                        }
                    }).catch()
                }
                else{
                    alert("空表单")
                }
            },
            resetInput(){
                const that = this
                document.getElementById("odForm").reset()
                that.formInline = {
                    trade_no: '',
                    shop_name: '',
                    pay_account: '',
                    trade_status: '',
                    goods_name: '',
                    trade_type: '',
                    refund_status: '',
                    receiver_name: '',
                    orderDateStart: '',
                    orderDateEnd: '',
                    orderPayDateStart: '',
                    orderPayDateEnd: '',
                    orderSubmitDateStart: '',
                    orderSubmitDateEnd: '',
                }
                axios.get('http://localhost:8080/backend/order/listOrderDetail/1/5', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    let list = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i]['key'] = i
                        list.push(res.data.data[i])
                    }
                    this.dataSource = list
                }).catch()
            },
            deleteRecord(key) {
                this.dataSource = this.dataSource.filter(item => item.key !== key)
                this.selectedRows = this.selectedRows.filter(item => item.key !== key)
            },
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            remove () {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('您清空了勾选的所有行')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },
            onChange() {
                this.$message.info('表格状态改变了')
            },
            onSelectChange() {
                this.$message.info('选中行改变了')
            },
            handleMenuClick (e) {
                if (e.key === 'delete') {
                    this.remove()
                }
            },
            // 分页
            currentPage(currentPage, size){
                // console.log("当前页码")
                // console.log(currentPage)
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrderDetail/'+currentPage+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <size; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.dataSource = datalist
                }).catch()
            },
            onShowSizeChange(current, size) {
                console.log("页面数据量")
                console.log(size)
                this.pageSize = size;
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrderDetail/'+current+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <size; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.dataSource = datalist
                }).catch()
            },
        }
    }
</script>

<style lang="less" scoped>
    .search{
        margin-bottom: 54px;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block
    }
    .operator{
        margin-bottom: 18px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
    .page-roll {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>
