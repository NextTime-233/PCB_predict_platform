<template>
    <el-card class="box-card" style="width:100%"  v-loading="loading"
             element-loading-text="故障诊断中，请耐心等待"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
            <el-button slot="trigger" size="medium" type="primary">选取数据文件</el-button>
            <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">数据可视化</el-button>

        </el-upload>
        <el-divider></el-divider>
        <!--<div class="demo-image" style="margin-top:10px">-->
            <!--<div class="block" v-for="fit in fits" :key="fit">-->
                <!--<span class="demonstration">{{ fit }}</span>-->
                <!--<el-image-->
                        <!--style="width: 500px; height: 150px"-->
                        <!--:src="require('F:/idea_project/bearing_font/bearing_font/src/assets/xinhao.png')"-->
                        <!--:fit="fit"></el-image>-->
            <!--</div>-->
        <!--</div>-->
        <span style="font-size: medium">已有模型选择</span>&nbsp;
        <el-select  v-model="value" placeholder="请选择模型" size="small">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button  style="margin-left: 5px" @click="showClassification" size="small" type="warning">故障诊断</el-button>
        <div>
            <el-form ref="formData" :model="formData" label-width="80px">

                <!--<el-form-item label="数据集">-->
                    <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-select v-model="formData.region" placeholder="请选择数据集">&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-option label="凯斯西储大学实验室数据" value="CWRU"></el-option>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-option label="辛辛那提大学实验室数据" value="UC"></el-option>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-option label="传感器数据" value="sensor"></el-option>&ndash;&gt;-->
                            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

                        <!--&lt;!&ndash;<el-button  style="margin-left: 10px" size="small" type="primary" @click="onImage()" >数据可视化</el-button>&ndash;&gt;-->

                        <!--&lt;!&ndash;<el-col >&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="demo-image">&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="block" v-for="fit in fits" :key="fit">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<span class="demonstration">{{ fit }}</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<el-image&ndash;&gt;-->
                                            <!--&lt;!&ndash;style="width: 500px; height: 150px"&ndash;&gt;-->
                                            <!--&lt;!&ndash;:src="require('F:/idea_project/bearing_font/bearing_font/src/assets/xinhao.png')"&ndash;&gt;-->
                                            <!--&lt;!&ndash;:fit="fit"></el-image>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button type="primary" @click="onSubmit" size="medium">已有模型故障诊断</el-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button  @click="showClassification" size="medium" type="warning">故障类别诊断</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
                <!--</el-form-item>-->
                <!--<el-card shadow="always">-->
                    <!--<el-form-item label="选择HP">-->
                        <!--<el-radio-group v-model="formData1.path">-->
                            <!--<el-radio label="0HP"></el-radio>-->
                            <!--<el-radio label="1HP"></el-radio>-->
                            <!--<el-radio label="2HP"></el-radio>-->
                            <!--<el-radio label="3HP"></el-radio>-->
                            <!--<el-radio label="4HP"></el-radio>-->
                        <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                    <!--<div slot="header" class="clearfix">-->
                        <!--<el-switch-->
                                <!--v-model="value1"-->
                                <!--active-text="更改默认值"-->
                                <!--inactive-text="默认参数调整">-->
                        <!--</el-switch>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<el-row :gutter="20">-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                    <!--<el-form-item label="batch-size">-->
                                        <!--<el-input-->
                                                <!--placeholder="256"-->
                                                <!--v-model="formData1.batchSize"-->
                                                <!--:disabled="false">-->
                                        <!--</el-input>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                    <!--<el-form-item label="epochs">-->
                                        <!--<el-input-->
                                                <!--placeholder="20"-->
                                                <!--v-model="formData1.epochs"-->
                                                <!--:disabled="false">-->
                                        <!--</el-input>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row :gutter="20">-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                    <!--<el-form-item label="length">-->
                                        <!--<el-input-->
                                                <!--placeholder="5200"-->
                                                <!--v-model="formData1.length"-->
                                                <!--:disabled="false">-->
                                        <!--</el-input>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->

                                    <!--<el-form-item label="isBatchNorm">-->
                                        <!--<el-select v-model="formData1.isBatchNorm" placeholder="True">-->
                                            <!--<el-option label="True" value="True"></el-option>-->
                                            <!--<el-option label="False" value="False"></el-option>-->
                                        <!--</el-select>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row :gutter="20">-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                    <!--<el-form-item label="number">-->
                                        <!--<el-input-->
                                                <!--placeholder="1000"-->
                                                <!--v-model="formData1.num"-->
                                                <!--:disabled="false">-->
                                        <!--</el-input>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                    <!--<el-form-item label="normal">-->
                                        <!--<el-select v-model="formData1.isNormal" placeholder="True">-->
                                            <!--<el-option label="True" value="True"></el-option>-->
                                            <!--<el-option label="False" value="False"></el-option>-->
                                        <!--</el-select>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row :gutter="20">-->
                            <!--<el-col :span="12">-->
                                <!--<div >-->
                                    <!--<el-button   @click="showData" size="medium" type="success">自定义模型参数故障诊断</el-button>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</div>-->
                <!--</el-card>-->
                <el-divider content-position="left">诊断记录</el-divider>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;margin-top: 10px">
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="模型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="data"
                            label="数据源">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="诊断结果">
                    </el-table-column>

                </el-table>
                <el-form-item>
                    <el-dialog title="模型诊断结果" :visible.sync="dialogTableVisible">
                        <el-radio-group v-model="radio">
                            <el-radio :label="3">分类报告</el-radio>
                            <el-radio :label="6">混淆矩阵</el-radio>
                            <el-radio :label="9">ROC曲线</el-radio>
                            <el-radio :label="12">精度召回曲线</el-radio>
                            <el-radio :label="15">损失曲线</el-radio>
                            <el-radio :label="18">正确率曲线</el-radio>
                        </el-radio-group>
                        <!--<el-row>-->
                        <!--<el-col :span="8"> Acc:<span>{{showData1.Acc}}</span></el-col>-->
                        <!--<el-col :span="8"><span>Acc：测试集上的精确度</span></el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="8">Loss:<span>{{showData1.Loss}}</span></el-col>-->
                        <!--<el-col :span="8"><span>Loss：测试集上的损失</span></el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="8"> Precision:<span>{{showData1.Precision}}</span></el-col>-->
                        <!--<el-col :span="8"><span>查准率：机器学习模型评价指标。</span></el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="8">Recall:<span>{{showData1.Recall}}</span></el-col>-->
                        <!--<el-col :span="8"><span>查全率：机器学习模型评价指标。</span></el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="8">F1:<span>{{showData1.F1}}</span></el-col>-->
                        <!--<el-col :span="8"><span>F1是查准率和查全率的调和平均数。</span></el-col>-->
                        <!--</el-row>-->
                        <el-col >
                            <!--<div class="demo-image1">-->
                                <!--<div class="block1" v-for="fit in fits" :key="fit">-->
                                    <!--<span class="demonstration1">{{ fit }}</span>-->
                                    <!--<el-image-->
                                            <!--style="width: 550px; height: 450px"-->
                                            <!--:src="require('F:/idea_project/bearing_font/bearing_font/src/assets/hunxiaojuzhen.png')"-->
                                            <!--:fit="fit"></el-image>-->
                                <!--</div>-->
                            <!--</div>-->
                        </el-col>
                        <span slot="footer" class="dialog-footer">
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogTableVisible = false">保存</el-button>
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                </div>
               </span>
                    </el-dialog>
                    <el-dialog title="自定义模型诊断结果" :visible.sync="dialogTableVisible2">
                        <el-row>
                            <el-col :span="8"> </el-col>
                            <el-col :span="8"> Acc:<span>{{showData2.Acc}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">F1:<span>{{showData2.F1}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">Loss:<span>{{showData2.Loss}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8"> Precision:<span>{{showData2.Precision}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">Recall:<span>{{showData2.Recall}}</span></el-col>
                        </el-row>
                        <span slot="footer" class="dialog-footer">
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogTableVisible2 = false">保存</el-button>
                  <el-button @click="dialogTableVisible2 = false">取 消</el-button>
                </div>
               </span>
                    </el-dialog>
                    <el-dialog title="故障类别诊断" :visible.sync="dialogTableVisible3">
                        <span>{{showData3}}</span>
                        <span slot="footer" class="dialog-footer">
                            <div slot="footer" class="dialog-footer">
                              <el-button type="primary" @click="dialogTableVisible2 = false">保存</el-button>
                              <el-button @click="dialogTableVisible2 = false">取 消</el-button>
                            </div>
                       </span>
                    </el-dialog>
                </el-form-item>
            </el-form>

        </div>

    </el-card>

</template>
<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        date: '2021-04-15 11:39:35',
                        name: 'WKCNN',
                        address: '0.014英寸滚动体故障',
                        data:'12k_Drive_End_B014_1_186.mat'
                    },
                    {
                        date: '2021-04-15 10:00:01',
                        name: 'WKCNN',
                        address: '0.007英寸滚动体故障',
                        data:'12k_Drive_End_B007_1_119.mat'
                    },

                    {
                        date: '2021-03-30 21:14:21',
                        name: 'WKCNN',
                        address: '0.007英寸外圈故障',
                        data:'12k_Drive_End_OR007@6_3_133.mat'
                    },
                    {
                        date: '2021-03-30 21:09:01',
                        name: '随机森林',
                        address: '0.021英寸内圈故障',
                        data:'12k_Drive_End_IR021_2_211.mat'
                    }, {
                        date: '2021-03-30 21:01:00',
                        name: 'LSTM',
                        address: '0.014英寸滚动体故障',
                        data:'12k_Drive_End_B014_2_187.mat'
                    },{
                        date: '2021-03-30 20:00:01',
                        name: 'WKCNN',
                        address: '0.007英寸滚动体故障',
                        data:'12k_Drive_End_B007_1_119.mat'
                    },

                ],
                radio: 3,
                fits: [ ''],
                // url: 'src/assets/xinhao.png',
                loading:false,
                options: [{
                    value: '选项1',
                    label: 'WKCNN'
                }, {
                    value: '选项2',
                    label: 'LSTM'
                }, {
                    value: '选项3',
                    label: 'GRU'
                }, {
                    value: '选项4',
                    label: '随机森林'
                },{
                    value: '选项5',
                    label: 'SCNN'
                },{
                    value: '选项6',
                    label: 'SSCNN'
                },
                ],
                value: '',
                value1: true,
                encradio: '2',
                inputBatchSize:'',
                inputEpochs:'',
                inputLength:'',
                inputBatchNormal:'',
                inputNumber:'',
                inputEncStep:'',
                Acc:'',
                F1:'',
                Loss:'',
                Precision:'',
                Recall:'',
                gridData: [{
                    name: '测试集精确度',
                    result: '99%',
                }, {
                    name: '测试集查全率',
                    result: '99%',
                },{
                    name: '测试集召回率',
                    result: '99%',
                },{
                    name: '测试集上的损失',
                    result: '99%',
                },{
                    name: '测试集F1-Measure',
                    result: '99%',
                }],
                dialogTableVisible: false,
                dialogTableVisible2:false,
                dialogTableVisible3:false,
                formLabelWidth: '120px',
                formData: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formData1:{
                    path:'',
                    length:'',
                    epochs:'',
                    batchSize:'',
                    num:'',
                    isBatchNorm:'',
                    isNormal:'',
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                showData1:[],
                showData2:[],
                showData3:[],
            }
        },
        methods: {
            onImage(){

            },
            onSubmit() {
                this.loading= true
                console.log('submit!');
                const that=this
                // axios.get('/backend/model/wkcnn/loadWKCNNModel').then(res=> {
                //   that.showData1=res.data.data
                //   console.log(res.data)
                //   console.log(that.showData1.Acc)
                //   that.dialogTableVisible=true;
                //   that.loading=false
                // })
                that.dialogTableVisible=true;
                that.loading=false
            },
            onShow(){
                // dialogTableVisible=true;
            },
            showData(){
                this.loading= true
                console.log('showData!');
                const that=this
                axios.get('/backend/model/wkcnn/adjustWKCNN?path='+this.formData1.path+'&length='+this.formData1.length+'&epochs='
                    +this.formData1.epochs+'&batchSize='+this.formData1.batchSize+'&num='+this.formData1.num+'&isBatchNorm='+
                    this.formData1.isBatchNorm+'&isNormal='+this.formData1.isNormal).then(res=> {
                    that.showData2=res.data.data
                    console.log(res.data)
                    console.log(res.data.data)
                    that.dialogTableVisible2=true;
                    that.loading=false
                })
            },
            showClassification(){
                // this.loading= true
                // console.log('showClassification!');
                // const that=this
                // axios.get('/backend/model/wkcnn/WKCNNClassification').then(res=> {
                //     that.showData3=res.data.data
                //     console.log(res.data)
                //     that.dialogTableVisible3=true;
                //     // that.loading=false
                // })
                this.$confirm('诊断结果：0.014英寸滚动体故障','诊断结果',{
                    type:"success"
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 2px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .page-roll {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .right {
        float: right;
        width: 60px;
    }
    .item {
        margin: 4px;
    }
    .block{

    }
    .button{
        margin-left: 50px;
    }
</style>
