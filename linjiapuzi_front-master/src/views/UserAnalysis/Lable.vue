<!--标签管理-->
<template>
    <div>
        <el-row  :gutter="80">
            <el-col span="8">
                <div class="order-form-searchBar">
                    <div class="global-search-wrapper" style="width: 300px">
                        <el-input placeholder="标签搜索"  ><el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </el-col>
            <el-col span="4">
                <div class="global-search-wrapper" style="width: 200px">
                    <el-button type="primary" @click="addLabelVisible = true">新增标签</el-button>
                </div>
            </el-col>
        </el-row>
        <a-table :columns="dataColumns" :dataSource="dataSource" :pagination="false">
            <template  v-for="(col, i) in ['labelDimension', 'labelVal']" :slot="col" slot-scope="text, record">
                <a-input
                        :key="col"
                        v-if="record.editable"
                        style="margin: -5px 0"
                        :value="text"
                        :placeholder="columns[i].title"
                        @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>{{text}}</template>
            </template>
            <template slot="operation" slot-scope="text, record">
                <template v-if="record.editable">
                          <span v-if="record.isNew">
                            <a @click="saveRow(record.key, record.labelDimension, record.labelVal)">添加</a>
                            <a-divider type="vertical" />
                            <a-popconfirm :title="deleteConfirm" @confirm="remove(record.key)">
                              <a>删除</a>
                            </a-popconfirm>
                          </span>
                    <span v-else>
                                <a @click="saveRow(record.key, record.labelDimension, record.labelVal)">save</a>
                                <a-divider type="vertical" />
                                <a @click="cancle(record.key)">取消</a>
                            </span>
                </template>
                <span v-else>
                          <a @click="toggle(record.key)">编辑</a>
                          <a-divider type="vertical" />
                          <a-popconfirm title='deleteConfirm' @confirm="remove(record.key,record.labelDimension)">
                            <a>删除</a>
                          </a-popconfirm>
                        </span>
                <!-- 新增标签-->
                <el-dialog
                        title="新增标签"
                        :visible.sync="addLabelVisible"
                        width="60%"
                        :before-close="handleClose">
                    <el-form :model="addform" >
                        <el-form-item label="新增标签名称" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-row :gutter="1">
                            <el-col  span="4">
                                <div class="block">
                                    <span class="demonstration">用户登记时间</span>
                                </div>
                            </el-col>
                            <el-rol  span="'7">
                                <div class="block">
                                    <el-date-picker
                                            v-model="value2"
                                            type="datetimerange"
                                            :picker-options="pickerOptions"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </div>
                            </el-rol>
                        </el-row>
                        <el-row :gutter="1">
                            <el-col  span="4">
                                <div class="block">
                                    <span class="demonstration">付款时间</span>
                                </div>
                            </el-col>
                            <el-rol  span="'7">
                                <div class="block">
                                    <el-date-picker
                                            v-model="value2"
                                            type="datetimerange"
                                            :picker-options="pickerOptions"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </div>
                            </el-rol>
                        </el-row>
                        <el-form-item label="购买次数" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="所在店铺" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="购买总金额" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-row :gutter="1">
                            <el-col  span="4">
                                <div class="block">
                                    <span class="demonstration">上次购买时间</span>
                                </div>
                            </el-col>
                            <el-rol  span="'7">
                                <div class="block">
                                    <el-date-picker
                                            v-model="value2"
                                            type="datetimerange"
                                            :picker-options="pickerOptions"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </div>
                            </el-rol>
                        </el-row>
                        <el-form-item label="货品种类数" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="货品数量总数" :label-width="formLabelWidth">
                            <el-input v-model="dataSource.labelDimension" autocomplete="off" ></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                           <el-button @click="addLabelVisible= false">重置</el-button>
                           <el-button @click="addLabelVisible= false">取 消</el-button>
                           <el-button type="primary" @click="addLabelVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </template>
        </a-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>

</template>

<script>
    const columns = [
        {
            title: '所属维度',
            dataIndex: 'labelDimension',
            key: 'labelDimension',
            width: '20%',
            scopedSlots: { customRender: 'labelDimension' }
        },
        {
            title: '标签名称',
            dataIndex: 'labelVal',
            key: 'labelVal',
            width: '20%',
            scopedSlots: { customRender: 'labelVal' }
        },
        {
            title: '标签描述',
            key: 'labelRule',
            scopedSlots: { customRender: 'labelRule' }
        },

        {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ]

    export default {
        data() {
            return {
                columns,
                dataSource: [],
                tokenStr: '',
                //  divided pages
                current: 1,
                pageSize: 10,
                total: 0,
                //  新增对话框的显示与否
                addLabelVisible:false,
                // 表单数据
                addform: {},
                // 时间选择
                formLabelWidth: '100px',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: ''
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
                axios.get('http://localhost:8080/backend/label/findAllLabelVal',{headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data)
                    const dataset=0;
                    console.log(dataset);
                    for(let i = 0; i< res.data.data.length; i++){
                        let c = {
                            key : i+1,
                            labelDimension: res.data.data[i].labelDimension,
                            labelVal: res.data.data[i].labelVal,
                            labelRule: res.data.data[i].labelRule,
                            editable: false,
                        }
                        this.dataSource.push(c)
                    }
                }).catch()
            },
            onSearch(value) {
                console.log(value);
                if(!value){http://localhost:8080/
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('backend/user/getUserByUserAccount?userAccount='+value, {headers:{
                            token: this.tokenStr}}).then( res => {
                        // console.log(res.data.msg)
                        // console.log(res.data.data)
                        // 暂时采用的方法，直接重写数据源
                        this.dataSource = [{
                            key : 1,
                            name: res.data.data.userAccount,
                            code: res.data.data.userPwd,
                            editable: false,
                        }]
                    }).catch()
                }
            },
            // onShowSizeChange(current, pageSize) {
            //     this.pageSize = pageSize;
            //     sessionStorage.setItem('current', current);
            //     sessionStorage.setItem('pageSize', pageSize);
            // },
            newMember() {

            },
            //pagesize改变
            handleSizeChange(newSize){
                console.log(newSize)
                this.pageSize=newSize
                this.getLabel()

            },
            // 页码值改变
            handleCurrentChange(newPage){
                console.log(newPage)
            }

        },
    }
</script>

<style>
    .global-search-wrapper {
        padding-right: 50px;
        margin: 20px 0;
    }
</style>
