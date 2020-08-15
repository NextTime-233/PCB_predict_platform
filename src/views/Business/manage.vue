<!--订单管理-->
<template>
    <div>
        <div class="order-list-display">
            <div class="searchBar">
                <span>店铺：</span>
                <a-auto-complete
                        :data-source="dataSource"
                        style="width: 200px"
                        placeholder="input here"
                        :filter-option="filterOption"
                />
                <a-popover placement="bottomRight">
                    <template slot="content">
                        <p>循环输出所有店铺</p>
                        <a-input placeholder="输入关键字查询" />
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
                    <template slot="title">
                        <span>店铺列表</span>
                    </template>
                    <a-button>多选<a-icon type="down" /></a-button>
                </a-popover>
            </div>
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }" :pagination="false">
                <a slot="action" slot-scope="text">action</a>
            </a-table>
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
                    <!--            <t>共{{}}条数据</t>-->
                    <template slot="buildOptionText" slot-scope="props">
                        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                        <span v-if="props.value === '50'">全部</span>
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
                    Tab 1
                </a-tab-pane>
                <a-tab-pane key="2">
                  <span slot="tab">
                    <a-icon type="unordered-list" />
                    订单详情
                  </span>
                    Tab 2
                </a-tab-pane>
            </a-tabs>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<script>
    import PageFooter from "../../layouts/PageFooter";
    const columns = [
        { title: '订单编号', width: 400, dataIndex: 'tradeNo', key: 'tradeNo', 'fixed': 'left' },
        { title: '平台类型', width: 100, dataIndex: 'platform_type', key: 'platform_type', 'fixed': 'left' },
        { title: '店铺名称', width: 100, dataIndex: 'shop_name', key: '1' },
        { title: '仓库名称', width: 100, dataIndex: 'warehouse_name', key: '2' },
        { title: '仓库类型', width: 100, dataIndex: 'warehouse_type', key: '3' },
        { title: '原始单号', width: 100, dataIndex: 'src_tids', key: '4' },
        { title: '订单状态', width: 100, dataIndex: 'trade_status', key: '5' },
        { title: '发货状态', width: 100, dataIndex: 'consign_status', key: '6' },
        { title: '平台发货状态', width: 100, dataIndex: 'platform_consign_status', key: '7' },
        { title: '订单类型', width: 100, dataIndex: 'trade_type', key: '8' },
        { title: '发货条件', width: 100, dataIndex: 'delivery_term', key: '9' },
        { title: '冻结原因', width: 100, dataIndex: 'freeze_reason', key: '10' },
        { title: '退款状态', width: 100, dataIndex: 'refund_status', key: '11' },
        { title: '分销类别', width: 100, dataIndex: 'fenxiao_type', key: '12' },
        { title: '分销商名称', width: 100, dataIndex: 'fenxiao_nick', key: '13' },
        { title: '下单时间', width: 100, dataIndex: 'trade_time', key: '14' },
        { title: '付款时间', width: 100, dataIndex: 'pay_time', key: '15' },
        { title: '买家付款账号', width: 100, dataIndex: 'pay_account', key: '16' },
        { title: '客户网名', width: 100, dataIndex: 'buyer_nick', key: '17' },
        { title: '收件人', width: 100, dataIndex: 'receiver_name', key: '18' },
        { title: '省市县', width: 100, dataIndex: 'receiver_area', key: '19' },
        { title: '地址', width: 100, dataIndex: 'receiver_address', key: '20' },
        { title: '手机', width: 100, dataIndex: 'receiver_mobile', key: '21' },
        { title: '电话', width: 100, dataIndex: 'receiver_telno', key: '22' },
        { title: '邮编', width: 100, dataIndex: 'receiver_zip', key: '23' },
        { title: '区域', width: 100, dataIndex: 'receiver_ring', key: '24' },
        { title: '大头笔', width: 100, dataIndex: 'receiver_dtb', key: '25' },
        { title: '派送时间', width: 100, dataIndex: 'to_deliver_time', key: '26' },
        { title: '物流公司', width: 100, dataIndex: 'logistics_name', key: '27' },
        { title: '物流单号', width: 100, dataIndex: 'logistics_no', key: '28' },
        { title: '买家留言', width: 100, dataIndex: 'buyer_message', key: '29' },
        { title: '客服备注', width: 100, dataIndex: 'cs_remark', key: '30' },
        { title: '标旗', width: 100, dataIndex: 'remark_flag', key: '31' },
        { title: '打印备注', width: 100, dataIndex: 'print_remark', key: '32' },
        { title: '货品种类数', width: 100, dataIndex: 'goods_type_count', key: '33' },
        { title: '货品总数', width: 100, dataIndex: 'goods_count', key: '34' },
        { title: '货品总额', width: 100, dataIndex: 'goods_amount', key: '35' },
        { title: '邮资', width: 100, dataIndex: 'post_amount', key: '36' },
        { title: '其它费用', width: 100, dataIndex: 'other_amount', key: '37' },
        { title: '优惠', width: 100, dataIndex: 'discount', key: '38' },
        { title: '应收金额', width: 100, dataIndex: 'receivable', key: '39' },
        { title: '销项税', width: 100, dataIndex: 'output_tax', key: '40' },
        { title: '款到发货金额', width: 100, dataIndex: 'dap_amount', key: '41' },
        { title: 'COD金额', width: 100, dataIndex: 'cod_amount', key: '42' },
        { title: '买家COD费用', width: 100, dataIndex: 'ext_cod_fee', key: '43' },
        { title: '佣金', width: 100, dataIndex: 'commission', key: '44' },
        { title: '货品预估成本', width: 100, dataIndex: 'goods_cost', key: '45' },
        { title: '预估邮资成本', width: 100, dataIndex: 'post_cost', key: '46' },
        { title: '已付金额', width: 100, dataIndex: 'paid', key: '47' },
        { title: '预估重量', width: 100, dataIndex: 'weight', key: '48' },
        { title: '预估毛利', width: 100, dataIndex: 'profit', key: '49' },
        { title: '发票类型', width: 100, dataIndex: 'invoice_type', key: '50' },
        { title: '发票抬头', width: 100, dataIndex: 'invoice_title', key: '51' },
        { title: '发票内容', width: 100, dataIndex: 'invoice_content', key: '52' },
        { title: '业务员', width: 100, dataIndex: 'salesman', key: '53' },
        { title: '审核人', width: 100, dataIndex: 'checker_name', key: '54' },
        { title: '财审人', width: 100, dataIndex: 'fchecker', key: '55' },
        { title: '签出人', width: 100, dataIndex: 'checkouter', key: '56' },
        { title: '出库单号', width: 100, dataIndex: 'stockout_no', key: '57' },
        { title: '标记名称', width: 100, dataIndex: 'flag_name', key: '58' },
        { title: '处理天数', width: 100, dataIndex: 'dispose_days', key: '59' },
        { title: '订单来源', width: 100, dataIndex: 'trade_from', key: '60' },
        { title: '货品商家编码', width: 100, dataIndex: 'single_spec_no', key: '61' },
        { title: '原始货品种类数', width: 100, dataIndex: 'raw_goods_count', key: '62' },
        { title: '原始货品数量', width: 100, dataIndex: 'raw_goods_type_count', key: '63' },
        { title: '递交时间', width: 100, dataIndex: 'submit_time', key: '64' },
        { title: '币种', width: 100, dataIndex: 'currency', key: '65' },
        { title: '线上包裹拆分数', width: 100, dataIndex: 'split_package_num', key: '66' },
        { title: '激活时间', width: 100, dataIndex: 'activation_time', key: '67' },
        { title: '已开具发票', width: 100, dataIndex: 'Invoiced', key: '68' },
        { title: '体积', width: 100, dataIndex: 'volume', key: '69' },
        { title: '证件号码', width: 100, dataIndex: 'id_card', key: '70' },
        { title: '加载时间', width: 100, dataIndex: 'load_time', key: '71' },
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
                dataSource: ['唯品会', '每日优鲜'],
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
            axios.get('http://localhost:8080/backend/order/listOrders', {headers:{
                token: tokenStr
            }}).then( res => {
                // console.log( JSON.stringify(res.data.data[100]))
                console.log(res.data.data[100].tradeNo)
                for (let i = 100; i <110; i++) {
                    res.data.data[i]['key'] = i
                    this.data.push(res.data.data[i]);
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
            onChange(checkedValues) {
                console.log('checked = ', checkedValues);
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
                );
            },
            // 分页
            onShowSizeChange(current, pageSize) {
                this.pageSize = pageSize;
                sessionStorage.setItem('current', current);
                sessionStorage.setItem('pageSize', pageSize);
            },
        },
    }

</script>

<style lang="less" scoped>
    .order-list-display {
        height: 50%;
        padding-bottom: 20px;
        border-bottom: 1px solid #dfe6e9;
        .searchBar {
            margin: 20px 0;
        }
        .page-roll {
            display: flex;
            flex-direction: column;
            /*align-items: center;*/
            align-items: flex-end;
            margin-top: 20px;
        }
    }
</style>