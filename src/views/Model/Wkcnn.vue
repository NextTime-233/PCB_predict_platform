<template>
  <el-card class="box-card" style="width:100%"  v-loading="loading"
           element-loading-text="模型训练中，请耐心等待"
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
    <div>
      <el-form ref="formData" :model="formData" label-width="100px" label-position="left">
        <el-row>
            <el-col :span="4">
            </el-col>
        </el-row>
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <el-switch
                v-model="value1"
                active-text="更改默认值"
                inactive-text="默认参数调整">
            </el-switch>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="模型">
                    <el-select  v-model="form.mymodel" placeholder="请选择模型" size="medium">
                      <el-option v-for="(item,index) in mymodel"
                                 :key="index"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="电机负载">
                    <el-select  v-model="form.motor" placeholder="请选择负载" size="medium">
                      <el-option v-for="(item,index) in motor"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple ">
                  <el-form-item label="signal_length">
                    <el-input
                            placeholder="2000"
                            v-model="formData1.signal_length"
                            :disabled="false">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple ">
                  <el-form-item label="signal_number">
                    <el-input
                            placeholder="800"
                            v-model="formData1.signal_number"
                            :disabled="false">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="normal">
                    <el-select v-model="form.normal" placeholder="True" size="medium">
                      <el-option v-for="(item,index) in normal"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="batch_size">
                    <el-input
                            placeholder="128"
                            v-model="formData1.batch_size"
                            :disabled="false">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="epochs">
                    <el-input
                        placeholder="60"
                        v-model="formData1.epochs"
                        :disabled="false">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="num_classes">
                    <el-input v-model="formData1.num_classes" placeholder="10" :disabled="False"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div >
                  <el-button   @click="showClassification" size="medium" type="warning">模型训练</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-form-item>
          <!--同步动态双向的来表示visible的值，当我们关闭窗口的时候，这个弹框隐藏了，visible的值发生了变化-->
          <el-dialog title="模型训练结果" :visible.sync="dialogTableVisible">
                <el-radio-group v-model="radio">
                  <el-radio :label="3">分类报告</el-radio>
                  <el-radio :label="6">混淆矩阵</el-radio>
                  <!--<el-radio :label="9">ROC曲线</el-radio>-->
                  <el-radio :label="12">精度召回曲线</el-radio>
                  <el-radio :label="15">损失曲线</el-radio>
                  <el-radio :label="18">正确率曲线</el-radio>
                </el-radio-group>
                <!--<el-row>-->
                <!--  <el-col :span="8"> Acc:<span>{{showData1.Acc}}</span></el-col>-->
                <!--  <el-col :span="8"><span>Acc测试集上的精确度</span></el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <!--  <el-col :span="8">Loss:<span>{{showData1.Loss}}</span></el-col>-->
                <!--  <el-col :span="8"><span>Loss：测试集上的损失</span></el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <!--  <el-col :span="8"> Precision:<span>{{showData1.Precision}}</span></el-col>-->
                <!--  <el-col :span="8"><span>查准率：机器学习模型评价指标。</span></el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <!--  <el-col :span="8">Recall:<span>{{showData1.Recall}}</span></el-col>-->
                <!--  <el-col :span="8"><span>查全率：机器学习模型评价指标。</span></el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <!--  <el-col :span="8">F1:<span>{{showData1.F1}}</span></el-col>-->
                <!--  <el-col :span="8"><span>F1是查准率和查全率的调和平均数。</span></el-col>-->
                <!--</el-row>-->
                <el-col >
                  <div class="demo-image1">
                    <div class="block1" v-for="fit in fits" :key="fit">
                      <span class="demonstration1">{{ fit }}</span>
                      <el-image
                              style="width: 400px; height: 380px"
                              :src="require('E:\\Github\\bearing_font\\src\\assets\\WKCNN_train_valid_acc.png')"
                              :fit="fit"></el-image>
                    </div>
                  </div>
                </el-col>
                <span slot="footer" class="dialog-footer">
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogTableVisible = false;open2()">保存模型</el-button>
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                </div>
               </span>
              </el-dialog>
          <el-dialog title="自定义模型参数训练结果" :visible.sync="dialogTableVisible2">
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
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      radio: 3,
      fits: [ ''],
      // url: 'src/assets/xinhao.png',
      loading:false,
      mymodel: [{
        value: '1',
        label: 'WKCNN'
      }, {
        value: '2',
        label: 'LSTM'
      }, {
        value: '3',
        label: 'GRU'
      }, {
        value: '4',
        label: '随机森林'
      },{
        value: '5',
        label: 'SCNN'
      },{
        value: '6',
        label: 'SSCNN'
      }
      ],
      motor: [{
        value: '1',
        label: '0HP'
      }, {
        value: '2',
        label: '1HP'
      }, {
        value: '3',
        label: '2HP'
      }, {
        value: '4',
        label: '3HP'
      }
      ],
      normal:[{value:'1',label:'True'},{value:'2',label:'False'}],
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
      formData1:{
        path:'',
        parameter_type:'',
        data_name:'',
        signal_length:'',
        signal_number:'',
        epochs:'',
        batch_size:'',
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
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    onImage(){
    },
    open2() {
      this.$message({
        message: '模型保存成功！',
        type: 'success',
        offset:300
      });
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
      // this.loading= true
      // console.log('showData!');
      // const that=this
      // axios.get('/backend/model/wkcnn/adjustWKCNN?path='+this.formData1.path+'&length='+this.formData1.length+'&epochs='
      //         +this.formData1.epochs+'&batchSize='+this.formData1.batchSize+'&num='+this.formData1.num+'&isBatchNorm='+
      //         this.formData1.isBatchNorm+'&isNormal='+this.formData1.isNormal).then(res=> {
      //   that.showData2=res.data.data
      //   console.log(res.data)
      //   console.log(res.data.data)
        that.dialogTableVisible2=true;
        that.loading=false
      // })
    },
    showClassification(){
      this.loading=true
      console.log('showClassification!');
      const that=this
       //axios.post('/backend/algorithm/train_model').then(res=> {
       //  that.showData3=res.data.data
       //  console.log(res.data)
      that.dialogTableVisible=true;
       that.loading=false
      // })
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
</style>
