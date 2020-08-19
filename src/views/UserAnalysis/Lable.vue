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

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="100">
            </el-table-column>
            <!-- prop应该就是记号了-->
            <el-table-column
                    prop="labelDimension"
                    label="所属维度"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="labelVal"
                    label="标签名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="labelRule"
                    label="标签描述"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="创建时间"
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
                labelDimension: '',
                labelVal: '',
                labelRule:'',
                updateTime:'',
                labelList: [],
                value: undefined,
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
                that.labelList = res.data.content;
                that.labelDimension = res.data.labelDimension;
                that.labelVal = res.data.labelVal;
                that.labelRule=res.data.labelRule;
                that.updateTime=res.data.updateTime;
            }).catch()
        },
        methods: {

            page(currentPage) {
                const that = this;
                axios.get('http://localhost:8080/backend/label/findAllLabelVal').then(function (resp) {
                    console.log(resp);
                    that.labelList = res.data.content;
                    that.labelDimension = res.data.labelDimension;
                    that.labelVal = res.data.labelVal;
                    that.labelRule=res.data.labelRule;
                    that.updateTime=res.data.updateTime;
                })
            },

        },
    }
</script>