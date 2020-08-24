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
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="货品种类数" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="货品总数" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-select placeholder="请选择" size=small >
                                                <a-select-option value="1">关闭</a-select-option>
                                                <a-select-option value="2">运行中</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="购买总金额" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="购买次数" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  :gutter="8">
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="最近消费天数" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item
                                                label="客户标签"
                                                :labelCol="{span:8}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-select placeholder="请选择" size="small">
                                                <a-select-option value="1">关闭</a-select-option>
                                                <a-select-option value="2">运行中</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="所在省市" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-select placeholder="请选择" size=small>
                                                <a-select-option value="1">天猫</a-select-option>
                                                <a-select-option value="2">淘宝</a-select-option>
                                                <a-select-option value="2">其他</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                    </a-col>
                                    <a-col :md="6" :sm="24" >
                                        <a-form-item label="所在店铺" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-select placeholder="请选择" size=small>
                                                <a-select-option value="1">天猫</a-select-option>
                                                <a-select-option value="2">淘宝</a-select-option>
                                                <a-select-option value="2">其他</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  :gutter="10">
                                    <a-col :md="7" :sm="21" >
                                        <a-form-item
                                                label="上次购买时间"
                                                :labelCol="{span: 8}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker style="width: 100%" placeholder="请输入更新日期" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="7" :sm="21" >
                                        <a-form-item
                                                label="用户登记时间"
                                                :labelCol="{span: 8}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker style="width: 100%" placeholder="请输入更新日期" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="7" :sm="21" >
                                        <a-form-item
                                                label="付款时间"
                                                :labelCol="{span: 8}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker style="width: 100%" placeholder="请输入更新日期" size="small"/>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </div>
                            <span style="float: right; margin-top: 3px;">
                      <a-button type="primary">查询</a-button>
                      <a-button style="margin-left: 8px">重置</a-button>
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
                                    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                                        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">全选
                                        </a-checkbox>
                                    </div>
                                <a-row :gutter="15" >
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange" >类别维度
                                         <a-input placeholder="请输入" size="small" v-model="formInline.categoryDimension" ></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange" >时间维度
                                            <a-input placeholder="请输入" size="small"  v-model="formInline.timeDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">销量维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.salesDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">价值维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.valueDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">地区维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.regionalDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  :gutter="15">
                                    <a-col :md="4" :sm="24" >
                                            <a-checkbox @change="onChange">平台维度
                                                <a-input placeholder="请输入" size="small" ></a-input>
                                            </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">复购维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.repurchaseDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">信誉维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.reputationDimension"></a-input>
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :md="4" :sm="24" >
                                    <a-checkbox @change="onChange">促销维度
                                        <a-input placeholder="请输入" size="small" v-model="formInline.promotionDimension"></a-input>
                                    </a-checkbox>
                                </a-col>
                                    <a-col :md="4" :sm="24" >
                                        <a-checkbox @change="onChange">平台维度
                                            <a-input placeholder="请输入" size="small" v-model="formInline.platformDimension"></a-input>
                                        </a-checkbox>
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
            </el-tabs>
        </a-card>
        <div>
            <div>
             <el-table :data="tableData" border style="...">
                 <el-table-column fixed prop="buyerNick" label="客户网名" width="100">
                 </el-table-column>
                 <el-table-column  prop="categoryDimension" label="类别维度" width="100">
                 </el-table-column >
                 <el-table-column  prop="salesDimension" label="销量维度" width="100">
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
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 15, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
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
                pageNum:1,
                pageSize:5,
                advanced: true,
                tableData:[],
                selectedRows: [],
                total:'',
                tokenStr:'',
                activeName: 'second',
                 // 复选框
                checked: true,
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
        mounted(){
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080//backend/portrait/customerPortrait/findAllCusPortrait',{headers:{
                    token : tokenStr}}).then( res => {
                // console.log(res.data)
                that.total = res.data.length;
            }).catch()
        },
        methods: {
            getuserImage(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                that.tokenStr = tokenStr
                console.log(that.tokenStr)
                axios.put('http://localhost:8080/backend/portrait/customerPortrait/giveAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data)
                    that.tableData = res.data.data;
                    that.total=res.data.length;
                }).catch()
            },
            finduserImage(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                that.tokenStr = tokenStr
                console.log(that.tokenStr)
                axios.get('http://localhost:8080/backend/portrait/customerPortrait/findAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data)
                    that.tableData = res.data.data
                    that.total=res.data.length
                }).catch()
            },
            // 查询
            submitList(){
                const that = this
                const list = this.formInline
                console.log(list)
                if(0) {
                    console.log("暂时未执行")
                } else{
                    console.log("提交表单")
                    axios.get('http://localhost:8080/backend/portrait/customerPortrait/findCusPortraitByLabel', {
                        params:{
                            categoryDimension: list.categoryDimension,
                            timeDimension: list.timeDimension,
                            salesDimension: list.salesDimension,
                            valueDimension:list.valueDimension,
                            regionalDimension:list.regionalDimension,
                            platformDimension:list.platformDimension,
                            repurchaseDimension:list.repurchaseDimension,
                            reputationDimension:list.reputationDimension,
                            promotionDimension:list.promotionDimension,
                            cycleDimension:list.cycleDimension,
                        },
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        that.tableData = res.data.data;
                        that.total=res.data.length;
                    }).catch()
                }
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
            // 监听页面数
            handleSizeChange(newSize){
                console.log(newSize)
            },
            // 监听页码值改变
            handleCurrentChange(newPage){
                console.log(newPage)
            },
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            // 复选框
            handleClick(tab, event) {
                console.log(tab, event);
            },
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
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
