<!--货品档案-->
<template>
    <div>
        <a-card>
            <div id="goods-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin-top: 10px">
                    <a-form id="pForm" layout="inline" :model="formInline" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row type="flex">
                                <a-col :span="6" :order="1">
                                    <a-form-item label="货品编号">
                                        <a-input v-model="formInline.goodsNo">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" :order="2">
                                    <a-form-item label="货品名称">
                                        <a-input v-model="formInline.goodsName">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" :order="3">
                                    <a-form-item label="分类">
                                        <a-input v-model="formInline.goodsType">
                                        </a-input>
                                    </a-form-item>
                                </a-col>
<!--                                <a-col :span="6" :order="4">-->
<!--                                    <a-form-item label="条码">-->
<!--                                        <a-input v-model="formInline.logisticsNo">-->
<!--                                        </a-input>-->
<!--                                    </a-form-item>-->
<!--                                </a-col>-->
                            </a-row>
<!--                            <a-row type="flex" v-if="advanced">-->
<!--                                <a-col :span="6" :order="1">-->
<!--                                    <a-form-item label="商家编码">-->
<!--                                        <a-input v-model="formInline.shopName">-->
<!--                                        </a-input>-->
<!--                                    </a-form-item>-->
<!--                                </a-col>-->
<!--                                <a-col :span="6" :order="2">-->
<!--                                    <a-form-item label="品牌">-->
<!--                                        <a-input v-model="formInline.Phone">-->
<!--                                        </a-input>-->
<!--                                    </a-form-item>-->
<!--                                </a-col>-->
<!--                                <a-col :span="6" :order="3">-->
<!--                                    <a-form-item label="规格名称">-->
<!--                                        <a-input v-model="formInline.Type">-->
<!--                                        </a-input>-->
<!--                                    </a-form-item>-->
<!--                                </a-col>-->
<!--                                <a-col :span="6" :order="4">-->
<!--                                    <a-form-item label="货品简称">-->
<!--                                        <a-input v-model="formInline.Type">-->
<!--                                        </a-input>-->
<!--                                    </a-form-item>-->
<!--                                </a-col>-->
<!--                            </a-row>-->
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
                        :data="tableData"
                        v-loading="loading"
                        border
                        style="width: 100%; margin-top: 10px">
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
<!--                    <el-table-column-->
<!--                            fixed="right"-->
<!--                            label="操作"-->
<!--                            width="50">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
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
        </a-card>
    </div>
</template>

<script>
    export default {
        name: "purchase",
        data() {
            return {
                // 搜索栏
                formInline: {
                    goodsNo: '',
                    goodsName: '',
                    goodsType: '',
                    shopName: '',
                    orderNo: '',
                    originOrderNo: '',
                    logisticsNo: '',
                    ClientNetName: '',
                    Phone: '',
                    Type: '',
                },
                advanced: false,
                // table数据
                tableData: [],
                loading: true,
                // 分页
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                current: 1,
                pageSize: 10,
                total: 0,
                amount: 0,
                flag: 0,  // 搜索结果分页为1，数据表分页查询为0，用于翻页
                // token
                tokenStr: '',
            };
        },
        computed: {
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            axios.get('http://192.168.1.100:8080/backend/goods/listGoods/1/10', {headers:{
                    token: tokenStr
                }}).then( res => {
                console.log(res.data.data)
                this.loading=false
                that.tableData = res.data.data
            }).catch()
        },
        mounted(){
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://192.168.1.100:8080/backend/goods/countGoods',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data
                that.amount = res.data.data
            }).catch()
        },
        methods: {
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            submitList(){
                this.loading = true
                const that = this
                const list = this.formInline
                console.log(list)

                if(that.flag===0) {
                    for (let i in list) {
                        console.log(list[i])
                        if (list[i]) {
                            console.log("提交表单")
                            axios.get('http://192.168.1.100:8080/backend/goods/getGoods/1/10', {
                                params: {
                                    goodsNo: list.goodsNo,
                                    goodsName: list.goodsName,
                                    goodsType: list.goodsType,
                                },
                                headers: {token: this.tokenStr},
                                tokenBackend: this.tokenStr
                            }).then(res => {
                                if (res.data.code === 3) {
                                    alert('未能查找到该货品的相关信息！！')
                                } else if (res.data.code === 0) {
                                    console.log(res)
                                    that.tableData = res.data.data.list
                                    this.loading = false
                                    that.total = res.data.data.total
                                    this.flag = 1
                                }
                            }).catch()
                            break
                        } else if (i === 'goodsType' && list[i] === '') {
                            alert("请输入查询信息！！")
                        } else {
                            continue
                        }
                    }
                }
                else {D
                    console.log("此处为跳页结果")
                    console.log(this.current, this.pageSize)
                    axios.get('http://192.168.1.100:8080/backend/goods/getGoods/'+this.current+'/'+this.pageSize, {
                        params: {
                            goodsNo: list.goodsNo,
                            goodsName: list.goodsName,
                            goodsType: list.goodsType,
                        },
                        headers: {token: this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then(res => {
                        if (res.data.code === 3) {
                            alert('未能查找到该货品的相关信息！！')
                        } else if (res.data.code === 0) {
                            that.tableData = res.data.data.list
                            this.loading = false
                        }
                    }).catch()
                }
            },
            resetInput(){
                const that = this
                document.getElementById("pForm").reset()
                this.formInline = {
                    goodsNo: '',
                    goodsName: '',
                    goodsType: '',
                    shopName: '',
                    orderNo: '',
                    originOrderNo: '',
                    logisticsNo: '',
                    ClientNetName: '',
                    Phone: '',
                    Type: '',
                }
                axios.get('http://192.168.1.100:8080/backend/goods/listGoods/1/10', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    that.tableData = res.data.data
                    that.flag = 0
                    this.total = this.amount
                }).catch()
            },
            // table
            handleClick(row) {
                console.log("绑定查询按键");
                console.log(row);
            },
            // 分页
            currentPage(currentPage, size){
                this.loading=true
                const that = this
                const datalist = []

                if(that.flag===0){
                    axios.get('http://192.168.1.100:8080/backend/goods/listGoods/'+currentPage+'/'+size, {headers:{
                            token : this.tokenStr}}).then(res => {
                        // console.log(res.data.data)
                        that.tableData = res.data.data
                        this.loading=false
                    }).catch()
                    console.log("第一个")
                }
                else {
                    this.submitList()
                    console.log("第二个")
                }
            },
            onShowSizeChange(current, size) {
                this.loading=true
                this.pageSize = size
                const that = this

                if(that.flag===0){
                    axios.get('http://192.168.1.100:8080/backend/goods/listGoods/'+current+'/'+size, {headers:{
                        token : this.tokenStr}}).then(res => {
                    that.tableData = res.data.data
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
    /* my design */
    #goods-list-display {
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