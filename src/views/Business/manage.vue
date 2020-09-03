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
                                    <a-form-item label="店铺名称" :labelCol="{span: 8}" :wrapperCol="{span: 10, offset: 1}">
                                        <a-row>
                                            <a-col :span="23">
                                                <a-input v-model="orderForm.shop_name" size="small">
                                                </a-input>
                                            </a-col>
                                           <a-col :span="1">
                                               <a-popover style="height:24px" placement="bottomRight" >
                                                   <template slot="title">
                                                       <a-input placeholder="输入关键字查询" />
                                                   </template>
                                                   <div slot="content" style=" overflow-y:auto; overflow-x:auto; width:300px; height:200px;">
                                                       <a-checkbox @change="onChange">林家铺子天猫旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子京东旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子京东自营旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子拼购旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">KU</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子苏宁旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">有赞</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子贝贝网旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">唯品会</a-checkbox><br />
                                                       <a-checkbox @change="onChange">每日优鲜</a-checkbox><br />
                                                       <a-checkbox @change="onChange">云集微店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">达令家</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子阿里巴巴店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子每日一淘店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">一淘POP</a-checkbox><br />
                                                       <a-checkbox @change="onChange">拼多多旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子拼多多</a-checkbox><br />
                                                       <a-checkbox @change="onChange">拼多多工厂旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子淘宝分销</a-checkbox><br />
                                                       <a-checkbox @change="onChange">魔筷星选</a-checkbox><br />
                                                       <a-checkbox @change="onChange">萌推</a-checkbox><br />
                                                       <a-checkbox @change="onChange">洋葱</a-checkbox><br />
                                                       <a-checkbox @change="onChange">BA</a-checkbox><br />
                                                       <a-checkbox @change="onChange">小红书</a-checkbox><br />
                                                       <a-checkbox @change="onChange">蘑菇街</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子抖音小店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子人人店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">尽果旗舰店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">林家铺子贝店仓</a-checkbox><br />
                                                       <a-checkbox @change="onChange">尚品先锋</a-checkbox><br />
                                                       <a-checkbox @change="onChange">海狸先生</a-checkbox><br />
                                                       <a-checkbox @change="onChange">米九</a-checkbox><br />
                                                       <a-checkbox @change="onChange">环球APP</a-checkbox><br />
                                                       <a-checkbox @change="onChange">惠买APP</a-checkbox><br />
                                                       <a-checkbox @change="onChange">张燕</a-checkbox><br />
                                                       <a-checkbox @change="onChange">微信</a-checkbox><br />
                                                       <a-checkbox @change="onChange">补单</a-checkbox><br />
                                                       <a-checkbox @change="onChange">FL</a-checkbox><br />
                                                       <a-checkbox @change="onChange">三浦堂</a-checkbox><br />
                                                       <a-checkbox @change="onChange">国美在线</a-checkbox><br />
                                                       <a-checkbox @change="onChange">中盈</a-checkbox><br />
                                                       <a-checkbox @change="onChange">钻技生态链</a-checkbox><br />
                                                       <a-checkbox @change="onChange">海豚家</a-checkbox><br />
                                                       <a-checkbox @change="onChange">推推购</a-checkbox><br />
                                                       <a-checkbox @change="onChange">和赢农业</a-checkbox><br />
                                                       <a-checkbox @change="onChange">天成汇业</a-checkbox><br />
                                                       <a-checkbox @change="onChange">薛婷</a-checkbox><br />
                                                       <a-checkbox @change="onChange">吴吉芳</a-checkbox><br />
                                                       <a-checkbox @change="onChange">陈思宇</a-checkbox><br />
                                                       <a-checkbox @change="onChange">海嘉</a-checkbox><br />
                                                       <a-checkbox @change="onChange">悦淘</a-checkbox><br />
                                                       <a-checkbox @change="onChange">梦想小店</a-checkbox><br />
                                                       <a-checkbox @change="onChange">嗨吃宝宝</a-checkbox><br />
                                                       <a-checkbox @change="onChange">禾田青</a-checkbox><br />
                                                       <a-checkbox @change="onChange">侠侣</a-checkbox><br />
                                                       <a-checkbox @change="onChange">益划</a-checkbox><br />
                                                       <a-checkbox @change="onChange">诗颖</a-checkbox><br />
                                                       <a-checkbox @change="onChange">链上优品</a-checkbox><br />
                                                       <a-checkbox @change="onChange">高鑫晶</a-checkbox><br />
                                                       <a-checkbox @change="onChange">亿海</a-checkbox><br />
                                                       <a-checkbox @change="onChange">悟空掌柜</a-checkbox><br />
                                                       <a-checkbox @change="onChange">华榕</a-checkbox><br />
                                                       <a-checkbox @change="onChange">镭殿</a-checkbox><br />
                                                       <a-checkbox @change="onChange">罗马优鲜</a-checkbox><br />
                                                       <a-checkbox @change="onChange">壹周壹花</a-checkbox><br />
                                                       <a-checkbox @change="onChange">顺大厨</a-checkbox><br />
                                                       <a-checkbox @change="onChange">食货星球</a-checkbox><br />
                                                       <a-checkbox @change="onChange">笙之鸣</a-checkbox><br />
                                                       <a-checkbox @change="onChange">联联周边游</a-checkbox><br />
                                                       <a-checkbox @change="onChange">云货优选</a-checkbox><br />
                                                       <a-checkbox @change="onChange">阿浩优选</a-checkbox><br />
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
                                                   </div>
                                                   <a-button><a-icon type="down" /></a-button>
                                               </a-popover>
                                           </a-col>
                                        </a-row>
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
                                        <a-select placeholder="请选择" v-model="orderForm.trade_status" size="small">
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
                                    <a-form-item label="货品名称" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
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
                <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500 }" :pagination="false" size="small" style="margin-top: 10px">
                    <a slot="action" slot-scope="text,record" @click="orderInfo(record)">查看详情</a>
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
                            <span v-if="props.value !== '25'">{{ props.value }}条/页</span>
                            <span v-if="props.value === '25'">全部</span>
                        </template>
                    </a-pagination>
                </div>
            </div>
            <div class="detail-display">
                <a-tabs default-active-key="2">
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
                                    prop="goodsNo"
                                    label="货品编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsName"
                                    label="货品名称"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="shortName"
                                    label="货品简称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="alias"
                                    label="货品别名"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="className"
                                    label="分类"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="brandName"
                                    label="品牌"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsType"
                                    label="货品类别"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="specCount"
                                    label="规格数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="基本单位"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="auxUnit"
                                    label="辅助单位"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="origin"
                                    label="产地"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="flagName"
                                    label="标记名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="prop1"
                                    label="自定义属性"
                                    width="120">
                            </el-table-column>
                        </el-table>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-card>
    </div>
</template>

<script>
    const columns = [
        { title: '订单编号', width: 100, dataIndex: 'tradeNo', key: 'tradeNo', 'fixed': 'left'},
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
        { title: '地址', width: 400, dataIndex: 'receiverAddress', key: '20' },
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
            title: '订单操作',
            key: 'operation',
            fixed: 'right',
            width: 80,
            scopedSlots: { customRender: 'action' },
        },
    ];
    const details={};
    export default {
        name: "manage",
        data() {
            return {
                // 搜索栏
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
                columns,
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 200,
                // token
                tokenStr: '',
                // 详情标签页
                details,
                dt: false,
                valueOfCol:{},
                // 标签
                tableData:[]
            };
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            axios.get('http://localhost:8080/backend/order/listOrders/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
                console.log(res.data)
                for (let i = 0; i <5; i++) {
                    res.data.data[i]['key'] = i
                    that.data.push(res.data.data[i])
                }
            }).catch()
        },
        mounted(){
            // data amount of book maps
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080/backend/order/countOrders',{headers:{
                    token : tokenStr}}).then( res => {
                console.log(res.data)
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
                const datalist = []
                console.log(list.trade_no)
                console.log(this.tokenStr)
                axios.get('http://localhost:8080/backend/order/getOrders', {
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
                    headers:{token: that.tokenStr},
                    tokenBackend: that.tokenStr
                }).then( res => {
                    console.log(res.data)
                    if(res.data.code === '3'){
                        alert('未能查找到订单相关信息，订单明细缺失！！')
                    }else{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i]['key'] = i
                            datalist.push(res.data.data[i])
                        }
                        that.data = datalist
                    }
                }).catch()
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
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrders/1/5', {headers:{
                        token: this.tokenStr
                    }}).then( res => {

                        for (let i = 0; i <5; i++) {
                            res.data.data[i]['key'] = i
                            datalist.push(res.data.data[i])
                        }
                        this.data = datalist
                }).catch()
            },
            //表格操作
            orderInfo(value){
                console.log(value)
                this.moreDetail(value.tradeNo)
                this.valueOfCol = value
            },
            // 分页
            currentPage(currentPage, size){
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/order/listOrders/'+currentPage+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <size; i++) {
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
                const that = this
                axios.get('http://localhost:8080/backend/order/getOrderDetail', {
                    params : {tradeNo : record_no},
                    headers : {token : this.tokenStr},
                    tokenBackend : this.tokenStr
                }).then( res => {
                    console.log("此处应该有货品信息")
                    console.log(res.data)
                    that.details = res.data.data[0]
                }).catch()
                console.log(that.details)
                this.dt = true
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