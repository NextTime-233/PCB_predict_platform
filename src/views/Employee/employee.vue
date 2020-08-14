<!--员工管理-->
<template>
    <div>
        <div class="employee-list-display">
            <div class="global-search-wrapper" style="width: 300px">
                <a-input-search placeholder="input search text" enter-button @search="onSearch" />
            </div>
            <form :autoFormCreate="(form) => this.form = form">
                <a-table
                        :columns="dataColumns"
                        :dataSource="dataSource"
                        :pagination="false"
                >
                    <template  v-for="(col, i) in ['name', 'code']" :slot="col" slot-scope="text, record">
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
                            <a @click="saveRow(record.key)">add</a>
                            <a-divider type="vertical" />
                            <a-popconfirm :title="deleteConfirm" @confirm="remove(record.key)">
                              <a>delete</a>
                            </a-popconfirm>
                          </span>
                            <span v-else>
                                <a @click="saveRow(record.key)">save</a>
                                <a-divider type="vertical" />
                                <a @click="cancle(record.key)">cancel</a>
                            </span>
                        </template>
                        <span v-else>
                          <a @click="toggle(record.key)">edit</a>
                          <a-divider type="vertical" />
                          <a-popconfirm title='deleteConfirm' @confirm="remove(record.key,record.name)">
                            <a>delete</a>
                          </a-popconfirm>
                        </span>
                    </template>
                </a-table>
                <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">newMember</a-button>
            </form>
            <PageRoll></PageRoll>
        </div>
    </div>
</template>

<script>
    import PageRoll from "../../components/PageRoll";
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
        },
        {
            title: '密码',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            scopedSlots: { customRender: 'code' }
        },
        {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ]

    // const dataSource = [
    //     {
    //         key: 1,
    //         name: '李莉',
    //         code: '001',
    //         editable: false,
    //     },
    // ]

    export default {
        name: 'employee',
        components: {PageRoll},
        data () {
            return {
                columns,
                dataSource: [],
                tokenStr: window.sessionStorage.getItem('token'),
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
            const tokenStr = window.sessionStorage.getItem('token')
            const current = window.sessionStorage.getItem('current')
            const pageSize = window.sessionStorage.getItem('pageSize')
            axios.get('http://localhost:8080/backend/user/listUsers/'+current+'/'+pageSize, {headers:{
                    token: tokenStr}}).then( res => {
                console.log(res.data.msg)
                console.log(res)
                for(let i = 0; i< res.data.data.length; i++){
                    let c = {
                        key : i+1,
                        name: res.data.data[i].userAccount,
                        code: res.data.data[i].userPwd,
                        editable: false,
                    }
                    this.dataSource.push(c)
                }
            })
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault()
            },
            newMember () {
                this.dataSource.push({
                    key: this.dataSource.length + 1,
                    name: '',
                    code: '',
                    department: '',
                    editable: true,
                    isNew: true
                })
            },
            remove (key, name) {
                const newData = this.dataSource.filter(item => item.key !== key)
                this.dataSource = newData
                console.log(name)
                axios.put('http://localhost:8080/backend/user/deleteUser', {headers:{
                        token: this.tokenStr},
                        userList: [name],
                        tokenBackend: this.tokenStr
                        }
                    ).then( res => {
                    console.log(res.data)
                })
            },
            saveRow (key) {
                let target = this.dataSource.filter(item => item.key === key)[0]
                target.editable = false
                target.isNew = false
                axios.put('http://localhost:8080/backend/user/updateUserPwd', {headers:{
                            token: this.tokenStr},
                        userAccount: [name],
                        userPwd: this.tokenStr
                    }
                ).then( res => {
                    console.log(res.data)
                })
            },
            toggle (key) {
                let target = this.dataSource.filter(item => item.key === key)[0]
                target.editable = !target.editable
            },
            getRowByKey (key, newData) {
                const data = this.dataSource
                return (newData || data).filter(item => item.key === key)[0]
            },
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
                console.log(value);
                if(!value){
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('http://localhost:8080/backend/user/getUserByUserAccount?userAccount='+value, {headers:{
                            token: this.tokenStr}}).then( res => {
                        console.log(res.data.msg)
                        console.log(res.data.data)
                        // 暂时采用的方法，直接重写数据源
                        this.dataSource = [{
                            key : 1,
                            name: res.data.data.userAccount,
                            code: res.data.data.userPwd,
                            editable: false,
                        }]
                    })
                }
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

    .global-search {
        width: 100%;
    }

    .global-search.ant-select-auto-complete .ant-select-selection--single {
        margin-right: -46px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input:not(:last-child) {
        padding-right: 62px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .global-search-item {
        display: flex;
    }

    .global-search-item-desc {
        flex: auto;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .global-search-item-count {
        flex: none;
    }


</style>
