<!--客户画像-->
<template>
    <div>
        <a-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="条件查询" name="first">
                    <div :class="advanced ? 'search' : null">
                        <a-form layout="horizontal">
                            <div :class="advanced ? null: 'fold'">
                                <a-row :gutter="8" >
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="购买次数" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseNum" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="购买总金额" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseAmount" />
                                        </a-form-item>

                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="所在省市" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.province" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  :gutter="5">
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="起始注册时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="startChange" size="small"  >
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="结束注册时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="stopChange" size="small" >
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="付款起始时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="payStartChange" size="small">
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  :gutter="5">
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="付款结束时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="payStopChange" size="small">
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="上次购买起始时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="lastStartChange" size="small">
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="上次购买结束时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="lastStopChange" size="small">
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </div>
                            <span style="float: right; margin-top: 3px;">
                      <a-button type="primary" @click="submitButton">查询</a-button>
                      <a-button style="margin-left: 8px"  >重置</a-button>
                      <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{advanced ? '收起' : '展开'}}
                        <a-icon :type="advanced ? 'up' : 'down'" />
                      </a>
                    </span>
                        </a-form>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="标签查询" name="second">
                    <div :class="advanced ? 'search' : null">
                        <a-form id="pForm" layout="horizontal" :model="formInline" @submit.native.prevent>
                            <div :class="advanced ? null: 'fold'">
                                <div>
                                    <a-row :gutter="15" >
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange" >-->类别维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.categoryDimension" ></a-input>-->
                                            <a-select placeholder="请选择" size="small" v-model="formInline.categoryDimension">
                                                <a-select-option value="终端客户">终端客户</a-select-option>
                                                <a-select-option value="分销客户">分销客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange" >-->时间维度
                                            <!--<a-input placeholder="请输入" size="small"  v-model="formInline.timeDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.timeDimension">
                                                <a-select-option value="老客户">老客户</a-select-option>
                                                <a-select-option value="新客户">新客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->销量维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.salesDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.salesDimension">
                                                <a-select-option value="高销量">高销量</a-select-option>
                                                <a-select-option value="低销量">低销量</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->价值维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.valueDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.valueDimension">
                                                <a-select-option value="高价值">高价值</a-select-option>
                                                <a-select-option value="低价值">低价值</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            地区维度
                                            <a-input placeholder="请输入省份" size="small" v-model="formInline.regionalDimension"></a-input>
                                            <!--<a-select placeholder="Select a person" size=small v-model="formInline.regionalDimension">-->
                                                <!--<a-select-option value="高价值">高价值</a-select-option>-->
                                                <!--<a-select-option value="低价值">低价值</a-select-option>-->
                                            <!--</a-select>-->
                                        </a-col>
                                    </a-row>
                                    <a-row v-if="advanced"  :gutter="15">
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->平台维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.platformDimension"></a-input>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.platformDimension">
                                                <a-select-option value="淘宝">淘宝</a-select-option>
                                                <a-select-option value="天猫">天猫</a-select-option>
                                                <a-select-option value="其他">其他</a-select-option>
                                            </a-select>
                                            <!--</a-checkbox>-->
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->复购维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.repurchaseDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.repurchaseDimension">
                                                <a-select-option value="高复购">高复购</a-select-option>
                                                <a-select-option value="低复购">低复购</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->信誉维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.reputationDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.reputationDimension">
                                                <a-select-option value="高信誉">高信誉</a-select-option>
                                                <a-select-option value="低信誉">低信誉</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->促销维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.promotionDimension"></a-input>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.promotionDimension">
                                                <a-select-option value="高敏感度">高敏感度</a-select-option>
                                                <a-select-option value="低敏感度">低敏感度</a-select-option>
                                            </a-select>
                                            <!--</a-checkbox>-->
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->周期维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.cycleDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.cycleDimension">
                                                <a-select-option value="稳定客户">稳定客户</a-select-option>
                                                <a-select-option value="潜在客户">潜在客户</a-select-option>
                                                <a-select-option value="潜在客户">流失客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                </div>
                                <span style="float: right; margin-top: 3px;">
                                   <a-button type="primary" @click="submitList">查询</a-button>
                                   <a-button style="margin-left: 8px" @click="resetInput">重置</a-button>
                                   <a @click="toggleAdvanced" style="margin-left: 8px">
                                       {{advanced ? '收起' : '展开'}}
                                       <a-icon :type="advanced ? 'up' : 'down'" />
                                   </a>
                                </span>
                            </div>
                        </a-form>
                    </div>
                </el-tab-pane>
                <div >
                    <el-table :data="tableData" border style="...">
                        <el-table-column fixed prop="buyerNick" label="客户网名" width="100">
                        </el-table-column>
                        <el-table-column  prop="categoryDimension" label="类别维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="salesDimension" label="销量维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="timeDimension" label="时间维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="valueDimension" label="价值维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="regionalDimension" label="地区维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="platformDimension" label="平台维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="repurchaseDimension" label="复购维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="reputationDimension" label="信誉维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="promotionDimension" label="促销维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="cycleDimension" label="周期维度" width="100">
                        </el-table-column >
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
                                @showSizeChange="handleSizeChange"
                                @change="handleCurrentChange"
                        >
                            <template slot="buildOptionText" slot-scope="props">
                                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                                <span v-if="props.value === '50'">全部</span>
                            </template>
                        </a-pagination>
                    </div>
<!--                    <el-pagination-->
<!--                            @size-change="handleSizeChange"-->
<!--                            @current-change="handleCurrentChange"-->
<!--                            :current-page="queryInfo.pageNum"-->
<!--                            :page-sizes="[5, 10, 15, 20]"-->
<!--                            :page-size="queryInfo.pageSize"-->
<!--                            layout="total, sizes, prev, pager, next, jumper"-->
<!--                            :total="total">-->
<!--                    </el-pagination>-->
                </div>
            </el-tabs>
        </a-card>
        <div>

        </div>
    </div>
</template>
<script>
    import StandardTable from '@/components/StandardTable'
    const columns = []
    const dataSource = []
    export default {
        name: "detail",
        components: {StandardTable},
        data () {
            return {
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                advanced: true,
                tableData:[],
                selectedRows: [],
                tokenStr:'',
                activeName: 'second',
                // 复选框
                checked: true,
                indeterminate: true,
                // checkAll: false,
                //标签搜索
                formInline:{
                    categoryDimension:'',
                    timeDimension:'',
                    salesDimension:'',
                    valueDimension:'',
                    regionalDimension:'',
                    platformDimension:'',
                    repurchaseDimension:'',
                    reputationDimension:'',
                    promotionDimension:'',
                    cycleDimension:'',
                },
                //定制查询
                form:{
                    reStartTime:'',
                    reEndTime:'',
                    payStartTime:'',
                    payEndTime:'',
                    totalPurchaseNum:'',
                    province:'',
                    totalPurchaseAmount:'',
                    lastStartTime:'',
                    lastEndTime:'',
                }
            }
        },
        authorize: {
            deleteRecord: 'delete'
        },
        created() {
            this.getuserImage()
            this.finduserImage()
        },
        // mounted(){
        //     const that = this
        //     const tokenStr = window.sessionStorage.getItem('token')
        //     axios.get('http://localhost:8080//backend/portrait/customerPortrait/findAllCusPortrait',{headers:{
        //             token : tokenStr}}).then( res => {
        //         // console.log(res.data)
        //         that.total = res.data.length;
        //     }).catch()
        // },
        methods: {
            getuserImage(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                that.tokenStr = tokenStr
                console.log('用户画像findall')
                axios.put('http://localhost:8080/backend/portrait/customerPortrait/giveAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                        console.log('用户画像findall')
                        console.log(res.data)
                        // that.tableData = res.data.data
                        // that.total = res.data.length;
                }).catch()
            },
            finduserImage(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                // that.tokenStr = tokenStr
                console.log(that.tokenStr)
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data.data.length)
                    // 去掉缓存，不对tableData重复赋值不会出现增量列表问题
                    // that.tableData = res.data.data
                    that.total = res.data.data.length
                }).catch()
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait/1/5',{headers:{
                        token: tokenStr
                    }}).then(res => {
                    console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            // 分页ok
            handleCurrentChange(currentPage, size){
                console.log("当前页码")
                console.log(currentPage)
                this.queryInfo.pageNum = currentPage
                const that = this
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait/'+currentPage+'/'
                    +size).then(res => {
                // axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait/'+currentPage+'/'
                    //     +this.queryInfo.pageSize).then(res => {
                    console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            handleSizeChange(current, size) {
                console.log("页面数据量")
                console.log(size)
                this.queryInfo.pageSize = size;
                const that = this
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait/'
                    +current+'/'+size).then(res => {
                // axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait/'
                //     +this.queryInfo.pageNum+'/'+size).then(res => {
                    // console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            // 查询
            submitList() {
                const that = this
                const midlist = {}
                const list = this.formInline
                console.log(list.categoryDimension)
                for(let i in list){
                    let key = i
                    let value = list[i]
                    if (value === "") {
                        console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                console.log(midlist)
                console.log("提交表单")
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findCusPortraitByLabel', {
                    params: midlist,
                }).then( res => {
                    console.log(res.data)
                    that.tableData = res.data.data;
                    this.total = res.data.length;
                }).catch()
            },
            //条件查询
            submitButton() {
                const that = this
                const midlist = {}
                const list = this.form
                // console.log(list.categoryDimension)
                for(let i in list){
                    let key = i
                    let value = list[i]
                    if (value === "") {
                        console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                console.log(midlist)
                console.log("提交表单")
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findCusPortraitByCondition', {
                    params: midlist,
                }).then( res => {
                    console.log(res.data)
                    that.tableData = res.data.data;
                    that.total = res.data.length;
                }).catch()
            },
            // 重置
            resetInput(){
                const that = this
                document.getElementById("pForm").reset()
                this.formInline = {
                    categoryDimension:'',
                    timeDimension:'',
                    salesDimension:'',
                    valueDimension:'',
                    regionalDimension:'',
                    platformDimension:'',
                    repurchaseDimension:'',
                    reputationDimension:'',
                    promotionDimension:'',
                    cycleDimension:'',
                }
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    // console.log(res.data)
                    that.tableData = res.data.data;
                    that.total=res.data.length;
                }).catch()
            },
            checkAll(){
            },
            //
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            // // 复选框
            // handleClick(tab, event) {
            //     console.log(tab, event);
            // },
            onChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
            },
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? plainOptions : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
            },
            //时间选择框
            startChange(date,dateString){
                    this.form.reStartTime =dateString[0]
                    console.log(dateString)
            },
            stopChange(date,dateString){
                this.form.reEndTime = dateString[0]
            },
            payStartChange(date,dateString){
                this.form.payStartTime = dateString[0]
            },
            payStopChange(date,dateString){
                this.form.payEndTime = dateString[0]
            },
            lastStartChange(date,dateString){
                this.form.lastStartTime = dateString[0]
            },
            lastStopChange(date,dateString){
                this.form.lastEndTime = dateString[0]
            },
            // table
            handleClick(row) {
                console.log("绑定查询按键");
                console.log(row);
            },
            remove () {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            handleMenuClick (e) {
                if (e.key === 'delete') {
                    this.remove()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .search{
        margin-bottom:30px;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block
    }
    .operator{
        margin-bottom: 18px;
    }
    .biaoge{
        margin-bottom:10px;
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
