<!--标签管理-->
<template>
    <div>
        <div class="order-form-searchBar">
            <div class="global-search-wrapper" style="width: 300px">
                <a-input-search placeholder="input search text" enter-button @search="onSearch" />
            </div>
        </div>

        <a-table :columns="dataColumns" :dataSource="dataSource" :pagination="false">

        </a-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="pageSizeOptions"
                :page-size="100"
                layout="sizes, prev, pager, next"
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
            title: 'remark',
            key: 'remark',
            scopedSlots: { customRender: 'remark' }
        },
        {
            title: '更新时间',
            key: 'updateTime',
            scopedSlots: { customRender: 'updateTime' }
        }
    ]

    export default {
        data() {
            return {
                columns,
                dataSource: [],
                tokenStr: '',
                //  divided pages
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 10,
                total: 0,
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
                        remark: res.data.data[i].remark,
                        updateTime: res.data.data[i].updateTime,
                        editable: false,
                    }
                    this.dataSource.push(c)
                }
            }).catch()
        },
        methods: {

            page(currentPage) {
                const that = this;
                axios.get('http://localhost:8080/backend/label/findAllLabelVal').then(function (resp) {
                    console.log(resp);

                })
                this.labelList=res.data.data
                console.log(res)
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
            onShowSizeChange(current, pageSize) {
                this.pageSize = pageSize;
                sessionStorage.setItem('current', current);
                sessionStorage.setItem('pageSize', pageSize);
            },

        },
    }
</script>

<style>
    .global-search-wrapper {
        padding-right: 50px;
        margin: 20px 0;
    }
</style>