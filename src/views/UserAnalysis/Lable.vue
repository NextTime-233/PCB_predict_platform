<!--标签管理-->
<template>
    <div>
        <div class="order-form-searchBar">
            <a-tree-select
                    v-model="value"
                    show-search
                    style="width: 100%"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    tree-default-expand-all
            >
                <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
                    <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
                        <a-tree-select-node key="random" :selectable="false" value="leaf1" title="my leaf" />
                        <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
                    </a-tree-select-node>
                    <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
                        <a-tree-select-node key="random3" value="sss">
                            <b slot="title" style="color: #08c">sss</b>
                        </a-tree-select-node>
                    </a-tree-select-node>
                </a-tree-select-node>
            </a-tree-select>
        </div>
        <h1>订单一体化</h1>
        <!-- <div id="myChart2" :style="{width: '300px', height: '300px', float: 'left'}"></div>-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="100">
            </el-table-column>
            <!-- prop应该就是记号了-->
            <el-table-column
                    prop="timestamp"
                    label="时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="imsi"
                    label="人物编号"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="longitude"
                    label="精度"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="latitude"
                    label="纬度"
                    width="300">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>

</template>

<script>
    let myChart = {}
    export default {
        data() {
            return {
                pageSize: '',
                total: '',
                tableData: [],
                cs:[],
            //  树状搜索框
                treeExpandedKeys: [],
                value: undefined,
            }
        },

        //生命周期函数
        created(){
            const that = this;
            axios.get('http://localhost:8080/backend/').then( res => {
                console.log(res.data)
                const dataset=0;
                // let cs=[];
                console.log(dataset);
                that.tableData = res.data.content;
                that.pageSize = res.data.size;
                that.total = res.data.totalElements;
            })
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            page(currentPage) {
                const that = this;
                axios.get('http://localhost:8081/people/findAll/'+(currentPage-1)+'/10').then(function (resp) {
                    console.log(resp);
                    that.tableData = resp.data.content;
                    that.pageSize = resp.data.size;
                    that.total = resp.data.totalElements
                })
            },

        },
    }
</script>