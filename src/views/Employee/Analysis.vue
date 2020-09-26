<!--数据分析-->
<template>
  <div>
    <div class="togglePage">
      <el-dialog title="个人画像" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <!--<span>类别维度:{{this.imageData.categoryDimension}}</span>-->
        <el-tag >用户网名：{{this.Nick1}}</el-tag>
        <div  ref="WordCloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>

        <span slot="footer" class="dialog-footer">
           <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
           <el-button type="primary" @click="dialogVisible = false">返回</el-button>
           </span>
      </el-dialog>
    </div>
    <div class="hello">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="hover">
            <div ref="topTen" style="width: 450px;height:300px;"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div ref="numTop" style="width: 440px;height:300px;"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="CatePortrait" style="width: 200px;height:200px;"></div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="TimePortrait" style="width: 200px;height:200px;"></div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="SalesPortrait" style="width: 200px;height:200px;"></div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="ValPortrait" style="width: 200px;height:200px;"></div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="RegPortrait" style="width: 200px;height:200px;"></div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div ref="CyclePortrait" style="width: 250px;height:200px;"></div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div ref="PlatPortrait" style="width: 500px;height:300px;"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div ref="PromotionPortrait" style="width: 500px;height:300px;"></div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-col :span="16">
            <div id="myChartChina" :style="{width: '100%', height: '500px', background: 'white'}"></div>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <div id="data" style="width: 500px; height: 460px;">
                <h3>省级分布</h3>

                <a-form-item
                    label="日期"
                    :labelCol="{span:2}"
                    :wrapperCol="{span: 10}"
                >
                  <a-range-picker @change="dateOnChange" size="small">
                    <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                  </a-range-picker>
                </a-form-item>
                <el-table
                    :data="pageFive"
                    style="width: 80% ;height:80%"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)">
                  <el-table-column
                      prop="name"
                      label="省份"
                      width="90">
                  </el-table-column>
                  <el-table-column
                      prop="value"
                      label="用户数"
                      width="100">
                  </el-table-column>
                  <el-table-column
                      prop="math"
                      label="占比"
                      width="100">
                  </el-table-column>
                </el-table>
                <div class="footer">
                  <el-pagination
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :total="total">
                  </el-pagination></div>
                <!--              pager-count="3"  page-size="5"-->
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import '../../../node_modules/echarts/map/js/china.js';
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  name: "Analysis",
  data() {
    return {
      topData: [],
      buyerNick1: [],
      buyerNick2: [],
      // 控制用户画像弹窗
      Nick1: '',
      dialogVisible: false,
      flag: 0,
      sumTotalPurchaseNum: [],
      sumTotalPurchaseAmount: [],
      terminalCus: [],
      distributionCus: [],
      oldCustomer: [],
      newCustomer: [],
      lowSales: [],
      highSales: [],
      highVal: [],
      lowVal: [],
      highRepurchase: [],
      lowRepurchase: [],
      stableCus: [],
      potentialCus: [],
      lossCus: [],
      tianMaoCus: [],
      jingDongCus: [],
      offlineCus: [],
      otherCus: [],
      highSensitivity: [],
      lowSensitivity: [],
      mulPlatformsCus: [],
      //词云
      worddata: [
        // {
        //   buyerNick: "126329327",
        //   sumTotalPurchaseNum: 14978.0000,
        //   categoryDimension: "",
        //   timeDimension: null,
        //   salesDimension: null,
        //   valueDimension: null,
        //   regionalDimension: "云南省",
        //   platformDimension: null,
        //   repurchaseDimension: "低复购",
        //   reputationDimension: "高信誉",
        //   promotionDimension: null,
        //   cycleDimension: null,
        //   prop1: "年轻",
        //   prop2: "少年",
        //   prop3: null,
        //   prop4: null,
        //   prop5: null,
        //   value: 2500
        // },

          {
            name: "14978.0000",
            value: 3008
          },{
            name: "云南省",
            value: 5386
          },
          {
            name: "低复购",
            value: 4500
          },
          {
            name: "高信誉",
            value: 3900
          },
          {
            name: "年轻",
            value: 2500
          },
          {
            name: "少年",
            value:2000
          },
          {
            name: "创新",
            value: 3800
          },
          {
            name: "民主革命",
            value: 2850
          },
          {
            name: "文化强国",
            value: 1380
          },
      ],
      //每行数据
      imageData: [],
      // 地图数据
      mapData: [
        {
          name: '天津',
          value: 0
        },
        {
          name: '江苏',
          value: 0
        },
        {
          name: '北京',
          value: 0
        },
        {
          name: '上海',
          value: 0
        },
        {
          name: '重庆',
          value: 0
        },
        {
          name: '河北',
          value: 0
        },
        {
          name: '河南',
          value: 0
        },
        {
          name: '云南',
          value: 0
        },
        {
          name: '辽宁',
          value: 0
        },
        {
          name: '黑龙江',
          value: 0
        },
        {
          name: '湖南',
          value: 0
        },
        {
          name: '安徽',
          value: 0
        },
        {
          name: '山东',
          value: 0
        },
        {
          name: '新疆',
          value: 0
        },
        {
          name: '江苏',
          value: 0
        },
        {
          name: '浙江',
          value: 0
        },
        {
          name: '江西',
          value: 0
        },
        {
          name: '湖北',
          value: 0
        },
        {
          name: '广西',
          value: 0
        },
        {
          name: '甘肃',
          value: 0
        },
        {
          name: '山西',
          value: 0
        },
        {
          name: '内蒙古',
          value: 0
        },
        {
          name: '陕西',
          value: 0
        },
        {
          name: '吉林',
          value: 0
        },
        {
          name: '福建',
          value: 0
        },
        {
          name: '贵州',
          value: 0
        },
        {
          name: '广东',
          value: 0
        },
        {
          name: '青海',
          value: 0
        },
        {
          name: '西藏',
          value: 0
        },
        {
          name: '四川',
          value: 0
        },
        {
          name: '宁夏',
          value: 0
        },
        {
          name: '海南',
          value: 0
        },
        {
          name: '台湾',
          value: 0
        },
        {
          name: '香港',
          value: 0
        },
        {
          name: '澳门',
          value: 0
        }
      ],
      resData: [],
      pageFive: [],
      // 地图右侧表单日期
      Form: {
        orderDateStart: '',
        orderDateEnd: '',
      },
      loading: true,
      //分页
      total: 0,
      totalPeople: 0,
      // token: window.sessionStorage.getItem('token'),
      tokenStr: '',
    }
  },
  created() {
    const that = this
    that.tokenStr = window.sessionStorage.getItem('token')

  },
  mounted() {
    this.getEchart()
    // 点击弹窗控制词云
    this.initChart()
    this.getNumTop()
    this.getCateProtrait()
    this.getTimePortrait()
    this.getSalesPortrait()
    this.getValPortrait()
    this.getRegPortrait()
    this.getCyclePortrait()
    this.getPlatPortrait()
    this.getPromotionPortrait()
    this.getDistribute()
  },
  methods: {
    _objToStrMap(parse) {
      let strMap = new Map();
      for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
      }
      return strMap;
    },
    _jsonToMap(jsonStr) {
      return this._objToStrMap(JSON.parse(jsonStr));
    },
    getEchart() {
      const topTen = this.$refs.topTen
      //console.log('购买次数top10')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(topTen)
      const that = this
      let sumTotalPurchaseNum = that.sumTotalPurchaseNum
      let buyerNick1 = that.buyerNick1
      axios.get('backend/data/getTPNTopTen', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            // that.token
            //console.log('购买次数top10res数据' + res.data)
            for (let i = 9; i >= 0; i--) {
              //这里我展示的是后台返回的每条数据里面的bookname和num
              buyerNick1.push(res.data.data[i].buyerNick);
              sumTotalPurchaseNum.push(res.data.data[i].sumTotalPurchaseNum);
            }
            // console.log('top10数据' + sumTotalPurchaseNum)
            // console.log('网名' + buyerNick1)
            const option1 = {
              title: {
                text: '客户购买总次数top10',
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
              },
              legend: {
                data: ['次数']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],

              },
              yAxis: {
                name: '客户网名',
                type: 'category',
                // triggerEvent:true,
                data: that.buyerNick1
              },
              series: [
                {
                  name: '次数',
                  type: 'bar',
                  data: sumTotalPurchaseNum,
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        var colorList = ['#934c26', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                        return colorList[params.dataIndex]
                      }
                    }

                  }
                },
                // {
                //   name: '2019年',
                //   type: 'bar',
                //   data: [31000, 23438, 19325, 121594, 134141, 681807]
                // }
              ]
            }
            // myChart1.on('click',function(params){
            //   console.log(params);
            // });
            myChart1.on('click', data => {
              console.log("hhhhhhh")
              console.log(data)
              const that = this
              that.Nick1 = data.name//网名赋值
              that.dialogVisible = true
              this.$nextTick(() => {
                this.initChart()
              })
              let j = 0
              for (let i in res.data) {
                console.log(res.data)
                if (i !== 'buyerNick') {
                  that.worddata[j].name = res.data.data[i]
                  // that.worddata[j].value = res.data.data[i].value
                  j++
                }
              }
            });
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
      // console.log(sumTotalPurchaseNum)
    },

    getNumTop() {
      const numTop = this.$refs.numTop
      // console.log('购买金额top10')
      // const myChart1 = echarts.init(document.getElementById('main'));
      // const myChart2 = echarts.init(document.getElementById('numTop'));
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(numTop)
      const that = this//
      let sumTotalPurchaseAmount = that.sumTotalPurchaseAmount
      let buyerNick2 = that.buyerNick2
      axios.get('backend/data/getTPATopTen', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('金额top10res数据' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            // console.log('for前金额：' + sumTotalPurchaseAmount)
            for (let i = 9; i >= 0; i--) {
              //这里我展示的是后台返回的每条数据里面的bookname和num
              buyerNick2.push(res.data.data[i].buyerNick);
              sumTotalPurchaseAmount.push(res.data.data[i].sumTotalPurchaseAmount);
            }
            // console.log('for后金额' + sumTotalPurchaseAmount)
            // console.log('网名' + buyerNick2)
            // console.log('---------------')
            const option1 = {
              title: {
                text: '客户购买金额top10',
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['金额']
              },
              grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.001],
                axisLabel : {

                  // formatter: '{value} 万'
                  formatter : function(val){
                    return val/10000+"万";
                  }

                }

              },
              yAxis: {
                name: '客户网名',
                type: 'category',
                // data: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J',],
                data: that.buyerNick2,
              },
              series: [
                {
                  name: '金额',
                  type: 'bar',
                  data: sumTotalPurchaseAmount,
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            // // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
      // console.log(sumTotalPurchaseNum)
    },
    getCateProtrait() {
      const CatePortrait = this.$refs.CatePortrait
      // console.log('分类维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(CatePortrait)
      const that = this
      let terminalCus = that.terminalCus
      let distributionCus = that.distributionCus
      axios.get('backend/data/CusCatePortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('分类维度res数据' + res.data)
            terminalCus[0] = res.data.data[0].terminalCus
            distributionCus[0] = res.data.data[0].distributionCus
            // console.log('终端客户' + terminalCus[0])
            // console.log('分销客户' + distributionCus[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '分类维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["终端用户", "分销用户"]
              },
              yAxis: {
                //nameRotate:0.1,//使用这个属性
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [terminalCus[0], distributionCus[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
                // {
                //   name: '2019年',
                //   type: 'bar',
                //   data:distributionCus
                // },
                // {
                //   name: '2019年',
                //   type: 'bar',
                //   data: [31000, 23438, 19325, 121594, 134141, 681807]
                // }
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
      // console.log(sumTotalPurchaseNum)
    },
    getTimePortrait() {
      const TimePortrait = this.$refs.TimePortrait
      // console.log('时间维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(TimePortrait)
      const that = this
      let oldCustomer = that.oldCustomer
      let newCustomer = that.newCustomer
      axios.get('backend/data/CusTimePortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('时间维度res数据' + res.data)
            oldCustomer[0] = res.data.data[0].oldCustomer
            newCustomer[0] = res.data.data[0].newCustomer
            // console.log('老用户数据' + oldCustomer[0])
            // console.log('新用户数据' + newCustomer[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '时间维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '20%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["老用户", "新用户"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [oldCustomer[0], newCustomer[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
      // console.log(sumTotalPurchaseNum)

    },
    getSalesPortrait() {
      const SalesPortrait = this.$refs.SalesPortrait
      // console.log('销量维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(SalesPortrait)
      const that = this
      let lowSales = that.lowSales
      let highSales = that.highSales
      axios.get('backend/data/CusSalesPortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('销量维度res数据' + res.data)
            lowSales[0] = res.data.data[0].lowSales
            highSales[0] = res.data.data[0].highSales
            // console.log('低销量：' + lowSales[0])
            // console.log('高销量' + highSales[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '销量维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["低销量", "高销量"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [lowSales[0], highSales[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
    },
    getValPortrait() {
      const ValPortrait = this.$refs.ValPortrait
      // console.log('价值维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(ValPortrait)
      const that = this
      let lowVal = that.lowVal
      let highVal = that.highVal
      axios.get('backend/data/CusValPortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('价值res数据：' + res.data.data[0].lowVal)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            lowVal[0] = res.data.data[0].lowVal
            highVal[0] = res.data.data[0].highVal
            // console.log('低价值：' + lowVal[0])
            // console.log('高价值' + highVal[0])
            const option1 = {
              title: {
                text: '价值维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["低价值", "高价值"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [lowVal[0], highVal[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
      // console.log(sumTotalPurchaseNum)

    },
    getRegPortrait() {
      const RegPortrait = this.$refs.RegPortrait
      // console.log('复购维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(RegPortrait)
      const that = this
      let highRepurchase = that.highRepurchase
      let lowRepurchase = that.lowRepurchase
      axios.get('backend/data/CusRepurchasePortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('复购res数据：' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            highRepurchase[0] = res.data.data[0].highRepurchase
            lowRepurchase[0] = res.data.data[0].lowRepurchase
            // console.log('高复购：' + highRepurchase[0])
            // console.log('低复购' + lowRepurchase[0])
            const option1 = {
              title: {
                text: '复购维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["高复购", "低复购"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [highRepurchase[0], lowRepurchase[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
    },
    getCyclePortrait() {
      const CyclePortrait = this.$refs.CyclePortrait
      // console.log('周期维度')
      // // 指定图表的配置项和数据
      const myChart1 = this.$echarts.init(CyclePortrait)
      const that = this
      let stableCus = that.stableCus
      let potentialCus = that.potentialCus
      let lossCus = that.lossCus
      axios.get('backend/data/CusCyclePortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('周期res数据：' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            stableCus[0] = res.data.data[0].stableCus
            potentialCus[0] = res.data.data[0].potentialCus
            lossCus[0] = res.data.data[0].lossCus
            // console.log('稳定：' + stableCus[0])
            // console.log('流失：' + potentialCus[0])
            // console.log('潜在：' + lossCus[0])
            const option1 = {
              title: {
                text: '周期维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                data: ["稳定客户", "流失客户", "潜在客户"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [stableCus[0], potentialCus[0], lossCus[0]],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#45789a', '#45789a', '#45789a'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                },
              ]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
    },
    getPlatPortrait() {
      const PlatPortrait = this.$refs.PlatPortrait
      // console.log('平台维度')
      const myChart1 = this.$echarts.init(PlatPortrait)
      const that = this
      let tianMaoCus = that.tianMaoCus//天猫
      let jingDongCus = that.jingDongCus//京东
      let offlineCus = that.offlineCus//线下
      let otherCus = that.otherCus//其他平台
      let mulPlatformsCus = that.mulPlatformsCus//其他平台
      axios.get('backend/data/CusPlatPortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('平台res数据：' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            tianMaoCus[0] = res.data.data[0].tianMaoCus
            jingDongCus[0] = res.data.data[0].jingDongCus
            offlineCus[0] = res.data.data[0].offlineCus
            otherCus[0] = res.data.data[0].otherCus
            mulPlatformsCus[0] = res.data.data[0].mulPlatformsCus
            // console.log('天猫：' + tianMaoCus[0])
            // console.log('京东：' + jingDongCus[0])
            // console.log('线下：' + offlineCus[0])
            // console.log('其他：' + otherCus[0])
            // console.log('多平台：' + mulPlatformsCus[0])
            const option1 = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
                /*内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
            value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示 */
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['天猫', '京东', '线下', '其他', '跨平台']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    {value: tianMaoCus[0], name: '天猫'},
                    {value: jingDongCus[0] + 100, name: '京东'},
                    {value: offlineCus[0] + 200, name: '线下'},
                    {value: otherCus[0] + 300, name: '其他'},
                    {value: mulPlatformsCus[0] + 400, name: '多平台'}
                  ]
                }
              ]
            };
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
    },
    getPromotionPortrait() {
      const PromotionPortrait = this.$refs.PromotionPortrait
      // console.log('促销维度')
      const myChart1 = this.$echarts.init(PromotionPortrait)
      const that = this
      let highSensitivity = that.highSensitivity//促销敏感度高
      let lowSensitivity = that.lowSensitivity//促销敏感度低
      axios.get('backend/data/CusPromotionPortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.token
            // console.log('促销res数据：' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            highSensitivity[0] = res.data.data[0].highSensitivity
            lowSensitivity[0] = res.data.data[0].lowSensitivity
            // console.log('敏感度高：' + highSensitivity[0])
            // console.log('敏感度低：' + lowSensitivity[0])
            const option1 = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
                /*内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
            value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示 */
              },
              grid: {
                left: '6%',
                right: '3%',
                bottom: '3%',
                containLabel: true
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['促销敏感度高', '促销敏感度低']
              },

              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    {value: highSensitivity[0], name: '促销敏感度高'},
                    {value: lowSensitivity[0], name: '促销敏感度低'},
                  ],
                  itemStyle: {
                    normal: {
                      //这里是重点
                      color: function (params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        const colorList = ['#3a6c6a', '#a39953'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              ]
            };
            myChart1.setOption(option1);
            window.addEventListener("resize", function () {
              myChart1.resize();
              //myCharts是你的初始化echarts图表时取的名字
            })
          }).catch()
    },
    getDistribute() {
      // 基于准备好的dom，初始化echarts实例
      const mapName = "china";
      const myChartContainer = document.getElementById('myChartChina');
      const resizeMyChartContainer = function () {
        myChartContainer.style.width = (document.body.offsetWidth / 2) + 'px'//页面一半的大小
      }
      resizeMyChartContainer();
      const myChartChina = this.$echarts.init(myChartContainer);
      const mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      const that = this
      axios.get('backend/data/CusRegPortraitAnalysis', {
        headers: {
          token: this.tokenStr
        }
      }).then(
          res => {
            that.total = res.data.data.length
            let mapname = ''
            let mapvalue = ''
            //地区总人数
            for (let i = 0; i < res.data.data.length; i++) {
              that.totalPeople = parseInt(that.totalPeople) + parseInt(res.data.data[i].value)
              // console.log("总人数"+that.totalPeople)
            }
            for (let i = 0; i < res.data.data.length; i++) {
              if ((res.data.data[i].name + "").search("省") != -1) {
                mapname = (res.data.data[i].name + "").replace(/省/, "")
                mapvalue = res.data.data[i].value
                let obj = {
                  name: mapname,
                  value: mapvalue,
                  math: ((parseInt(res.data.data[i].value) * 100 / that.totalPeople).toFixed(2)) + '%'
                }
                that.resData.push(obj)
              } else {
                let obj = {
                  name: res.data.data[i].name,
                  value: res.data.data[i].value,
                  math: ((parseInt(res.data.data[i].value) * 100 / that.totalPeople).toFixed(2)) + '%'
                }
                that.resData.push(obj)
              }
            }
            // console.log(that.resData)
            that.pageFive = that.resData.slice(0, 5)
            that.loading = false
            // 将mapData转换为map
            // that.ans = that._jsonToMap(JSON.stringify(that.mapData))
            for (let i = 0; i < that.resData.length; i++) {
              for (let j = 0; j < that.mapData.length; j++) {
                if (that.mapData[j].name === that.resData[i].name) {
                  // console.log(j)
                  that.mapData[j].value = res.data.data[i].value
                  // console.log(that.mapData[j].name, that.mapData[j].value)
                  // console.log(that.mapData[j].value)
                }
              }
            }
            // 分布百分比计算
            // for(let i=0;i < that.resData.length; i++) {
            //   that.percent[i]=parseInt(that.resData[i].value)*100/that.totalPeople
            //   that.percent[i]=(that.percent[i].toFixed(2));
            //   console.log(that.percent[i])
            // }
            function randomData() {
              return Math.round(Math.random() * 500);
            }

            // 绘制图表
            const optionMap = {
              tooltip: {},
              legend: {
                orient: 'horizontal',
                left: 'left',
                data: ['']
              },
              visualMap: {
                min: 0,
                max: 1500,
                left: '10%',
                top: 'bottom',
                text: ['高', '低'],
                calculable: true,
                color: ['#0b50b9', '#c3e2f4'],
                show: false
              },
              selectedMode: 'single',
              series: [
                {
                  name: '',
                  type: 'map',
                  mapType: 'china',
                  itemStyle: {
                    normal: {
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis: {
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  // 是否显示红点标记
                  showLegendSymbol: false,
                  label: {
                    normal: {
                      show: true
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  data: that.mapData
                }
              ]
            }
            myChartChina.setOption(optionMap);
            window.onresize = function () {
              resizeMyChartContainer();
              myChartChina.resize();
            }
          })
    },
    dateOnChange(date, dateString) {//date 绑定值，dateString日期数组
      this.Form.orderPayDateStart = dateString[0]//开始日期
      this.Form.orderPayDateEnd = dateString[1]//结束日期
    },
    // 分页
    handleCurrentChange(currentPage) {
      // console.log("当前页码")
      // console.log(currentPage)
      const that = this
      if (currentPage === 2) {
        that.pageFive = that.resData.slice(5, 10)
      }
      if (currentPage === 3) {
        that.pageFive = that.resData.slice(10, 15)
      }
      if (currentPage === 4) {
        that.pageFive = that.resData.slice(15, 20)
      }
      if (currentPage === 5) {
        that.pageFive = that.resData.slice(20, 25)
      }
      if (currentPage === 6) {
        that.pageFive = that.resData.slice(25, 30)
      }
      if (currentPage === 7) {
        that.pageFive = that.resData.slice(30, 32)
      }
      // that.pageFive=that.resData.slice(start,end)

    },
    // 词云图
    initChart() {
      const WordCloud = this.$refs.WordCloud
      console.log('lll');
      if (WordCloud) {
        const myChart = this.$echarts.init(WordCloud)
        console.log('5555');
        const option = {
          backgroundColor: "#fff",
          series: [
            {
              type: "wordCloud",
              gridSize: 4,
              sizeRange: [10, 25],
              rotationRange: [0, 0],
              textStyle: {
                normal: {
                  color: function () {
                    return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                    );
                  }
                }
              },
              right: null,
              bottom: null,
              width: "100%",
              height: "100%",
              //数据
              data: this.worddata
            }
          ]

        }
        myChart.setOption(option)
        window.addEventListener("resize", function () {
          myChart.resize()
        })
      }
      // }
      console.log('6666');
      // chart.setOption(option);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },

  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content{
  border-radius: 4px;
  min-height: 36px;
}

.tooltip {//0912map
  color: rgba(50, 50, 50, 1);
  padding: 6px 9px 11px 9px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
}
.footer{
  position: absolute;
  bottom: 30px;/* 底部距离bai为0 */
  right:40px;
  background-color: #f6f5f5;

}
</style>
