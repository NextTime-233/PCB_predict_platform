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
                                                <a-input v-model="orderForm.shop_name" >
                                                </a-input>
                                            </a-col>
                                           <a-col :span="1">
                                               <a-popover style="" placement="bottomRight">
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
                                        <a-input v-model="orderForm.trade_no">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="付款账户" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.pay_account">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单状态" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" v-model="orderForm.trade_status">
                                            <a-select-option value="1">已取消</a-select-option>
                                            <a-select-option value="2">未付款</a-select-option>
                                            <a-select-option value="3">待尾款</a-select-option>
                                            <a-select-option value="4">待选仓</a-select-option>
                                            <a-select-option value="5">等未付</a-select-option>
                                            <a-select-option value="6">延时审核</a-select-option>
                                            <a-select-option value="7">预订单</a-select-option>
                                            <a-select-option value="8">待抢单</a-select-option>
                                            <a-select-option value="9">待客审</a-select-option>
                                            <a-select-option value="10">待财审</a-select-option>
                                            <a-select-option value="11">已递交仓库</a-select-option>
                                            <a-select-option value="12">已审核</a-select-option>
                                            <a-select-option value="13">已发货</a-select-option>
                                            <a-select-option value="14">部分打款</a-select-option>
                                            <a-select-option value="15">已完成</a-select-option>
                                            <a-select-option value="16">异常发货</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row type="flex" v-if="advanced">
                                <a-col :span="6">
                                    <a-form-item label="货品名称" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.goods_name">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="订单类型" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.trade_type">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="退款状态" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.refund_status">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="收件人姓名" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input v-model="orderForm.receiver_name">
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
                                        <a-range-picker @change="orderOnChange">
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
                                        <a-range-picker @change="moneyOnChange">
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
                                        <a-range-picker @change="deliverOnChange">
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
                <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }" :pagination="false" size="small" style="margin-top: 10px">
                    <a slot="action" slot-scope="text,record" @click="orderInfo(record)">查看</a>
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
                                title=""
                                bordered
                                :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                        >
                            <a-descriptions-item label="平台">{{valueOfCol.platformType}}</a-descriptions-item>
                            <a-descriptions-item label="货品名称">{{details.apiGoodsName}}</a-descriptions-item>
                            <a-descriptions-item label="规格名称">{{details.apiSpecName}}</a-descriptions-item>
                            <a-descriptions-item label="货品编号">{{details.goodsNo}}</a-descriptions-item>
                            <a-descriptions-item label="原始订单编号">{{details.sonSrcTid}}</a-descriptions-item>
                            <a-descriptions-item label="子订单编号">{{details.zidanTid}}</a-descriptions-item>
                            <a-descriptions-item label="商家编码">{{valueOfCol.singleSpecNo}}</a-descriptions-item>
<!--                            <a-descriptions-item label="规格码">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="主条码">{{}}</a-descriptions-item>-->
                            <a-descriptions-item label="标价">{{details.price}}</a-descriptions-item>
                            <a-descriptions-item label="优惠">{{valueOfCol.discount}}</a-descriptions-item>
                            <a-descriptions-item label="成交价">{{details.orderPrice}}</a-descriptions-item>
<!--                            <a-descriptions-item label="分摊后价格">{{}}</a-descriptions-item>-->
                            <a-descriptions-item label="折扣">{{details.discount}}</a-descriptions-item>
<!--                            <a-descriptions-item label="成本价">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="下单数量">{{}}</a-descriptions-item>-->
                            <a-descriptions-item label="实发数">{{details.actualNum}}</a-descriptions-item>
<!--                            <a-descriptions-item label="库存">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="可审核库存">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="分摊后总价">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="分摊邮费">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="已付">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="佣金">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="拆自组合装">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="组合打印方式">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="组合装数量">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="估重">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="体积">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="担保方式">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="退款状态">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="赠品方式">{{details.giftType}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="发票">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="平台货品名称">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="平台规格名称">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="原始单标记">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="备注">{{details.buyerMessage}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="品牌名称">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="税率">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="采购在途量">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="采购到货量">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="待采购量">{{}}</a-descriptions-item>-->
<!--                            <a-descriptions-item label="生产在途量">{{}}</a-descriptions-item>-->
                        </a-descriptions>
                    </div>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                      <span slot="tab">
                        <a-icon type="unordered-list" />
                        订单详情
                      </span>
                        <template v-if="dt">
                            <a-descriptions title="" bordered>
                                <a-descriptions-item label="订单编号">{{details.tradeNo}}</a-descriptions-item>
                                <a-descriptions-item label="原始单号">{{details.sonSrcTid}}</a-descriptions-item>
                                <a-descriptions-item label="店铺">{{details.shopName}}</a-descriptions-item>
                                <a-descriptions-item label="仓库">{{details.warehouseName}}</a-descriptions-item>
                                <a-descriptions-item label="物流公司">{{details.logisticsName}}</a-descriptions-item>
                                <a-descriptions-item label="客户网名">{{details.buyerNick}}</a-descriptions-item>
                                <a-descriptions-item label="收件人">{{details.receiverName}}</a-descriptions-item>
                                <a-descriptions-item label="地区">{{details.receiverArea}}</a-descriptions-item>
                                <a-descriptions-item label="地址">{{details.receiverAddress}}</a-descriptions-item>
                                <a-descriptions-item label="邮编">{{details.receiverZip}}</a-descriptions-item>
                                <a-descriptions-item label="手机">{{details.receiverMobil}}</a-descriptions-item>
<!--                                <a-descriptions-item label="固话">{{details.receiverTelno}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="送货时间">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="包装">{{details.}}</a-descriptions-item>-->
                                <a-descriptions-item label="货到付款">{{details.cashOnDelivery}}</a-descriptions-item>
<!--                                <a-descriptions-item label="退款状态">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="分校类别">{{details.}}</a-descriptions-item>-->
                                <a-descriptions-item label="下单时间">{{details.tradeTime}}</a-descriptions-item>
                                <a-descriptions-item label="付款时间">{{details.payTime}}</a-descriptions-item>
<!--                                &lt;!&ndash; 一共分为四份 :span="2"  &ndash;&gt;-->
<!--                                <a-descriptions-item label="总货款">{{details.orderPrice}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="邮费">-->
<!--                                    <a-badge status="processing" text="Running" />-->
<!--                                </a-descriptions-item>-->
<!--                                <a-descriptions-item label="优惠">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="应收">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="货到付款金额">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="邮费估算成本">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="货品估算成本">{{details.goodsCost}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="估重">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="物流单号">{{details.logisticsNo}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="已付">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="发票类型">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="发票抬头">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="发票内容">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="佣金">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="买家COD费用">{{details.}}</a-descriptions-item>-->
                                <a-descriptions-item label="订单类别">{{details.tradeType}}</a-descriptions-item>
<!--                                <a-descriptions-item label="标旗">{{details.}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="业务员">{{details.checker}}</a-descriptions-item>-->
<!--                                <a-descriptions-item label="签出人">{{details.fchecker}}</a-descriptions-item>-->
                                <a-descriptions-item label="递交时间">{{valueOfCol.submitTime}}</a-descriptions-item>
                            </a-descriptions>
                        </template>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-card>
    </div>
</template>

<script>
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
    const data = [];
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
            //    详情标签页
                details:{},
                dt: false,
                valueOfCol:{},
            };
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            axios.get('http://localhost:8080/backend/order/listOrders/1/10', {headers:{
                token: tokenStr
            }}).then( res => {
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
                const list = this.orderForm
                if(0){
                    console.log(list)
                }
                else{
                    console.log("提交表单")
                    axios.get('http://localhost:8080/backend/order/getOrders', {
                        params:{
                            trade_no: list.trade_no,
                            shop_name: list.shop_name,
                            pay_account:  list.pay_account,
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
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        let list = []
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i]['key'] = i
                            list.push(res.data.data[i])
                        }
                        this.data = list
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
                axios.get('http://localhost:8080/backend/order/listOrders/1/10', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                        let list = []
                        for (let i = 0; i <10; i++) {
                            res.data.data[i]['key'] = i
                            list.push(res.data.data[i])
                        }
                        this.data = list
                }).catch()
            },
            //表格操作
            orderInfo(value){
                console.log(value)
                this.moreDetail(value.tradeNo)
                this.valueOfCol = value
                console.log("此处应该有货品信息")
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
                axios.get('http://localhost:8080/backend/order/getOrderDetail', {
                    params : {tradeNo : record_no},
                    headers : {token : this.tokenStr},
                    tokenBackend : this.tokenStr
                }).then( res => {
                    console.log(res.data)
                    this.details = res.data.data[0]
                }).catch()
                console.log(this.details)
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