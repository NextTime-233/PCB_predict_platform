<!--标签管理-->
<template>
    <div>
        <el-row  :gutter="280">
            <el-col :span="4">
                <div class="order-form-searchBar">
                    <div class="global-search-wrapper" style="width: 300px">
                        <a-input-search placeholder="请输入标签名" enter-button @search="onSearch" />
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="global-search-wrapper" style="width: 200px">
                    <el-button type="primary" @click="dialogFormVisible = true" size="small">新增标签</el-button>
                    <el-button type="success" icon="el-icon-refresh-left" circle size="small" @click="getLabel"></el-button>
                </div>
            </el-col>

        </el-row>
        <div>
           <el-table :data="tableData" border style="width: 100%">
               <el-table-column fixed prop="labelDimension" label="所属维度" width="150">
               </el-table-column>
               <el-table-column fixed prop="labelVal" label="标签名称" width="150">
               </el-table-column>
               <el-table-column fixed prop="labelRule" label="标签描述" width="230">
               </el-table-column>
               <el-table-column
                       fixed="right"
                       label="操作"
                       width="150">
                   <template slot-scope="scope">
                       <el-button
                               @click.native.prevent="deleteRow(scope.$index, tableData)"
                               type="text"
                               size="small">
                           删除
                       </el-button>
                       <el-button type="text" size="small">编辑</el-button>
                   </template>
               </el-table-column>
           </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
                <!-- 新增标签-->
                <el-dialog
                        title="新增标签"
                        :visible.sync="dialogFormVisible"
                        width="60%"
                        @close='closeDialog'>
                    <el-form :model="addForm" >
                        <el-form-item label="新增标签名称" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-input v-model="tableData.labelVal" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="所属维度" :label-width="formLabelWidth" v-model="addForm.labelDimension">
                            <el-input v-model="tableData.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <!--<el-form-item label="标签规则" :label-width="formLabelWidth">-->
                            <!--<el-input v-model="tableData.labelRule" autocomplete="off" ></el-input>-->
                        <!--</el-form-item>-->
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogFormVisible= false">重置</el-button>
                           <el-button @click="dialogFormVisible= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel()">确 定</el-button>
                    </span>
                </el-dialog>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                //分页
                queryInfo:{
                    pageNum:1,
                    pageSize:5,
                },
                pageSize: '',
                total: '',
                tableData:[],
                tokenStr: '',
                //  新增对话框的显示与否
                dialogFormVisible:false,
                // 表单数据
                addForm: {
                    labelVal:'',
                    labelDimension:'',
                },
                formLabelWidth:'120px',
                dialogCode:true,
            }

        },
        computed: {
            dataColumns() {
                return this.columns.map(column => {
                    column.title = column.key
                    return column
                })
            }
        },
        //生命周期函数
        created(){
            this.getLabel()

        },
        methods: {
            getLabel(){
                const that = this;
                let tokenStr =  window.sessionStorage.getItem('token')
                axios.get('http://192.168.1.102:8080/backend/label/findAllLabelVal',{headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data);
                    that.tableData = res.data.data;
                    that.total=res.data.data.length;
                }).catch()
                axios.get('http://192.168.1.102:8080/backend/label/findAllLabelVal/1/5').then(res => {
                    console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            submitList(){
                const that = this
                const list = this.formInline
                console.log(list)
                if(0) {
                    console.log("暂时未执行")
                } else{
                    console.log("提交表单")
                    axios.get('http://192.168.1.102:8080/backend/label/findLabelValByName/', {
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        that.tableData = res.data.data;
                        that.total=res.data.data.length;
                    }).catch()
                }
            },
            // 分页, 加载缓慢
            handleCurrentChange(currentPage){
                console.log("当前页码")
                console.log(currentPage)
                this.queryInfo.pageNum = currentPage
                const that = this
                axios.get('http://192.168.1.102:8080/backend/label/findAllLabelVal/'+currentPage+'/'+this.queryInfo.pageSize).then(res => {
                    console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            handleSizeChange(size) {
                console.log("页面数据量")
                console.log(size)
                this.queryInfo.pageSize = size;
                const that = this
                axios.get('http://192.168.1.102:8080/backend/label/findAllLabelVal/'+this.queryInfo.pageNum+'/'+size).then(res => {
                    // console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            // 模糊查询ok
            onSearch(labelVal) {
                console.log(labelVal);
                const that = this;
                let tokenStr =  window.sessionStorage.getItem('token')
                if(!labelVal){
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('http://192.168.1.102:8080/backend/label/findLabelValByName/'+labelVal, {headers:{
                            token: this.tokenStr}}).then( res => {
                        console.log(res.data);
                        const dataset=0;
                        console.log(dataset);
                        that.tableData = res.data.data;
                        that.total=res.data.data.length;

                    }).catch()
                }
            },
            closeDialog() {
                this.dialogCode = false
            },
            // 新增标签ok
           addLabel() {
                       axios.post('http://192.168.1.102:8080/backend/label/saveLabel?labelDimension='
                           +this.addForm.labelDimension+'&labelVal='+this.addForm.labelVal).then(res=>{
                           console.log(res)
                       })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            // deleteLabel(){
            //          axios.put('http://192.168.1.102:8080/backend/label/delLabel?labelVal='
            //         +this.addForm.labelVal).then(res=>{
            //         console.log(res)
            //     })
            // },
            // //pagesize改变
            // handleSizeChange(newSize) {
            //     console.log(`每页 ${newSize} 条`);
            // },
            // // 页码值改变
            // handleCurrentChange(newPage) {
            //     console.log(`当前页: ${newPage}`);
            // }
        },
    }
</script>

<style>
    .global-search-wrapper {
        padding-right: 50px;
        margin: 20px 0;
    }

</style>
