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
                                    <a-form-item label="购买总金额" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseAmount"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="购买总量" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseNum"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="省份" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.province"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="8">
                                <a-col :span="6" >
                                    <a-form-item label="城市" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input placeholder="请输入" size="small" v-model="clientForm.city"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item
                                            label="客户登记时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="registerOnChange" size="small" :value="createValueR">
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
                                        <a-range-picker @change="shoppingOnChange" size="small" :value="createValueP">
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
                <el-tabs v-model="activeName" type="card" @tab-click="showClient" style="margin-top: 10px">
                    <el-tab-pane label="重要客户" name="first">
                        <el-table
                                :data="importantData"
                                border
                                v-loading="loading"
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
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="buyerNick"
                                    label="客户网名"
                                    width="170">
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
                                    width="160">
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
                                    width="160">
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
                                    width="160">
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
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="registrationTime"
                                    label="登记时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    width="300">
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
                                    width="160">
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
                    </el-tab-pane>
                    <el-tab-pane label="普通客户" name="second">
                        <el-table
                                :data="tableData"
                                border
                                v-loading="loading"
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
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="buyerNick"
                                    label="客户网名"
                                    width="170">
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
                                    width="160">
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
                                    width="160">
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
                                    width="160">
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
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="registrationTime"
                                    label="登记时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    width="300">
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
                                    width="160">
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
                    </el-tab-pane>
                </el-tabs>
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
                            <span v-if="orderDetail">您正在查看用户---{{orderDetail}}---的历史订单</span>
                            </br>
                            <el-table
                                    :data="historyData"
                                    style="width: 100%"
                                    height="270"
                                    v-loading="loading0">
                                    <el-table-column
                                            prop="tradeNo"
                                            label="订单编号"
                                            width="150">
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
                                            prop="tradeTime"
                                            label="下单时间"
                                            width="160">
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
                                            width="120">
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
                                            prop="payTime"
                                            label="付款时间"
                                            width="160">
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
                                    <el-table-column prop="submitTime" label="递交时间" width="160" />
                                    <el-table-column prop="currency" label="币种" width="100" />
                                    <el-table-column prop="splitPackageNum" label="线上包裹拆分数" width="100" />
                                    <el-table-column prop="activationTime" label="激活时间" width="160" />
                                    <el-table-column prop="Invoiced" label="已开具发票" width="100" />
                                    <el-table-column prop="volume" label="体积" width="100" />
                                    <el-table-column prop="idCard" label="证件号码" width="100" />
                                    <el-table-column prop="loadTime" label="加载时间" width="160" />
                                </el-table>
                            <span>共{{total0}}条数据</span>
                            <div class="page-roll">
<!--                     show-size-changer
                                        show-quick-jumper           -->
                                <a-pagination
                                        v-model="current0"
                                        :total="total0"
                                        :page-size="pageSize0"
                                        @showSizeChange="onShowSizeChange0"
                                        @change="currentPage0"
                                >
                                    <template slot="buildOptionText" slot-scope="props">
                                        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                                        <span v-if="props.value === '50'">全部</span>
                                    </template>
                                </a-pagination>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
    export default {
        name: "Client",
        data() {
            return {
                // 数据
                tableData: [],
                importantData: [],
                loading: true,
                loading0: false,
                activeName: 'second',
                // 搜索栏
                clientType: '1',  // 客户类型，默认为普通客户1
                clientForm: {
                    customerName:'',
                    TotalPurchaseAmount:'',
                    TotalPurchaseNum:'',
                    province:'',
                    city:'',
                    LastPurchaseTimeDateStart:'',
                    LastPurchaseTimeDateEnd:'',
                    registrationTimeDateStart:'',
                    registrationTimeDateEnd:'',
                    PayDateStart:'',
                    PayDateEnd:'',
                },
                advanced: false,
                createValueB:[],
                createValueP:[],
                createValueS:[],
                createValueR:[],
                // 类型
                cType: "客户类型",
                rowData:{},
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                amount: 0,
                flag: 0,  // 普通客户分页标记，0为总表分页，1为查询分页
                current0: 1,
                pageSize0: 5,
                total0: 0,
                amount0: 0,
                flag0: 0,  // 重要客户分页标记，0为总表分页，1为查询分页
                //  token
                tokenStr: '',
                // 标签页
                historyData:[],
                orderDetail:''
            };
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
          axios.get('backend/customer/listCustomers/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
              this.tableData = res.data.data
              this.loading=false
          }).catch()
        },
        mounted(){
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('backend/customer/countCustomer',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data  // 普通用户表
                that.amount = res.data.data
            }).catch()
        },
        methods: {
            // 客户类型
            showClient(tab, event) {
                const that = this
                that.current = 1
                if(tab.index === '0'){
                    that.clientType = '0'
                    that.historyData = []
                    axios.get('backend/customer/listImpCustomers/1/5', {headers:{
                            token: this.tokenStr
                        }}).then( res => {
                        that.importantData = res.data.data
                        that.loading=false
                    }).catch()
                    axios.get('backend/customer/countImpCustomers', {headers:{
                            token: that.tokenStr
                        }}).then( res => {
                        that.total = res.data.data
                        that.amount = that.total
                    }).catch()
                }
                if(tab.index === '1') {
                    that.clientType = '1'
                    that.historyData = []
                    axios.get('backend/customer/listCustomers/1/5', {headers:{
                            token: that.tokenStr
                        }}).then( res => {
                        that.tableData = res.data.data
                        that.loading=false
                    }).catch()
                    axios.get('backend/customer/countCustomer', {headers:{
                            token : that.tokenStr}}).then( res => {
                        that.total = res.data.data
                        that.amount = res.data.data
                    }).catch()
                }
            },
            // 日期选择框
            shoppingOnChange(date, dateString) {
                this.createValueS = date
                this.clientForm.LastPurchaseTimeDateStart = dateString[0]
                this.clientForm.LastPurchaseTimeDateEnd = dateString[1]
            },
            registerOnChange(date, dateString) {
                this.createValueR = date;
                this.clientForm.registrationTimeDateStart = dateString[0]
                this.clientForm.registrationTimeDateEnd = dateString[1]
            },
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            submitList(){
                const that = this
                const list = that.clientForm
                this.loading = true
                for (let i in list) {
                    if (list[i]) {
                        if (that.clientType === '1') {
                            console.log("普通客户查询"+that.clientType)
                            axios.get('backend/customer/getCustomers/1/5', {
                                params: {
                                    customerName: list.customerName,
                                    TotalPurchaseAmount: list.TotalPurchaseAmount,
                                    TotalPurchaseNum: list.TotalPurchaseNum,
                                    province:list.province,
                                    city:list.city,
                                    LastPurchaseTimeDateStart: list.LastPurchaseTimeDateStart,
                                    LastPurchaseTimeDateEnd: list.LastPurchaseTimeDateEnd,
                                    PayDateStart: list.PayDateStart,
                                    PayDateEnd: list.PayDateEnd,
                                    registrationTimeDateStart: list.registrationTimeDateStart,
                                    registrationTimeDateEnd: list.registrationTimeDateEnd,
                                },
                                headers: {token: that.tokenStr},
                                tokenBackend: that.tokenStr
                            }).then(res => {
                                if (res.data.code === 3) {
                                    this.$message.error('未能查找到该客户的相关信息！！')
                                } else if (res.data.code === 0) {
                                    this.$message({
                                        message: '查询客户信息成功！',
                                        type: 'success'
                                    });
                                    that.tableData = res.data.data.list
                                    that.loading = false
                                    that.total = res.data.data.total
                                    that.flag = 1
                                    that.current = 1
                                }
                            }).catch()
                            break
                        } else {
                            console.log("重要客户查询"+that.clientType)
                            axios.get('backend/customer/selectImpCustomersFromCustomerIm/1/5', {
                                params: {
                                    customerName: list.customerName,
                                    TotalPurchaseAmount: list.TotalPurchaseAmount,
                                    TotalPurchaseNum: list.TotalPurchaseNum,
                                    province:list.province,
                                    city:list.city,
                                    LastPurchaseTimeDateStart: list.LastPurchaseTimeDateStart,
                                    LastPurchaseTimeDateEnd: list.LastPurchaseTimeDateEnd,
                                    PayDateStart: list.PayDateStart,
                                    PayDateEnd: list.PayDateEnd,
                                    registrationTimeDateStart: list.registrationTimeDateStart,
                                    registrationTimeDateEnd: list.registrationTimeDateEnd,
                                },
                                headers: {token: that.tokenStr},
                                tokenBackend: that.tokenStr
                            }).then(res => {
                                if (res.data.code === 3) {
                                    this.$message.error('未能查找到该客户的相关信息！！')
                                    that.loading = false
                                } else if (res.data.code === 0) {
                                    this.$message({
                                        message: '查询客户信息成功！',
                                        type: 'success'
                                    });
                                    that.importantData = res.data.data.list
                                    that.loading = false
                                    that.total = res.data.total
                                    that.flag0 = 1
                                    that.current = 1
                                }
                            }).catch()
                            break
                        }
                    } else if (i === 'LastPurchaseTimeDateEnd' && list[i] === '') {
                        this.$message.error('请输入查询信息！！')
                        this.loading = false
                    } else {
                        continue
                    }
                }
            },
            resetInput(){
                const that = this
                that.loading = true
                document.getElementById("cForm").reset()
                that.clientForm = {
                    customerName:'',
                    TotalPurchaseAmount:'',
                    TotalPurchaseNum:'',
                    province:'',
                    city:'',
                    LastPurchaseTimeDateStart:'',
                    LastPurchaseTimeDateEnd:'',
                    registrationTimeDateStart:'',
                    registrationTimeDateEnd:'',
                    PayDateStart:'',
                    PayDateEnd:'',
                }
                that.createValueB=[]
                that.createValueP=[]
                that.createValueR=[]
                that.createValueS=[]
                axios.get('backend/customer/listCustomers/1/5', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    // // console.log(res.data)
                    that.tableData = res.data.data
                    this.loading=false
                    that.total = that.amount
                    that.flag = 0
                }).catch()
                this.$message('搜索表单已重置！');
                that.showClient()
            },
            // el表格
            handleClick(row) {
                const that = this
                that.loading0 = true
                console.log("行")
                console.log(row.buyerNick)
                if(this.flag0 === 0){
                    axios.get('backend/order/OrderHistory/1/5',{
                        params: {
                            buyerNick: row.buyerNick,
                        },
                        headers:{token: that.tokenStr},
                    }).then(res => {
                        // console.log(res.data.data)
                        if(res.data.data === null){
                            this.$message.error('未能查找到用户'+row.buyerNick+"的历史订单！")
                            that.loading0 = false
                        }else{
                            this.$message({
                                message: "查找用户"+row.buyerNick+"的历史订单成功！！",
                                type: 'success'
                            });
                            that.historyData = res.data.data.list
                            that.orderDetail = row.buyerNick
                            that.total0 = res.data.data.total
                        }
                        that.loading0 = false
                    }).catch()
                }
               else {
                   console.log("调用我")
                   console.log(this.current0,this.pageSize0)
                    axios.get('backend/order/OrderHistory/'+this.current0+'/'+this.pageSize0,{
                        params: {
                            buyerNick: row.buyerNick,
                        },
                        headers:{token: that.tokenStr},
                    }).then(res => {
                        if(res.data.data === null){
                            this.$message.error('未能查找到用户'+row.buyerNick+"的历史订单！")
                            that.loading0 = false
                        }else{
                            this.$message({
                                message: "查找用户"+row.buyerNick+"的历史订单成功！！",
                                type: 'success'
                            });
                            that.historyData = res.data.data.list
                            that.total0 = res.data.data.total
                            that.loading0 = false
                        }
                    }).catch()
                }
            },
            // 分页
            currentPage(currentPage, size){
                const that = this
                that.loading = true
                if(that.clientType==='0') {
                    if(that.flag0===0) {
                        console.log("重要客户总表分页" + that.clientType)
                        axios.get('backend/customer/listImpCustomers/' + currentPage + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.importantData = res.data.data
                            this.loading = false
                        }).catch()
                    }
                    else {
                        console.log("重要客户查询翻页")
                        axios.get('backend/customer/selectImpCustomersFromCustomerIm/'+currentPage+'/'+ size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province:that.clientForm.province,
                                city:that.clientForm.city,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: this.tokenStr},
                            tokenBackend: this.tokenStr
                        }).then(res => {
                            if(res.data.code === 0) {
                                that.tableData = res.data.data.list
                                this.loading=false
                            }
                        }).catch()
                    }
                }
                else {
                    if(that.flag===0) {
                        console.log("普通客户总表分页"+that.clientType)
                        axios.get('backend/customer/listCustomers/' + currentPage + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.tableData = res.data.data
                            this.loading = false
                        }).catch()
                    }
                    else {
                        console.log("普通客户查询分页"+that.clientType)
                        axios.get('backend/customer/getCustomers/'+currentPage+'/'+ size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province:that.clientForm.province,
                                city:that.clientForm.city,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: that.tokenStr},
                            tokenBackend: that.tokenStr
                        }).then(res => {
                            if(res.data.code === 0) {
                                that.tableData = res.data.data.list
                                that.loading=false
                            }
                        }).catch()
                    }
                }
            },
            onShowSizeChange(current, size) {
                this.pageSize = size
                const that = this
                that.loading = true
                if(that.clientType==='0') {
                    if(that.flag0===0) {
                        console.log("重要客户总表分页" + that.clientType)
                        axios.get('backend/customer/listImpCustomers/' + current + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.importantData = res.data.data
                            this.loading = false
                        }).catch()
                    }
                    else {
                        console.log("重要客户查询翻页")
                        axios.get('backend/customer/selectImpCustomersFromCustomerIm/'+this.current+'/'+ size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province:that.clientForm.province,
                                city:that.clientForm.city,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: this.tokenStr},
                            tokenBackend: this.tokenStr
                        }).then(res => {
                            if(res.data.code === 0) {
                                that.tableData = res.data.data.list
                                this.loading=false
                            }
                        }).catch()
                    }
                }
                else {
                    if(that.flag===0) {
                        console.log("普通客户总表分页"+that.clientType)
                        axios.get('backend/customer/listCustomers/' + current + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.tableData = res.data.data
                            this.loading = false
                        }).catch()
                    }
                    else {
                        console.log("普通客户查询分页"+that.clientType)
                        axios.get('backend/customer/getCustomers/'+ current +'/'+ size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province:that.clientForm.province,
                                city:that.clientForm.city,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: that.tokenStr},
                            tokenBackend: that.tokenStr
                        }).then(res => {
                            if(res.data.code === 0) {
                                that.tableData = res.data.data.list
                                that.loading=false
                            }
                        }).catch()
                    }
                }
            },
            // 订单详情级联分页
            currentPage0(currentPage, size){
                console.log("历史订单分页")
                const that = this
                that.loading0 = true
                if(that.clientType==='0'){
                    console.log("历史订单分页")
                    axios.get('backend/customer/listCustomers/'+currentPage+'/'+size, {headers:{
                            token : this.tokenStr}}).then(res => {
                        that.tableData = res.data.data
                        this.loading0=false
                    }).catch()
                }
                else {
                    console.log("翻页"+currentPage)
                    this.handleClick()
                }
            },
            onShowSizeChange0(current, size) {
                console.log("历史订单分页")
                this.pageSize0 = size
                const that = this
                that.loading0 = true
                if(that.clientType==='0'){
                    axios.get('backend/customer/listCustomers/'+current+'/'+size, {headers:{
                            token : this.tokenStr}}).then(res => {
                        that.tableData = res.data.data
                        this.loading0=false
                    }).catch()
                }
                else {
                    console.log("页面容量变动"+size)
                    this.handleClick()
                }
            },
            // 标签页
            callback(key) {
                // console.log(key);
            },
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
    .page-roll {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>