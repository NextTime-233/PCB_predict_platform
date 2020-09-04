<!--员工管理-->
<template>
    <div>
        <a-card>
            <div class="employee-list-display">
                <div class="global-search-wrapper" style="width: 350px; display: flex; margin: 30px auto">
                    <a-input-search placeholder="请输入用户名" enter-button @search="onSearch" />
                    <a-button style="margin-left: 20px" type="primary" shape="round" icon="reload" @click="reNew"/>
                </div>
                <form :autoFormCreate="(form) => this.form = form">
                    <a-table
                            :columns="dataColumns"
                            :dataSource="dataSource"
                            :pagination="false"
                    >
                        <template  v-for="(col, i) in ['用户', '账号权限', '注册时间']" :slot="col" slot-scope="text, record">
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
                            <a @click="saveRow(record.key, record.name, record.code)">添加</a>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确认删除" @confirm="remove(record.key)">
                              <a>删除</a>
                            </a-popconfirm>
                          </span>
                                <span v-else>
                                <a @click="saveRow(record.key, record.name, record.code)">保存</a>
                                <a-divider type="vertical" />
                                <a @click="cancle(record.key)">cancel</a>
                            </span>
                            </template>
                            <span v-else>
                              <a-divider type="vertical" />
                              <a-popconfirm title='确认删除' @confirm="remove(record.key,record.name)">
                                <a>删除用户</a>
                              </a-popconfirm>
                            </span>
                        </template>
                    </a-table>
                    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="() => (modalVisible = true)">添加新用户</a-button>
                    <div id="components-modal-demo-position">
                        <a-modal
                                v-model="modalVisible"
                                title="添加新用户"
                                centered
                                destroyOnClose="true"
                                :footer="null"
                                @ok="() => setModalVisible(false)"
                        >
                            <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                                <a-form-item label="用户名">
                                    <a-input v-decorator="['userAccount', { rules: [{ required: true, message: '请输入用户名!' }] }]"/>
                                </a-form-item>
                                <a-form-item label="密码">
                                    <a-input v-decorator="['userPwd', { rules: [{ required: true, message: '请输入密码!' }] }]" type="password"/>
                                </a-form-item>
                                <a-form-item label="确认密码">
                                    <a-input v-decorator="['checkPass', { rules: [{ required: true, message: '请确认密码!' }] }]" type="password"/>
                                </a-form-item>
                                <a-form-item :wrapper-col="{ span: 100, offset: 12 }">
                                    <a-button type="primary" html-type="submit">
                                        提交
                                    </a-button>
                                    <a-button html-type="reset" style="margin-left: 10px" @click="resetForm">
                                        重置
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-modal>
                    </div>
                </form>
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
        </a-card>
    </div>
</template>

<script>
    import SignUp from "../../components/SignUp";
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: '用户',
            width: '20%',
            scopedSlots: { customRender: 'name' }
        },
        {
            title: '账号权限',
            dataIndex: 'limit',
            key: '账号权限',
            width: '20%',
            scopedSlots: { customRender: 'limit' }
        },
        {
            title: '注册时间',
            dataIndex: 'time',
            key: '注册时间',
            width: '20%',
            scopedSlots: { customRender: 'time' }
        },
        {
            title: '操作',
            key: '操作',
            // width: '20%',
            scopedSlots: { customRender: 'operation' }
        }
    ]
    export default {
        name: 'employee',
        component:[SignUp],
        data () {
            return {
                // search reload
                columns,
                dataSource: [],
                tokenStr: '',
            //  divided pages
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                // 弹框注册
                modalVisible: false,
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
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
        created() {
            // 可能需要异步刷新
            const that = this
            that.tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080/backend/user/listUsers/'+this.current+'/'+this.pageSize, {headers:{
                    token: that.tokenStr}}).then( res => {
                    console.log(res.data.data)
                    for(let i = 0; i< res.data.data.length; i++){
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            limit: res.data.data[i].userLimit,
                            time: res.data.data[i].gmtCreate,
                            editable: false,
                        }
                        this.dataSource.push(c)
                    }
            }).catch()
        },
        mounted(){
            // data amount of book maps
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://localhost:8080/backend/user/countUser',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data;
            }).catch()
        },
        methods: {
            reNew() {
                // console.log("here")
                const that = this
                const data = []
                axios.get('http://localhost:8080/backend/user/listUsers/'+this.current+'/'+this.pageSize, {headers:{
                        token: that.tokenStr}}).then( res => {
                    // console.log(res.data.msg)
                    for(let i = 0; i< res.data.data.length; i++){
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            code: res.data.data[i].userPwd,
                            editable: false,
                        }
                        data.push(c)
                    }
                    that.dataSource = data
                }).catch()
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        console.log('usr: ', values.userAccount);
                        axios.post('http://localhost:8080/backend/user/saveUser?userAccount='+values.userAccount+'&userPwd='+values.userPwd ).then(res=>{
                            console.log(res.data.code)
                            this.modalVisible=false
                            alert("成功添加新用户!")
                        }).catch()
                    }
                })
            },
            resetForm() {
                this.$refs[form].resetFields();
            },
            setModalVisible(modalVisible) {
                this.modalVisible = modalVisible;
            },
            remove (key, name) {
                const newData = this.dataSource.filter(item => item.key !== key)
                this.dataSource = newData
                // 删除成功
                axios.put('http://localhost:8080/backend/user/deleteUser', {
                    tokenBackend: this.tokenStr,
                    userList: [name],
                    Headers:{token: this.tokenStr},
                    }
                ).then( res => {
                    console.log(res.data)
                }).catch()
            },
            saveRow (key, name, code) {
                let target = this.dataSource.filter(item => item.key === key)[0]
                target.editable = false
                target.isNew = false
                // 未完成功能
                axios.post('http://localhost:8080/backend/user/saveUser?userAccount='+name+'&userPwd='+code).then(res=>{
                    console.log(res.data)
                }).catch()
            },
            // getRowByKey (key, newData) {
            //     const data = this.dataSource
            //     return (newData || data).filter(item => item.key === key)[0]
            // },
            cancle (key) {
                let target = this.dataSource.filter(item => item.key === key)[0]
                target.editable = false
            },
            handleChange (value, key, column) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target[column] = value
                    this.dataSource = newData
                }
            },
            // 搜索框
            onSearch(value) {
                // console.log(value);
                if(!value){
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('http://localhost:8080/backend/user/getUserByUserAccount?userAccount='+value, {headers:{
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
            // 分页
            currentPage(currentPage, size){
                // console.log("当前页码")
                // console.log(currentPage)
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/user/listUsers/'+currentPage+'/'+size).then(res => {
                    // console.log(res.data.data)
                    for (let i = 0; i <size; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.data = datalist
                }).catch()
            },
            onShowSizeChange(current, size) {
                this.pageSize = size;
                const that = this
                const datalist = []
                axios.get('http://localhost:8080/backend/user/listUsers/'+current+'/'+size).then(res => {
                    for (let i = 0; i <size; i++) {
                        res.data.data[i]['key'] = i
                        datalist.push(res.data.data[i]);
                    }
                    that.data = datalist
                }).catch()
            },
        }
    }
</script>

<style scoped>
    .employee-list-display {
        height: 100vh;
        padding-bottom: 20px;
        border-bottom: 1px solid #dfe6e9;
    }
    /*搜索框*/
    .global-search-wrapper {
        padding-right: 50px;
        margin: 20px 0;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    /*page divided*/
    .page-roll {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        align-items: flex-end;
        margin-top: 20px;
    }
</style>
