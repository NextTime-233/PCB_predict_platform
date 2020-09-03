<!--客户档案-->
<template>
    <div>
        <a-card>
            <div class="client-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin: 10px 0">
                    <a-form id="cForm" layout="horizontal" :model="clientForm" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16" >
                                <a-col :span="6">
                                    <a-form-item label="客户姓名" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input placeholder="请输入" size="small" v-model="clientForm.customerName"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="货品总数" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input placeholder="请输入" size="small" v-model="clientForm.goodsCount"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="购买总金额" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseAmount"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="购买次数" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseNum"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="8">
                                <a-col :md="6" >
                                    <a-form-item label="货品种类总数" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.goodsTypeCount"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item
                                            label="购买品牌"
                                            :labelCol="{span:7}"
                                            :wrapperCol="{span: 12, offset: 1}"
                                    >
                                        <a-select placeholder="请选择" size="small" v-model="clientForm.BrandName">
                                            <a-select-option value="1">四喜</a-select-option>
                                            <a-select-option value="2">八宝</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="客户标签" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small v-model="clientForm.clientLabel">
                                            <a-select-option value="1">地区</a-select-option>
                                            <a-select-option value="2">年龄</a-select-option>
                                            <a-select-option value="3">性别</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="所属店铺" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small v-model="clientForm.shopName">
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
                                            label="生日区间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="birthdayOnChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="客户登记时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="registerOnChange" size="small">
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
                                        <a-range-picker @change="payOnChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="购物时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="shoppingOnChange" size="small">
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
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleMenuClick">
                        <a-menu-item key="1">
                            普通客户
                        </a-menu-item>
                        <a-menu-item key="2">
                            重要客户
                        </a-menu-item>
                    </a-menu>
                    <a-button> {{cType}} <a-icon type="down" /></a-button>
                </a-dropdown>
                <a-button style="margin-left: 10px; margin-bottom: 10px" type="primary">添加标签</a-button>
                <el-table
                        :data="tableData"
                        border
                        style="width: 150%">
                    <el-table-column
                            fixed
                            prop="customerType"
                            label="客户类型"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="customerNo"
                            label="客户编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="buyerNick"
                            label="客户网名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="gender"
                            label="性别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="country"
                            label="国家"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="province"
                            label="省份"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="city"
                            label="市区"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="district"
                            label="区县"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="zip"
                            label="邮编"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="telno"
                            label="固话"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="电子邮件"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="qq"
                            label="QQ"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="wangwang"
                            label="旺旺"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="birthday"
                            label="生日"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="totalPurchaseAmount"
                            label="购买总金额"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="totalPurchaseNum"
                            label="购买总次数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="lastPurchaseTime"
                            label="上次购买时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="lable"
                            label="用户标签"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="bwlist"
                            label="黑/白名单"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="stopped"
                            label="停用"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="lastVisDays"
                            label="距离上次回访天数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="modifiedTime"
                            label="修正时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="registrationTime"
                            label="登记时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="afterBuyingRate"
                            label="复购率"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="drain_cycle"
                            label="流失比率"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="loadTime"
                            label="载入时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看历史订单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                <div>
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="历史订单">
                            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }" :pagination="false" size="small" style="margin-top: 10px">
                            </a-table>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
    const tableData =[];
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
        { title: '商家编码', width: 100, dataIndex: 'singleSpecNo', key: '61' },
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
    export default {
        name: "Client",
        data() {
            return {
                // 数据
                tableData: [],
                // 搜索栏
                clientForm: {
                    customerName:'',
                    registrationTimeDateStart:'',
                    registrationTimeDateEnd:'',
                    PayDateStart:'',
                    PayDateEnd:'',
                    BirthdayTimeDateStart:'',
                    BirthdayTimeDateEnd:'',
                    shopName:'',
                    goodsCount:'',
                    TotalPurchaseAmount:'',
                    TotalPurchaseNum:'',
                    goodsTypeCount:'',
                    BrandName:'',
                    LastPurchaseTimeDateStart:'',
                    LastPurchaseTimeDateEnd:'',
                    clientLabel:''
                },
                advanced: false,
                // 类型
                cType: "客户类型",
                rowData:{},
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                //  token
                tokenStr: '',
                // 标签页
                columns:[],
                data:[],
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
          axios.get('http://localhost:8080/backend/customer/listCustomers/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
              // console.log(res.data.data)
              this.tableData = res.data.data
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
            // 客户类型
            handleMenuClick(e) {
                const tokenStr = window.sessionStorage.getItem('token')
                console.log('click', e);
                if(e.key === '2'){
                    axios.get('http://localhost:8080/backend/customer/getImpCustomers', {headers:{
                            token: tokenStr
                        }}).then( res => {
                        // console.log(res.data)
                        this.tableData = res.data.data
                    }).catch()
                }
            },
            // 日期选择框
            birthdayOnChange(date, dateString) {
                // console.log(dateString);
                this.clientForm.BirthdayTimeDateStart = dateString[0]
                this.clientForm.BirthdayTimeDateEnd = dateString[1]
            },
            payOnChange(date, dateString) {
                this.clientForm.PayDateStart =dateString[0]
                this.clientForm.PayDateEnd = dateString[1]
            },
            shoppingOnChange(date, dateString) {
                this.clientForm.LastPurchaseTimeDateStart =dateString[0]
                this.clientForm.LastPurchaseTimeDateEnd = dateString[1]
            },
            registerOnChange(date, dateString) {
                this.clientForm.registrationTimeDateStart =dateString[0]
                this.clientForm.registrationTimeDateEnd = dateString[1]
            },
            // 展开，搜索结果的翻页存在问题
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            submitList(){
                const that = this
                const list = this.clientForm
                console.log('此处应有列表判空:')
                if(0){
                    console.log(list)
                }
                else{
                    // console.log("提交表单")
                    axios.get('http://localhost:8080/backend/customer/getCustomers', {
                        params:{
                            customerName: list.customerName,
                            registrationTimeDateStart: list.registrationTimeDateStart,
                            registrationTimeDateEnd: list.registrationTimeDateEnd,
                            PayDateStart: list.PayDateStart,
                            PayDateEnd: list.PayDateEnd,
                            BirthdayTimeDateStart: list.BirthdayTimeDateStart,
                            BirthdayTimeDateEnd: list.BirthdayTimeDateEnd,
                            shopName: list.shopName,
                            goodsCount: list.goodsCount,
                            TotalPurchaseAmount: list.TotalPurchaseAmount,
                            TotalPurchaseNum: list.TotalPurchaseNum,
                            goodsTypeCount: list.goodsTypeCount,
                            BrandName: list.BrandName,
                            LastPurchaseTimeDateStart: list.LastPurchaseTimeDateStart,
                            LastPurchaseTimeDateEnd: list.LastPurchaseTimeDateEnd,
                            },
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        that.tableData = res.data.data
                    }).catch()
                }
            },
            resetInput(){
                const that = this
                document.getElementById("cForm").reset()
                this.clientForm = {
                    customerName:'',
                    registrationTimeDateStart:'',
                    registrationTimeDateEnd:'',
                    PayDateStart:'',
                    PayDateEnd:'',
                    BirthdayTimeDateStart:'',
                    BirthdayTimeDateEnd:'',
                    shopName:'',
                    goodsCount:'',
                    TotalPurchaseAmount:'',
                    TotalPurchaseNum:'',
                    goodsTypeCount:'',
                    BrandName:'',
                    LastPurchaseTimeDateStart:'',
                    LastPurchaseTimeDateEnd:'',
                    clientLabel:''
                }
                axios.get('http://localhost:8080/backend/customer/listCustomers/1/5', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    // console.log(res.data)
                    that.tableData = res.data.data
                }).catch()
            },
            // el表格
            handleClick(row) {
                const that = this
                console.log(row)
                const datalist=[]
                axios.get('http://localhost:8080/backend/order/getOrders/',{
                    params: {
                        buyer_nick: row.buyer_nick,
                    },
                    headers:{token: that.tokenStr},
                    tokenBackend: that.tokenStr
                }).then(res => {
                    console.log(res.data)
                    if(res.data.data === null){
                        console.log("列表为空")
                    }else{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i]['key'] = i
                            datalist.push(res.data.data[i])
                        }
                        that.data = datalist
                    }
                }).catch()
            },
            // 分页, 加载缓慢
            currentPage(currentPage, size){
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/customer/listCustomers/'+currentPage+'/'+size).then(res => {
                    // console.log(res.data.data)
                    this.tableData = res.data.data
                }).catch()
            },
            onShowSizeChange(current, size) {
                console.log("页面数据量")
                console.log(size)
                this.pageSize = size;
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/customer/listCustomers/'+current+'/'+size).then(res => {
                    // console.log(res.data.data)
                    this.tableData = res.data.data
                }).catch()
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
