<!--客户档案-->
<template>
    <div>
        <a-card>
            <div class="client-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin: 10px 0">
                    <a-form layout="horizontal" :model="formInline" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16" >
                                <a-col :span="6">
                                    <a-form-item label="货品种类数" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input placeholder="请输入" size="small" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="货品总数" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">关闭</a-select-option>
                                            <a-select-option value="2">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="购买总金额" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="购买次数" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="8">
                                <a-col :md="6" >
                                    <a-form-item label="最近消费天数" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item
                                            label="客户标签"
                                            :labelCol="{span:7}"
                                            :wrapperCol="{span: 12, offset: 1}"
                                    >
                                        <a-select placeholder="请选择" size="small">
                                            <a-select-option value="1">关闭</a-select-option>
                                            <a-select-option value="2">运行中</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="所在省市" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">天猫</a-select-option>
                                            <a-select-option value="2">淘宝</a-select-option>
                                            <a-select-option value="2">其他</a-select-option>
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
                        <a-button style="margin-left: 8px" type="reset">重置</a-button>
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
                    <a-button> {{cType}} <a-icon type="down" /> </a-button>
                </a-dropdown>
                <a-button style="margin-left: 10px; margin-bottom: 10px"  type="primary">添加标签</a-button>
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
                            prop="lastPurchaseTime"
                            label="上次购买时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="district"
                            label="区县"
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
                            prop="address"
                            label="地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="totalPurchaseNum"
                            label="购买总次数"
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
                            prop="afterBuyingRate"
                            label="复购率"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="afterBuyingRate"
                            label="修改时间"
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
                            prop="zip"
                            label="邮编"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
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
        </a-card>
    </div>
</template>
<script>
const tableData =[];
    export default {
        name: "Client",
        data() {
            return {
                // 数据
                tableData: [],
                // 搜索栏
                formInline: {
                    shopName: '',
                    orderNo: '',
                    originOrderNo: '',
                    logisticsNo: '',
                    ClientNetName: '',
                    Phone: '',
                    Type: '',
                },
                advanced: true,
                // 类型
                cType: "客户类型",
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
                        console.log(res.data)
                        this.tableData = res.data.data
                    }).catch()
                }
            },
            // 日期选择框
            onChange(date, dateString) {
                console.log(date, dateString);
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
                    axios.get('http://localhost:8080/backend/customer/getCustomers', {
                        params:{list},
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                    }).catch()
                }
            },
            // el表格
            handleClick(row) {
                console.log(row);
            },
            // 分页, 加载缓慢
            currentPage(currentPage, size){
                // console.log("当前页码")
                // console.log(currentPage)
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
