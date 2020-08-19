<!--客户画像-->

<template>
    <div>
        <a-card>
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
                                    <a-select placeholder="请选择" size=small>
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

        </a-card>
        <div class="detail-display">
            <div>
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="基本信息">
                        Content of Tab Pane 1
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="学历信息" force-render>
                        Content of Tab Pane 2
                    </a-tab-pane>

                </a-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import StandardTable from '@/components/StandardTable'

    const columns = [
        {
            title: '规则编号',
            dataIndex: 'no'
        },
        {
            title: '描述',
            dataIndex: 'description',
            scopedSlots: { customRender: 'description' }
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text) => text + ' 次'
        },
        {
            dataIndex: 'status',
            needTotal: true,
            slots: {title: 'statusTitle'}
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'action' }
        }
    ]

    const dataSource = []



    export default {
        name: "detail",
        components: {StandardTable},
        data () {
            return {
                advanced: true,
                columns: columns,
                dataSource: dataSource,
                selectedRows: []
            }
        },
        authorize: {
            deleteRecord: 'delete'
        },
        created() {
            axios.get('http://localhost:8080/backend/').then( res => {
                console.log(res.data)
            })
        },
        methods: {
            deleteRecord(key) {
                this.dataSource = this.dataSource.filter(item => item.key !== key)
                this.selectedRows = this.selectedRows.filter(item => item.key !== key)
            },
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            remove () {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('您清空了勾选的所有行')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },
            onChange() {
                this.$message.info('表格状态改变了')
            },
            onSelectChange() {
                this.$message.info('选中行改变了')
            },
            addNew () {
                this.dataSource.unshift({
                    key: this.dataSource.length,
                    no: 'NO ' + this.dataSource.length,
                    description: '这是一段描述',
                    callNo: Math.floor(Math.random() * 1000),
                    status: Math.floor(Math.random() * 10) % 4,
                    updatedAt: '2018-07-26'
                })
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
