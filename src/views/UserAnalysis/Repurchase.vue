<template>
   <div>
       <a-card>
           <el-row>
           <span>
               请选择货品：
           </span>
           <el-select
               v-model="value"
               multiple
               filterable
               remote
               reserve-keyword
               placeholder="请输入关键词"
               :remote-method="remoteMethod"
               :loading="loading"
               >
               <el-option
                       v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
               </el-option>
           </el-select>
           </el-row>
           <el-row>
           <el-table
                   :data="tableData"
                   height="250"
                   border
                   style="width: 100%">
               <el-table-column
                       prop="date"
                       label="日期"
                       width="180">
               </el-table-column>
               <el-table-column
                       prop="name"
                       label="姓名"
                       width="180">
               </el-table-column>
               <el-table-column
                       prop="address"
                       label="地址">
               </el-table-column>
           </el-table>
           </el-row>
       </a-card>
   </div>

</template>

<script>
    export default {
        name: "Repurchase",
        data() {
            return {
                // options: [{
                //     value: '选项1',
                //     label: '黄金糕'
                // }, {
                //     value: '选项2',
                //     label: '双皮奶'
                // }, {
                //     value: '选项3',
                //     label: '蚵仔煎'
                // }, {
                //     value: '选项4',
                //     label: '龙须面'
                // }, {
                //     value: '选项5',
                //     label: '北京烤鸭'
                // },{
                //     value: '选项6',
                //     label: '北京烤鹅'
                // }
                // ],
                // value: '',
                tableData:[],
                options: [],
                value: [],
                list: [],
                loading: false,
                states: ["Alabama", "Alaska", "Arizona",
                    "Arkansas", "California", "Colorado",
                    "Connecticut", "Delaware", "Florida",
                    "Georgia", "Hawaii", "Idaho", "Illinois",
                    "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland",
                    "Massachusetts", "Michigan", "Minnesota",
                    "Mississippi", "Missouri", "Montana",
                    "Nebraska", "Nevada", "New Hampshire",
                    "New Jersey", "New Mexico", "New York",
                    "North Carolina", "North Dakota", "Ohio",
                    "Oklahoma", "Oregon", "Pennsylvania",
                    "Rhode Island", "South Carolina",
                    "South Dakota", "Tennessee", "Texas",
                    "Utah", "Vermont", "Virginia",
                    "Washington", "West Virginia", "Wisconsin",
                    "Wyoming"]
            }
        },
        mounted() {
            this.list = this.states.map(item => {
                return { value: `value:${item}`, label: `label:${item}` };
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options = this.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            }
        }
    }


</script>

<style scoped>
    /*.el-row {*/
        /*margin-bottom: 20px;*/
         /*&:last-child {*/
         /*margin-bottom: 0;*/
     /*}*/
    /*}*/
    .el-row{
        margin-bottom: 20px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 40px;
        color: #bf271f;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width:100%;
    }
</style>