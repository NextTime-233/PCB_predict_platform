<template>
    <div>
        <div class="employee-list-display">
            <div class="global-search-wrapper" style="width: 300px">
                <a-auto-complete
                        class="global-search"
                        size="large"
                        style="width: 100%"
                        placeholder="input here"
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
                    <template  v-for="(col, i) in ['name', 'number', 'department']" :slot="col" slot-scope="text, record">
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
                          <a-popconfirm title='deleteConfirm' @confirm="remove(record.key)">
                            <a>delete</a>
                          </a-popconfirm>
                        </span>
                    </template>
                </a-table>
                <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">newMember</a-button>
            </form>
            <PageRoll></PageRoll>
        </div>
        <div class="detail-display">
            <div>
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="基本信息">
                        Content of Tab Pane 1
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="学历信息" force-render>
                        Content of Tab Pane 2
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="工作经验">
                        Content of Tab Pane 3
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import PageRoll from "../../components/PageRoll";
    const columns = [
        {
            title: '成员姓名',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
        },
        {
            title: '工号',
            dataIndex: 'number',
            key: 'number',
            width: '20%',
            scopedSlots: { customRender: 'number' }
        },
        {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
            width: '40%',
            scopedSlots: { customRender: 'department' }
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
            number: '001',
            editable: false,
            department: '行政部'
        },
        {
            key: 2,
            name: '李莉',
            number: '002',
            editable: false,
            department: 'IT部'
        },
        {
            key: 3,
            name: '王小帅',
            number: '003',
            editable: false,
            department: '财务部'
        }
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
            axios.get('http://localhost:8080/backend/user/getUserByUserAccount?userAccount='+window.sessionStorage.getItem('user'), {headers:{
                    token:tokenStr}}).then( res => {
                console.log(res.data.msg)
                console.log(res.data.data)
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
                    number: '',
                    department: '',
                    editable: true,
                    isNew: true
                })
            },
            remove (key) {
                const newData = this.dataSource.filter(item => item.key !== key)
                this.dataSource = newData
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
                console.log('onSelect', value);
            },

            handleSearch(value) {
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
            // 标签页
            callback(key) {
                console.log(key);
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
