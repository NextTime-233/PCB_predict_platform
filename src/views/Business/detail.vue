<!--订单明细-->
<template>
    <div>
        <a-card>
            <div class="detail-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin: 10px 0">
                    <a-form id="odForm" layout="horizontal" :model="formInline" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="16" >
                                <a-col :span="6">
                                    <a-form-item label="店铺" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">天猫</a-select-option>
                                            <a-select-option value="2">淘宝</a-select-option>
                                            <a-select-option value="3">其他</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="订单编号" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" >
                                    <a-form-item label="原始单号" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="客户网名" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="8">
                                <a-col :md="6" >
                                    <a-form-item label="电话号码" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-input-number style="width: 100%" placeholder="请输入" size="small"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item
                                            label="货到付款"
                                            :labelCol="{span:7}"
                                            :wrapperCol="{span: 12, offset: 1}"
                                    >
                                        <a-select placeholder="请选择" size="small">
                                            <a-select-option value="1">是</a-select-option>
                                            <a-select-option value="2">否</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="订单状态" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">已取消</a-select-option>
                                            <a-select-option value="2">未付款</a-select-option>
                                            <a-select-option value="3">待尾款</a-select-option>
                                            <a-select-option value="4">待选仓</a-select-option>
                                            <a-select-option value="5">等未付</a-select-option>
                                            <a-select-option value="6">延时审核</a-select-option>
                                            <a-select-option value="7">预订单</a-select-option>
                                            <a-select-option value="8">待抢单</a-select-option>
                                            <a-select-option value="9">待客审</a-select-option>
                                            <a-select-option value="10">待财审</a-select-option>
                                            <a-select-option value="11">已递交仓库</a-select-option>
                                            <a-select-option value="12">已审核</a-select-option>
                                            <a-select-option value="13">已发货</a-select-option>
                                            <a-select-option value="14">部分打款</a-select-option>
                                            <a-select-option value="15">已完成</a-select-option>
                                            <a-select-option value="16">异常发货</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" >
                                    <a-form-item label="所在店铺" :labelCol="{span:7}" :wrapperCol="{span: 12, offset: 1}">
                                        <a-select placeholder="请选择" size=small>
                                            <a-select-option value="1">天猫</a-select-option>
                                            <a-select-option value="2">淘宝</a-select-option>
                                            <a-select-option value="2">其他</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row v-if="advanced"  :gutter="16">
                                <a-col :md="7" >
                                    <a-form-item
                                            label="上次购买时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="用户登记时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="7" >
                                    <a-form-item
                                            label="付款时间"
                                            :labelCol="{span: 7}"
                                            :wrapperCol="{span: 15, offset: 1}"
                                    >
                                        <a-range-picker @change="onChange" size="small">
                                            <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                        </a-range-picker>
                                    </a-form-item>
                                </a-col>
                            </a-row>
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
            </div>
            <div>
                <div class="operator">
                    <a-button @click="addNew" type="primary">新建</a-button>
                    <a-button >批量操作</a-button>
                    <a-dropdown>
                        <a-menu @click="handleMenuClick" slot="overlay">
                            <a-menu-item key="delete">删除</a-menu-item>
                            <a-menu-item key="audit">审批</a-menu-item>
                        </a-menu>
                        <a-button>
                            更多操作 <a-icon type="down" />
                        </a-button>
                    </a-dropdown>
                </div>
                <standard-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :selectedRows.sync="selectedRows"
                        @clear="onClear"
                        @change="onChange"
                        @selectedRowChange="onSelectChange"
                >
                    <div slot="description" slot-scope="{text}">
                        {{text}}
                    </div>
                    <div slot="action" slot-scope="{text, record}">
                        <a style="margin-right: 8px">
                            <a-icon type="plus"/>新增
                        </a>
                        <a style="margin-right: 8px">
                            <a-icon type="edit"/>编辑
                        </a>
                        <a @click="deleteRecord(record.key)">
                            <a-icon type="delete"/>删除1
                        </a>
                        <a @click="deleteRecord(record.key)" v-auth="`delete`">
                            <a-icon type="delete"/>删除2
                        </a>
                    </div>
                    <template slot="statusTitle">
                        <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                    </template>
                </standard-table>
            </div>
        </a-card>
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

    for (let i = 0; i < 100; i++) {
        dataSource.push({
            key: i,
            no: 'NO ' + i,
            description: '这是一段描述',
            callNo: Math.floor(Math.random() * 1000),
            status: Math.floor(Math.random() * 10) % 4,
            updatedAt: '2018-07-26'
        })
    }

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
        margin-bottom: 54px;
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
