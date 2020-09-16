<!--订单管理-->
<template>
    <div>
        <a-card>
            <div class="order-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin-top: 10px">
                    <a-form id="omForm" layout="horizontal" :model="orderForm" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16">
                                <a-col :span="6">
<!--                                    <a-form-item label="店铺名称" :labelCol="{span: 8}" v-model="orderForm.shop_name" :wrapperCol="{span: 15, offset: 1}">-->
<!--                                        <a-select-->
<!--                                                mode="multiple"-->
<!--                                                placeholder="输入或选择"-->
<!--                                                :value="selectedItems"-->
<!--                                                size="small"-->
<!--                                                @change="handleChange"-->
<!--                                        >-->
<!--                                            <a-select-option v-for="item in filteredOptions" :key="item" :value="item">-->
<!--                                                {{ item }}-->
<!--                                            </a-select-option>-->
<!--                                        </a-select>-->
<!--                                    </a-form-item>-->
                                    <a-form-item label="店铺名称" :labelCol="{span: 8}" v-model="orderForm.shop_name" :wrapperCol="{span: 15, offset: 1}">
                                        <a-input v-model="orderForm.shop_name" size="small"></a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单编号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.trade_no" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="付款账户" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.pay_account" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单状态" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select
                                                show-search
                                                option-filter-prop="children"
                                                :filter-option="filterOption"
                                                placeholder="请选择" v-model="orderForm.trade_status" size="small"
                                        >
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
                            </a-row>
                            <a-row type="flex" v-if="advanced">
                                <a-col :span="6">
                                    <a-form-item label="货品名称" :labelCol="{span: 8}" :wrapperCol="{span: 14, offset: 1}">
                                        <a-input v-model="orderForm.goods_name" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单类型" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.trade_type" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="退款状态" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.refund_status" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="收件人姓名" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.receiver_name" size="small">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="16">
                                <a-col :md="7" >
                                    <a-form-item
                                            label="下单周期"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="orderOnChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="付款周期"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="moneyOnChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="递交周期"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="deliverOnChange" size="small">
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
                <el-table
                        :data="data"
                        border
                        style="width: 150%; margin-top: 10px"
                        v-loading="loading">
                    <el-table-column
                            fixed
                            prop="tradeNo"
                            label="订单编号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="platformType"
                            label="平台类型"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="shopName"
                            label="店铺名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="warehouseName"
                            label="仓库名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="warehouseType"
                            label="仓库类型"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="srcTids"
                            label="原始单号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="tradeStatus"
                            label="订单状态"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="consignStatus"
                            label="发货状态"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="platformConsignStatus"
                            label="平台发货状态"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="tradeType"
                            label="订单类型"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="deliveryTerm"
                            label="发货条件"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="freezeReason"
                            label="冻结原因"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="refundStatus"
                            label="退款状态"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="fenxiaoType"
                            label="分销类别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="fenxiaoNick"
                            label="分销商名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="tradeTime"
                            label="下单时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="payTime"
                            label="付款时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="payAccount"
                            label="买家付款账号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="buyerNick"
                            label="客户网名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverName"
                            label="收件人"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverArea"
                            label="省市县"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverAddress"
                            label="地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="receiverMobile"
                            label="手机"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverTelno"
                            label="电话"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverZip"
                            label="邮编"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverRing"
                            label="区域"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="receiverDtb"
                            label="大头笔"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="toDeliverTime"
                            label="派送时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="logisticsName"
                            label="物流公司"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="logisticsNo"
                            label="物流单号"
                            width="120">
                    </el-table-column>
                    <el-table-column prop="buyerMessage" label="买家留言" width="100" />
                    <el-table-column prop="csRemark" label="客服备注" width="100" />
                    <el-table-column prop="remarkFlag" label="标旗" width="100" />
                    <el-table-column prop="printRemark" label="打印备注" width="100" />
                    <el-table-column prop="goodsTypeCount" label="货品种类数" width="100" />
                    <el-table-column prop="goodsCount" label="货品总数" width="100" />
                    <el-table-column prop="goodsAmount" label="货品总额" width="100" />
                    <el-table-column prop="postAmount" label="邮资" width="100" />
                    <el-table-column prop="otherAmount" label="其它费用" width="100" />
                    <el-table-column prop="discount" label="优惠" width="100" />
                    <el-table-column prop="receivable" label="应收金额" width="100" />
                    <el-table-column prop="outputTax" label="销项税" width="100" />
                    <el-table-column prop="dapAmount" label="款到发货金额" width="100" />
                    <el-table-column prop="codAmount" label="COD金额" width="100" />
                    <el-table-column prop="extCodFee" label="买家COD费用" width="100" />
                    <el-table-column prop="commission" label="佣金" width="100" />
                    <el-table-column prop="goodsCost" label="货品预估成本" width="100" />
                    <el-table-column prop="postCost" label="预估邮资成本" width="100" />
                    <el-table-column prop="paid" label="已付金额" width="100" />
                    <el-table-column prop="weight" label="预估重量" width="100" />
                    <el-table-column prop="profit" label="预估毛利" width="100" />
                    <el-table-column prop="invoiceType" label="发票类型" width="100" />
                    <el-table-column prop="invoiceTitle" label="发票抬头" width="100" />
                    <el-table-column prop="invoiceContent" label="发票内容" width="100" />
                    <el-table-column prop="salesman" label="业务员" width="100" />
                    <el-table-column prop="checkerName" label="审核人" width="100" />
                    <el-table-column prop="fchecker" label="财审人" width="100" />
                    <el-table-column prop="checkouter" label="签出人" width="100" />
                    <el-table-column prop="stockoutNo" label="出库单号" width="100" />
                    <el-table-column prop="flagName" label="标记名称" width="100" />
                    <el-table-column prop="disposeDays" label="处理天数" width="100" />
                    <el-table-column prop="tradeFrom" label="订单来源" width="100" />
                    <el-table-column prop="singleSpecNo" label="商家编码" width="100" />
                    <el-table-column prop="rawGoodsCount" label="原始货品种类数" width="100" />
                    <el-table-column prop="rawGoodsTypeCount" label="原始货品数量" width="100" />
                    <el-table-column prop="submitTime" label="递交时间" width="100" />
                    <el-table-column prop="currency" label="币种" width="100" />
                    <el-table-column prop="splitPackageNum" label="线上包裹拆分数" width="100" />
                    <el-table-column prop="activationTime" label="激活时间" width="100" />
                    <el-table-column prop="Invoiced" label="已开具发票" width="100" />
                    <el-table-column prop="volume" label="体积" width="100" />
                    <el-table-column prop="idCard" label="证件号码" width="100" />
                    <el-table-column prop="loadTime" label="加载时间" width="100" />
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="orderInfo(scope.row)" type="text" size="small">查看详情</el-button>
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
                            <span v-if="props.value !== '25'">{{ props.value }}条/页</span>
                            <span v-if="props.value === '25'">全部</span>
                        </template>
                    </a-pagination>
                </div>
            </div>
            <div class="detail-display">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1">
                      <span slot="tab">
                        <a-icon type="apple" />
                        货品列表
                      </span>
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    fixed
                                    prop="shopName"
                                    label="平台"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    prop="goodsName"
                                    label="货品名称"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="shortName"
                                    label="货品简称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="apiSpecName"
                                    label="规格名称"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="sonSrcTid"
                                    label="原始订单编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="zidanTid"
                                    label="子订单编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="specNo"
                                    label="商家编码"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsNo"
                                    label="货品编号"
                                    width="150">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="specCount"-->
<!--                                    label="规格码"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="goodsNo"
                                    label="主条码"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="标价"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsDiscount"
                                    label="商品总优惠"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="orderPrice"
                                    label="成交价"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="sharePrice"
                                    label="分摊后价格"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="discount"
                                    label="折扣"
                                    width="120">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop=""-->
<!--                                    label="成本价"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="货品别名"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="num"
                                    label="下单数量"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="actualNum"
                                    label="实发数"
                                    width="120">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="库存"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="可审核库存"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="share_amount"
                                    label="分摊后总价"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="share_post"
                                    label="分摊邮费"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="single_paid"
                                    label="单品支付金额"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="commission"
                                    label="佣金"
                                    width="120">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="组合装数量"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="preWeight"
                                    label="估重"
                                    width="120">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="体积"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column-->
<!--                                    prop="alias"-->
<!--                                    label="担保方式"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    prop="refund_status"
                                    label="退款状态"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="gift_type"
                                    label="赠品方式"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="invoice_needed"
                                    label="发票"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="api_goods_name"
                                    label="平台货品名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="api_spec_name"
                                    label="平台规格名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="brandName"
                                    label="品牌名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    prop="paid"
                                    label="订单支付金额"
                                    width="120">
                            </el-table-column>
<!--                            <el-table-column-->
<!--                                    prop="goodsType"-->
<!--                                    label="货品类别"-->
<!--                                    width="120">-->
<!--                            </el-table-column>-->
                        </el-table>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-card>
    </div>
</template>

<script>
    const OPTIONS = ['林家铺子天猫旗舰店','林家铺子京东旗舰店','林家铺子京东自营旗舰店','林家铺子拼购旗舰店','KU','林家铺子苏宁旗舰店',
        '有赞','林家铺子贝贝网旗舰店','唯品会','每日优鲜','云集微店','达令家','林家铺子阿里巴巴店','林家铺子每日一淘店','一淘POP',
        '拼多多旗舰店','林家铺子拼多多','拼多多工厂旗舰店','林家铺子淘宝分销','魔筷星选','萌推','洋葱','BA','小红书','蘑菇街',
        '林家铺子抖音小店','林家铺子人人店','尽果旗舰店','林家铺子贝店仓','尚品先锋','海狸先生','米九','环球APP','惠买APP','张燕',
        '微信','补单','FL','三浦堂','国美在线','中盈','钻技生态链','海豚家','推推购','和赢农业','天成汇业','薛婷','吴吉芳','陈思宇',
        '海嘉','悦淘','梦想小店','嗨吃宝宝','禾田青','侠侣','益划','诗颖','链上优品','高鑫晶','亿海','悟空掌柜','华榕','镭殿','罗马优鲜',
        '壹周壹花','顺大厨','食货星球','笙之鸣','联联周边游','云货优选','阿浩优选'];
    export default {
        name: "manage",
        data() {
            return {
                // 搜索栏
                selectedItems: [],
                orderForm: {
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
                // 列表
                data:[],
                loading: true,
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 200,
                amount: 0,
                flag: 0,
                // token
                tokenStr: '',
                // 详情标签页
                dt: false,
                valueOfCol:{},
                // 标签
                tableData:[]
            };
        },
        computed: {
            filteredOptions() {
                return OPTIONS.filter(o => !this.selectedItems.includes(o));
            },
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            console.log(tokenStr)
            axios.get('http://192.168.1.106:8080/backend/order/listOrders/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
                console.log(res.data)
                that.data = res.data.data
                this.loading=false
            }).catch()
        },
        mounted(){
            // data amount of book maps
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://192.168.1.106:8080/backend/order/countOrders',{headers:{
                    token : tokenStr}}).then( res => {
                console.log(res.data)
                that.total = res.data.data
                that.amount = res.data.data
            }).catch()
        },
        methods: {
            // 选择器
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            handleChange(selectedItems) {
                this.selectedItems = selectedItems;
            },
            // 多选
            onChange(checkedValues) {
                console.log('checked = ', checkedValues);
            },
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            // 时间段
            orderOnChange(date, dateString) {
                this.orderForm.orderDateStart =dateString[0]
                this.orderForm.orderDateEnd = dateString[1]
            },
            moneyOnChange(date, dateString) {
                this.orderForm.orderPayDateStart =dateString[0]
                this.orderForm.orderPayDateEnd = dateString[1]
            },
            deliverOnChange(date, dateString) {
                this.orderForm.orderSubmitDateStart =dateString[0]
                this.orderForm.orderSubmitDateEnd = dateString[1]
            },
            // 提交
            submitList(){
                const that = this
                const list = that.orderForm
                console.log(list)
                console.log(that.tokenStr)
                if(that.flag===0) {
                    for (let i in list) {
                        console.log(list[i])
                        if (list[i]) {
                            axios.get('http://192.168.1.106:8080/backend/order/getOrders/1/5', {
                                params: {
                                    trade_no: list.trade_no,
                                    shop_name: list.shop_name,
                                    pay_account: list.pay_account,
                                    trade_status: list.trade_status,
                                    goods_name: list.goods_name,
                                    trade_type: list.trade_type,
                                    refund_status: list.refund_status,
                                    receiver_name: list.receiver_name,
                                    orderDateStart: list.orderDateStart,
                                    orderDateEnd: list.orderDateEnd,
                                    orderPayDateStart: list.orderPayDateStart,
                                    orderPayDateEnd: list.orderPayDateEnd,
                                    orderSubmitDateStart: list.orderSubmitDateStart,
                                    orderSubmitDateEnd: list.orderSubmitDateEnd,
                                },
                                headers: {token: that.tokenStr},
                                tokenBackend: that.tokenStr,
                            }).then(res => {
                                console.log(typeof (res.data.code))
                                if (res.data.code === 3) {
                                    alert('未能查找到订单相关信息，订单明细缺失！！')
                                    console.log('cuowu')
                                } else if (res.data.code === 0) {
                                    that.data = res.data.data
                                    this.loading = false
                                    that.total = res.data.total
                                }
                            }).catch()
                            break
                        } else if (i === 'orderSubmitDateEnd' && list[i] === '') {
                            alert("请输入查询信息！！")
                        } else {
                            continue
                        }
                    }
                }
                else {
                    axios.get('http://192.168.1.106:8080/backend/order/getOrders'+this.current+'/'+ this.pageSize, {
                        params: {
                            trade_no: list.trade_no,
                            shop_name: list.shop_name,
                            pay_account: list.pay_account,
                            trade_status: list.trade_status,
                            goods_name: list.goods_name,
                            trade_type: list.trade_type,
                            refund_status: list.refund_status,
                            receiver_name: list.receiver_name,
                            orderDateStart: list.orderDateStart,
                            orderDateEnd: list.orderDateEnd,
                            orderPayDateStart: list.orderPayDateStart,
                            orderPayDateEnd: list.orderPayDateEnd,
                            orderSubmitDateStart: list.orderSubmitDateStart,
                            orderSubmitDateEnd: list.orderSubmitDateEnd,
                        },
                        headers: {token: that.tokenStr},
                        tokenBackend: that.tokenStr
                    }).then(res => {
                        console.log(typeof (res.data.code))
                        if (res.data.code === 3) {
                            alert('未能查找到订单相关信息，订单明细缺失！！')
                            console.log('cuowu')
                        } else if (res.data.code === 0) {
                            that.data = res.data.data
                            this.loading = false
                            that.total = res.data.data.length
                        }
                    }).catch()
                }
            },
            resetInput(){
                const that = this
                document.getElementById("omForm").reset()
                this.orderForm = {
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
                axios.get('http://192.168.1.106:8080/backend/order/listOrders/1/5', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    that.data = res.data.data
                    this.loading=false
                    this.flag = 0
                    this.total = this.amount
                }).catch()
            },
            //表格操作JY201904290699
            orderInfo(row){
                console.log(row.tradeNo)
                this.valueOfCol = row
                const that = this
                axios.get('http://192.168.1.106:8080/backend/order/getOrderDetail', {
                    params : {tradeNo : row.tradeNo},
                    headers : {token : this.tokenStr},
                    tokenBackend : this.tokenStr
                }).then( res => {
                    console.log("此处应该有货品信息")
                    // console.log(res.data)
                    if(res.data.data != null){
                        console.log(res.data.data)
                        that.tableData = res.data.data
                    }
                    else{
                        alert("未能查找到订单相关信息，订单明细缺失！！")
                    }
                }).catch()
                // axios.get('http://192.168.1.106:8080/backend/goods/getGoods', {
                //     params : {tradeNo : value.tradeNo},
                //     headers : {token : this.tokenStr},
                // }).then( res => {
                //     console.log("此处应该有货品信息")
                //     if(res.data.data.length){
                //         console.log(res.data.data)
                //         that.tableData = res.data.data
                //     }
                //     else{
                //         alert("未能查找到订单相关信息，订单明细缺失！！")
                //     }
                // }).catch()
                this.dt = true
            },
            // 分页
            currentPage(currentPage, size){
                const that = this
                if(that.flag===0) {
                    axios.get('http://192.168.1.106:8080/backend/order/listOrders/' + currentPage + '/' + size, {
                        headers: {
                            token: this.tokenStr
                        }
                    }).then(res => {
                        // console.log(res.data.data)
                        that.data = res.data.data
                        this.loading = false
                    }).catch()
                }
                else {
                    this.submitList()
                }
            },
            onShowSizeChange(current, size) {
                console.log("页面数据量")
                console.log(size)
                this.pageSize = size;
                const that = this
                if(that.flag===0) {
                    axios.get('http://192.168.1.106:8080/backend/order/listOrders/'+current+'/'+size, {headers:{
                            token : this.tokenStr}}).then(res => {
                        that.data = res.data.data
                        this.loading=false
                    }).catch()
                }
                else {
                    this.submitList()
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