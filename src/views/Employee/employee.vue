<!--员工管理-->
<template>
    <div>
        <a-card>
            <div class="employee-list-display">
                <div class="global-search-wrapper" style="width: 350px; display: flex; margin: 30px auto; border-bottom: ">
                    <a-input-search placeholder="请输入用户名" enter-button @search="onSearch" />
                    <a-button style="margin-left: 20px" type="primary" shape="round" icon="reload" @click="reNew"/>
                </div>
                <div style="height: 30px; width: 80px; background-color:#fff;margin-left: 62%; z-index:1"></div>
                <form :autoFormCreate="(form) => this.form = form" >
                    <a-table :columns="dataColumns" :dataSource="dataSource" :pagination="false">
                        <div slot="operation" slot-scope="text, record">
                            <span v-if="record.editable">
                                <a>-</a>
                            </span>
                            <span v-else>
                              <a-popconfirm title='确认删除' @confirm="remove(record.key,record.name)">
                                <a>删除用户</a>
                              </a-popconfirm>
                            </span>
                        </div>
                    </a-table>
                    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="() => (modalVisible = true)">添加新用户</a-button>
                    <div id="components-modal-demo-position">
                        <a-modal
                                v-model="modalVisible"
                                title="添加新用户"
                                centered
                                :destroyOnClose="true"
                                :footer="null"
                                @ok="() => setModalVisible(false)"
                        >
                            <a-form ref="form" :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                                <a-form-item label="用户名">
<!--                                    <a-input v-decorator="['userAccount', { rules: [{ required: true, message: '请输入用户名!' }, { validator: userAccount, trigger: 'change' }] }]"/>-->
                                    <a-input v-decorator="['userAccount', { rules: [{ required: true, message: '请输入用户名!' }, { validator: userAccount, trigger: 'blur' }] }]"/>
                                </a-form-item>
                                <a-form-item label="密码">
<!--                                    <a-input v-decorator="['userPwd', { rules: [{ required: true, message: '请输入密码!' }, { validator: validatePass, trigger: 'change' }] }]" type="password"/>-->
                                    <a-input v-decorator="['userPwd', { rules: [{ required: true, message: '请输入密码!' }, { validator: validatePass, trigger: 'blur' }] }]" type="password"/>
                                </a-form-item>
                                <a-form-item label="确认密码">
<!--                                    <a-input v-decorator="['checkPass', { rules: [{ required: true, message: '请确认密码!' }, { validator: validatePass2, trigger: 'change' }] }]" type="password"/>-->
                                    <a-input v-decorator="['checkPass', { rules: [{ required: true, message: '请确认密码!' },  { validator: validatePass2, trigger: 'blur' }] }]" type="password"/>
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
            dataIndex: 'operation',
            key: '操作',
            // width: '20%',
            scopedSlots: { customRender: 'operation' }
        }
    ]
    export default {
        name: 'employee',
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
                amount: 0,  // 用来存储 总页数
                // 弹框注册
                modalVisible: false,
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
                pwdValue:'',
                userAccount: (rule, value, callback) => {
                    const reg = /^([a-zA-Z]|[0-9])/;
                    if (!value) {
                        return callback(new Error('用户名不能为空'));
                    }else if (reg.test(value)){
                        callback();
                    } else {
                        callback(new Error('用户名格式不正确，只能用数字或字母'));
                    }
                },
                validatePass: (rule, value, callback) => {
                    this.pwdValue = value
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        callback();
                    }
                },
                validatePass2: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.pwdValue) {
                        callback(new Error("两次密码输入不匹配！"));
                    } else {
                        callback();
                    }
                }
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
            const that = this
            that.tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://192.168.1.106:8080/backend/user/listUsers/'+this.current+'/'+this.pageSize, {headers:{
                    token: that.tokenStr}}).then( res => {
                    for(let i = 0; i< res.data.data.length; i++){
                        // console.log(res.data.data[i].userLimit)
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            limit: res.data.data[i].userLimit>0?'管理员':'普通用户',
                            time: res.data.data[i].gmtCreate,
                            editable: res.data.data[i].userLimit!=='0',
                        }
                        this.dataSource.push(c)
                    }
            }).catch()
        },
        mounted(){
            // data amount of book maps
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('http://192.168.1.106:8080/backend/user/countUser',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data
                that.amount = res.data.data
            }).catch()
        },
        methods: {
            reNew() {
                const that = this
                const data = []
                axios.get('http://192.168.1.106:8080/backend/user/listUsers/'+this.current+'/'+this.pageSize, {headers:{
                        token: that.tokenStr}}).then( res => {
                    // console.log(res.data.msg)
                    for(let i = 0; i< res.data.data.length; i++){
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            limit: res.data.data[i].userLimit>0?'管理员':'普通用户',
                            time: res.data.data[i].gmtCreate,
                            editable: res.data.data[i].userLimit!=='0',
                        }
                        data.push(c)
                    }
                    that.dataSource = data
                }).catch()
                that.total = that.amount
            },
            handleSubmit(e) {
                e.preventDefault(); // 阻止页面自动刷新
                this.form.validateFields((err, values) => {
                    console.log(err)
                    if (!err) {
                        console.log('Received values of form: ', values);
                        console.log('usr: ', values.userAccount);
                        axios.post('http://192.168.1.106:8080/backend/user/saveUser?userAccount='+values.userAccount+'&userPwd='+values.userPwd ).then(res=>{
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
                axios.get('http://192.168.1.106:8080/backend/user/getUserByUserAccount?userAccount='+name, {headers:{
                        token: this.tokenStr}}).then( res => {
                            console.log(res.data.data)
                        if (res.data.data.userLimit>0) {
                            alert("不能删除管理员用户!!请联系开发人员进行相关操作，或从数据库中进行删除操作！")
                        }
                        else {
                            alert("已删除用户"+name)
                            const newData = this.dataSource.filter(item => item.key !== key)
                            this.dataSource = newData
                            // 删除成功
                            axios.put('http://192.168.1.106:8080/backend/user/deleteUser', {
                                    tokenBackend: this.tokenStr,
                                    userList: [name],
                                    Headers:{token: this.tokenStr},
                                }
                            ).then( res => {
                                console.log(res.data)
                            }).catch()
                        }
                }).catch()
            },
            // 搜索框
            onSearch(value) {
                const that = this
                if(!value){
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('http://192.168.1.106:8080/backend/user/getUserByUserAccount?userAccount='+value, {headers:{
                            token: this.tokenStr}}).then( res => {
                        // console.log(res.data.msg)
                        console.log(res.data.data)
                        this.total = 1
                        // 暂时采用的方法，直接重写数据源
                        this.dataSource = [{
                            key : 1,
                            name: res.data.data.userAccount,
                            limit: res.data.data.userLimit>0?'管理员':'普通用户',
                            time: res.data.data.gmtCreate,
                            editable: res.data.data.userLimit!=='0',
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
                axios.get('http://192.168.1.106:8080/backend/user/listUsers/'+currentPage+'/'+size).then(res => {
                    console.log(res.data.data)
                    for (let i = 0; i <res.data.data.length; i++) {
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            limit: res.data.data[i].userLimit>0?'管理员':'普通用户',
                            time: res.data.data[i].gmtCreate,
                            editable: res.data.data[i].userLimit!=='0',
                        }
                        datalist.push(c)
                    }
                    that.dataSource = datalist
                }).catch()
            },
            onShowSizeChange(current, size) {
                this.pageSize = size;
                const that = this
                const datalist = []
                axios.get('http://192.168.1.106:8080/backend/user/listUsers/'+current+'/'+size).then(res => {
                    for (let i = 0; i <res.data.data.length; i++) {
                        let c = {
                            key : i+1,
                            name: res.data.data[i].userAccount,
                            limit: res.data.data[i].userLimit>0?'管理员':'普通用户',
                            time: res.data.data[i].gmtCreate,
                            editable: res.data.data[i].userLimit!=='0',
                        }
                        datalist.push(c)
                    }
                    that.dataSource = datalist
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
