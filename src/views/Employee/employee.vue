<!--员工管理-->
<template>
    <div>
        <div class="employee-list-display">
            <div class="global-search-wrapper" style="width: 300px">
                <a-auto-complete
                        class="global-search"
                        size="large"
                        style="width: 100%"
                        placeholder="查询用户"
                        option-label-prop="title"
                        @select="onSelect"
                        @search="handleSearch"
                >
                    <template slot="dataSource">
                        <a-select-option v-for="item in dataSource0" :key="item.category" :title="item.category">
                            Found {{ item.query }} on
                            <a
                                    :href="`https://s.taobao.com/search?q=${item.query}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                            >
                                {{ item.category }}
                            </a>
                            <span className="global-search-item-count">{{ item.count }} results</span>
                        </a-select-option>
                    </template>
                    <a-input>
                        <a-button
                                slot="suffix"
                                style="margin-right: -12px"
                                class="search-btn"
                                size="large"
                                type="primary"
                        >
                            <a-icon type="search" />
                        </a-button>
                    </a-input>
                </a-auto-complete>
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

    const dataSource = [
        {
            key: 1,
            name: '小明',
            code: '001',
            editable: false,
            department: '行政部'
        },
        {
            key: 2,
            name: '李莉',
            code: '002',
            editable: false,
            department: 'IT部'
        },
    ]

    export default {
        name: 'employee',
        components: {PageRoll},
        data () {
            return {
                columns,
                dataSource,
                // 搜索框
                dataSource0: [],
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
            axios.get('http://localhost:8080//backend/user/listUsers', {headers:{
                    token: tokenStr}}).then( res => {
                console.log(res.data.msg)
                console.log(res)
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
                axios.put('http://localhost:8080//backend/user/deleteUser', {headers:{
                        token: this.tokenStr, userList: name}}).then( res => {
                    console.log(res.data.msg)
                })
            },
            saveRow (key) {
                let target = this.dataSource.filter(item => item.key === key)[0]
                target.editable = false
                target.isNew = false
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
            //    搜索框
            onSelect(value) {
                let tokenStr = this.data()
                console.log('onSelect', value);
                axios.get('http://localhost:8080/backend/user/getUserByUserAccount?userAccount='+ value, {headers:{
                        token: this.tokenStr}}).then( res => {
                    console.log(res.data.msg)
                    console.log(res.data.data)
                })
            },

            handleSearch(value) {
                console.log(this.tokenStr)
                this.dataSource0 = value ? this.searchResult(value) : [];
            },

            getRandomInt(max, min = 0) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            searchResult(query) {
                return new Array(this.getRandomInt(5))
                    .join('.')
                    .split('.')
                    .map((item, idx) => ({
                        query,
                        category: `${query}${idx}`,
                        count: this.getRandomInt(200, 100),
                    }));
            },

        }
    }
</script>

<style scoped>
    .employee-list-display {
        height: 50%;
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
