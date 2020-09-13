<!--数据分析-->
<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div ref="topTen" style="width: 500px;height:300px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div ref="numTop" style="width: 500px;height:300px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="CatePortrait" style="width: 300px;height:200px;"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="TimePortrait" style="width: 300px;height:200px;"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="SalesPortrait" style="width: 300px;height:200px;"></div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="ValPortrait" style="width: 300px;height:200px;"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="RegPortrait" style="width: 300px;height:200px;"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div ref="CyclePortrait" style="width: 300px;height:200px;"></div>
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
            <div id="platform" style="width: 500px;height:300px;">维度</div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div id="chartId" style="width: 500px;height:300px;">map</div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div id="data" style="width: 500px;height:300px;">data</div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china.js';
import geoData from "../../..//datas.json";
//import "echarts-wordcloud/dist/echarts-wordcloud";
//import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  // name: "VueWordCloud",
  data() {
    return {//0912return加入
      // windowSize: [0, 0],
      // chartId: `map-${this.$root.UUID()}`,		//用UUID生成图表id，防止id重复
      // chart: {map: null, chartData: [],}
      topData: [],
      buyerNick: [],
      sumTotalPurchaseNum: [],
      sumTotalPurchaseAmount: [],
      terminalCus: [],
      distributionCus: [],
      oldCustomer: [],
      newCustomer: [],
      lowSales: [],
      highSales: [],
      highVal:[],
      lowVal:[],
      highRepurchase:[],
      lowRepurchase:[],
      stableCus:[],
      potentialCus:[],
      lossCus:[],
      tianMaoCus:[],
      jingDongCus:[],
      offlineCus:[],
      otherCus:[],
      mulPlatformsCus:[]
    }
  },
  mounted() {
    this.getEchart()
    this.getNumTop()
    this.getCateProtrait()
    this.getTimePortrait()
    this.getSalesPortrait()
    this.getValPortrait()
    this.getRegPortrait()
    this.getCyclePortrait()
    this.getPlatPortrait()
    // this.getLeft()
    // this.getAlignTarget()

  },
  methods: {
    getEchart() {
      const topTen = this.$refs.topTen
      console.log('购买次数top10')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(topTen)
      const that = this
      let sumTotalPurchaseNum = that.sumTotalPurchaseNum
      let buyerNick = that.buyerNick
        axios.get('http://192.168.1.102:8080/backend/data/getTPNTopTen').then(
            res=>{
              console.log('购买次数top10res数据' + res.data)
              // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
              // console.log(sumTotalPurchaseNum)
              for(let i = 0; i < res.data.data.length; i++) {
                //这里我展示的是后台返回的每条数据里面的bookname和num
                // buyerNick.push(data[i].buyerNick);
                // sumTotalPurchaseNum.push(data[i].sumTotalPurchaseNum);
                sumTotalPurchaseNum[i] = res.data.data[i].sumTotalPurchaseNum
                buyerNick[i] = res.data.data[i].buyerNick

              }
              console.log('top10数据'+ sumTotalPurchaseNum)
              console.log('网名'+buyerNick)
              // console.log('---------------')
              const option1 = {
                //color: ['#c23531','#1e6290', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                title: {
                  text: '客户购买总次数top10',
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  data: ['2020年']
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
                  type: 'category',
                  // data: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J',],
                  data: that.buyerNick,
                },
                series: [
                  {
                    name: '2020年',
                    type: 'bar',
                    data:sumTotalPurchaseNum,
                    itemStyle: {
                      normal: {
                        //这里是重点
                        color: function(params) {
                          //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                          var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
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
              myChart1.setOption(option1);
              window.addEventListener("resize", function () {
                myChart1.resize();
                //myCharts是你的初始化echarts图表时取的名字
              })
            }).catch()
      // console.log(sumTotalPurchaseNum)
    },
    getNumTop(){
      const numTop = this.$refs.numTop
      console.log('购买金额top10')
      // const myChart1 = echarts.init(document.getElementById('main'));
      // const myChart2 = echarts.init(document.getElementById('numTop'));
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(numTop)
      const that = this//
      let sumTotalPurchaseAmount = that.sumTotalPurchaseAmount
      let buyerNick = that.buyerNick
      axios.get('http://192.168.1.102:8080/backend/data/getTPATopTen').then(
          res=>{
            console.log('金额top10res数据'+res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            console.log('for前金额：'+sumTotalPurchaseAmount)
            for(let i = 0; i < res.data.data.length; i++) {
              //这里我展示的是后台返回的每条数据里面的bookname和num
              // buyerNick.push(data[i].buyerNick);
              // sumTotalPurchaseNum.push(data[i].sumTotalPurchaseNum);
              sumTotalPurchaseAmount[i] = res.data.data[i].sumTotalPurchaseAmount
              buyerNick[i] = res.data.data[i].buyerNick

            }
            console.log('for后金额'+sumTotalPurchaseAmount)
            console.log('网名'+buyerNick)
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
                data: ['2020年']
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
                type: 'category',
                // data: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J',],
                data: that.buyerNick,
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data:sumTotalPurchaseAmount,
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
    getCateProtrait(){
      const CatePortrait = this.$refs.CatePortrait
      console.log('分类维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(CatePortrait)
      const that = this
      let terminalCus = that.terminalCus
      let distributionCus = that.distributionCus
      axios.get('http://192.168.1.102:8080/backend/data/CusCatePortraitAnalysis').then(
          res=>{
            console.log('分类维度res数据'+res.data)
            terminalCus[0] = res.data.data[0].terminalCus
            distributionCus[0] = res.data.data[0].distributionCus
            console.log('终端客户'+terminalCus[0])
            console.log('分销客户'+distributionCus[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '分类维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              xAxis: {
                data: ["终端用户", "分销用户"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data: [ terminalCus[0],distributionCus[0]+100 ]
                },
                // {
                //   name: '2020年',
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
    getTimePortrait(){
      const TimePortrait = this.$refs.TimePortrait
      console.log('时间维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(TimePortrait)
      const that = this
      let oldCustomer = that.oldCustomer
      let newCustomer = that.newCustomer
      axios.get('http://192.168.1.102:8080/backend/data/CusTimePortraitAnalysis').then(
          res=>{
            console.log('时间维度res数据'+res.data)
            oldCustomer[0] = res.data.data[0].oldCustomer
            newCustomer[0] = res.data.data[0].newCustomer
            console.log('老用户数据'+ oldCustomer[0])
            console.log('新用户数据'+ newCustomer[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '时间维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
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
                  data: [oldCustomer[0],newCustomer[0]+1]
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
    getSalesPortrait(){
      const SalesPortrait = this.$refs.SalesPortrait
      console.log('销量维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(SalesPortrait)
      const that = this
      let lowSales = that.lowSales
      let highSales = that.highSales
      axios.get('http://192.168.1.102:8080/backend/data/CusSalesPortraitAnalysis').then(
          res=>{
            console.log('销量维度res数据'+res.data)
            lowSales[0] = res.data.data[0].lowSales
            highSales[0] = res.data.data[0].highSales
            console.log('低销量：'+ lowSales[0])
            console.log('高销量'+ highSales[0])
            // console.log('---------------')
            const option1 = {
              title: {
                text: '销量维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
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
                  data: [ lowSales[0],highSales[0]+10 ]
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
    getValPortrait(){
      const ValPortrait = this.$refs.ValPortrait
      console.log('价值维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(ValPortrait)
      const that = this
      let lowVal = that.lowVal
      let highVal = that.highVal
      axios.get('http://192.168.1.102:8080/backend/data/CusValPortraitAnalysis').then(
          res=>{
            console.log('价值res数据：'+res.data.data[0].lowVal)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            lowVal[0] = res.data.data[0].lowVal
            highVal[0] = res.data.data[0].highVal
            console.log('低价值：'+ lowVal[0])
            console.log('高价值'+ highVal[0])
            const option1 = {
              title: {
                text: '价值维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
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
                  data:[lowVal[0],highVal[0]+1]
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
    getRegPortrait(){
      const RegPortrait = this.$refs.RegPortrait
      console.log('复购维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(RegPortrait)
      const that = this
      let highRepurchase = that.highRepurchase
      let lowRepurchase = that.lowRepurchase
      axios.get('http://192.168.1.102:8080/backend/data/CusRepurchasePortraitAnalysis').then(
          res=>{
            console.log('复购res数据：'+res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            highRepurchase[0] = res.data.data[0].highRepurchase
            lowRepurchase[0] = res.data.data[0].lowRepurchase
            console.log('高复购：'+ highRepurchase[0])
            console.log('低复购'+ lowRepurchase[0])
            const option1 = {
              title: {
                text: '复购维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
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
                  data:[ highRepurchase[0] ,lowRepurchase[0] ]
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
    getCyclePortrait(){
      const CyclePortrait = this.$refs.CyclePortrait
      console.log('周期维度')
      // // 指定图表的配置项和数据
      const myChart1= this.$echarts.init(CyclePortrait)
      const that = this
      let stableCus = that.stableCus
      let potentialCus = that.potentialCus
      let lossCus = that.lossCus
      axios.get('http://192.168.1.102:8080/backend/data/CusCyclePortraitAnalysis').then(
          res=>{
            console.log('周期res数据：'+res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            stableCus[0] = res.data.data[0].stableCus
            potentialCus[0] = res.data.data[0].potentialCus
            lossCus[0] = res.data.data[0].lossCus
            console.log('稳定：'+ stableCus[0])
            console.log('流失：'+ potentialCus[0])
            console.log('潜在：'+ lossCus[0])
            const option1 = {
              title: {
                text: '周期维度',
              },
              tooltip: {},

              legend: {
                data: ['人数']
              },
              xAxis: {
                data: ["稳定客户", "流失客户","潜在客户"]
              },
              yAxis: {
                // data : that.terminalCus,
                // data : that.distributionCus
              },
              series: [
                {
                  name: '2020年',
                  type: 'bar',
                  data:[ stableCus[0] ,potentialCus[0] ,lossCus[0] ]
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
      console.log('平台维度')
      const myChart1 = this.$echarts.init(PlatPortrait)
      const that = this
      let tianMaoCus = that.tianMaoCus//天猫
      let jingDongCus = that.jingDongCus//京东
      let offlineCus = that.offlineCus//线下
      let otherCus = that.otherCus//其他平台
      let mulPlatformsCus = that.mulPlatformsCus//其他平台
      axios.get('http://192.168.1.102:8080/backend/data/CusPlatPortraitAnalysis').then(
          res => {
            console.log('平台res数据：' + res.data)
            // sumTotalPurchaseNum = res.data.data[0].sumTotalPurchaseNum
            // console.log(sumTotalPurchaseNum)
            tianMaoCus[0] = res.data.data[0].tianMaoCus
            jingDongCus[0] = res.data.data[0].jingDongCus
            offlineCus[0] = res.data.data[0].offlineCus
            otherCus[0] = res.data.data[0].otherCus
            mulPlatformsCus[0] = res.data.data[0].mulPlatformsCus
            console.log('天猫：' + tianMaoCus[0])
            console.log('京东：' + jingDongCus[0])
            console.log('线下：' + offlineCus[0])
            console.log('其他：' + otherCus[0])
            console.log('多平台：' + mulPlatformsCus[0])
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
                    {value: jingDongCus[0]+100, name: '京东'},
                    {value: offlineCus[0]+200, name: '线下'},
                    {value: otherCus[0]+300, name: '其他'},
                    {value: mulPlatformsCus[0]+400, name: '多平台'}
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
    //   myChart1.setOption(option1);
    //   setTimeout(function () {
    //
    //     const option2 = {
    //       legend: {},
    //       tooltip: {
    //         trigger: 'axis',
    //         showContent: false
    //       },
    //       dataset: {
    //         source: [
    //           ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
    //           ['天猫', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
    //           ['淘宝', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
    //           ['有赞', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
    //           ['京东', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    //         ]
    //       },
    //       xAxis: {type: 'category'},
    //       yAxis: {gridIndex: 0},
    //       grid: {top: '60%'},
    //       series: [
    //         {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    //         {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    //         {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    //         {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    //         {
    //           type: 'pie',
    //           id: 'pie',
    //           radius: '40%',
    //           center: ['40%', '30%'],
    //           label: {
    //             formatter: '{b}: {@2012} ({d}%)'
    //           },
    //           encode: {
    //             itemName: 'product',
    //             value: '2012',
    //             tooltip: '2012'
    //           }
    //         }
    //       ]
    //     };
    //     myChart2.on('updateAxisPointer', function (event) {
    //       var xAxisInfo = event.axesInfo[0];
    //       if (xAxisInfo) {
    //         var dimension = xAxisInfo.value + 1;
    //         myChart2.setOption({
    //           series: {
    //             id: 'pie',
    //             label: {
    //               formatter: '{b}: {@[' + dimension + ']} ({d}%)'
    //             },
    //             encode: {
    //               value: dimension,
    //               tooltip: dimension
    //             }
    //           }
    //         });
    //       }
    //     });
    //
    //     myChart2.setOption(option2);
    //   })
    // },
    // initChart() {
    //   let _this = this
    //   _this.windowSize = [document.body.clientWidth, document.body.clientHeight];
    //   window.addEventListener('resize', () => { _this.windowSize = [document.body.clientWidth, document.body.clientHeight]; });
    //   _this.chart.map = _this.$echarts.init(document.getElementById(_this.chartId))
    // },
    // drawChart() {
    //   let _this = this;
    //   let mapName = 'china'
    //   let geoCoordMap = {};
    //   let tempData = [			//模拟数据
    //     {city:'北京',value:'55'},
    //     {city:'天津',value:'20'},
    //     {city:'西藏',value:'100'},
    //     {city:'辽宁',value:'58'},
    //   ]
    //
    //   _this.chart.map.showLoading();		//loading样式
    //
    //   let mapFeatures = _this.$echarts.getMap(mapName).geoJson.features;	//获取全国地区的经纬度（只包含了一级城市、省份经纬度）
    //   _this.chart.map.hideLoading();			//隐藏loading样式
    //   mapFeatures.forEach(function (v) { //获取一级城市、省份经纬度
    //     let name = v.properties.name; // 地区名称
    //     geoCoordMap[name] = v.properties.cp; // 地区经纬度
    //   });
    //
    //   let convertData = function (tempData) { 				//通过该方法获取自己数据中各地区的经纬度
    //     let tempRes = [];
    //     for (let i = 0; i < tempData.length; i++) {
    //       let geoCoord = geoCoordMap[tempData[i].name] || [];
    //       if (geoCoord) {
    //         tempRes.push({
    //           name: tempData[i].name,
    //           value: geoCoord.concat(tempData[i].value) || [],
    //         });
    //       }
    //     }
    //     for (let i = 0; i < tempRes.length; i++) {
    //       let tempGeoCoord = geoData.rows.filter(t => { return t.name.includes(tempRes[i].name) })
    //       if (tempGeoCoord && tempRes[i].value.length == 1) {
    //         tempRes[i].value.unshift(tempGeoCoord[0].lat)
    //         tempRes[i].value.unshift(tempGeoCoord[0].lng)
    //       }
    //     }
    //     return tempRes;
    //   };
    //   _this.chart.map.setOption({					//开始画图
    //     geo: {
    //       map: 'china',
    //       label: { show: false, }, 				// 是否显示对应地名
    //       roam: true,
    //       itemStyle: {
    //         normal: {
    //           borderWidth: 1, // 地图边框宽度
    //           borderColor: '#fff', // 地图边框颜色
    //           areaColor: '#0FADFF' // 地图颜色
    //         },
    //         emphasis: { areaColor: '#0FADFF', borderWidth: 2 }		//高亮时的样式
    //       },
    //       emphasis: { areaColor: '#0FADFF', borderWidth: 2, label: { show: false } }
    //     },
    //     tooltip: {
    //       triggerOn: 'mousemove',
    //       trigger: 'item',
    //       extraCssText: 'background:transparent;border:none;',
    //       formatter: function (params) {
    //         let count = eval(convertData(tempData).map(a => { return a.value[2] }).join('+'))
    //         let content = `<div class='tooltip'>${params.name}&nbsp;${params.value[2]}户&nbsp;${(params.value[2]/count*100).toFixed(2)}%`;
    //         return (content += `</div>`);
    //       }
    //     },
    //     series: [{
    //       name: '散点',
    //       type: 'scatter',
    //       coordinateSystem: 'geo',
    //       color: "#5ADD8B", 				//点的颜色
    //       data: convertData(tempData),
    //       symbolSize: 10, 				//点的大小
    //       symbol: "circle", 				//点的样式
    //       cursor: "pointer", 			//鼠标放上去的效果
    //       label: {
    //         normal: { show: false }, 		//默认展示
    //         emphasis: { show: false }	 //滑过展示
    //       },
    //       itemStyle: { color: '#5ADD8B', emphasis: { borderColor: '#fff', borderWidth: 1 } }
    //     },
    //       {
    //         type: 'map',
    //         map: 'china',
    //         geoIndex: 0,
    //         silent: true,
    //         hoverable: false,
    //         aspectScale: 0.75,
    //         tooltip: { show: false }
    //       },
    //     ],
    //   });
    //   // 取消框架自带的高亮，只高亮散点
    //   // _this.chart.map.on('mouseover', (v) => {
    //   //   let enlarge = convertData(tempData).map(a => { return a.name })
    //   //   let point = enlarge.findIndex(t => { return t == v.name })
    //   //   if (point < 0) { _this.chart.map.dispatchAction({ type: 'downplay', dataIndex: v.dataIndex }); }
    //   // });
    //
    //   // 鼠标滑动到散点外不显示tip
    //   _this.chart.map.on('mouseover', (v) => {
    //     let enlarge = convertData(tempData).map(a => { return a.name })
    //     let point = enlarge.findIndex(t => { return t == v.name })
    //     if (point < 0) { _this.chart.map.dispatchAction({ type: 'hideTip', dataIndex: v.dataIndex }); }
    //   });
    //   _this.$nextTick(() => { _this.chart.map.resize() })
    // },
  },

    //   getAllNames() {
    //     const myChart1 = echarts.init(document.getElementById('myChartChina'));
    //     const myChart2 = echarts.init(document.getElementById('data'));
    //     指定图表的配置项和数据
    //     const option1 = {
    //       tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b}: {c} ({d}%)'
    //       },
    //       legend: {
    //         orient: 'vertical',
    //         left: 10,
    //         data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //       },
    //       series: [
    //         {
    //           name: '访问来源',
    //           type: 'pie',
    //           radius: ['50%', '70%'],
    //           avoidLabelOverlap: false,
    //           label: {
    //             show: false,
    //             position: 'center'
    //           },
    //           emphasis: {
    //             label: {
    //               show: true,
    //               fontSize: '30',
    //               fontWeight: 'bold'
    //             }
    //           },
    //           labelLine: {
    //             show: false
    //           },
    //           data: [
    //             {value: 335, name: '直接访问'},
    //             {value: 310, name: '邮件营销'},
    //             {value: 234, name: '联盟广告'},
    //             {value: 135, name: '视频广告'},
    //             {value: 1548, name: '搜索引擎'}
    //           ]
    //         }
    //       ]
    //
    //     };
    //
    //     const option2 = {
    //       backgroundColor: '#2c343c',
    //
    //       title: {
    //         text: 'Customized Pie',
    //         left: 'center',
    //         top: 20,
    //         textStyle: {
    //           color: '#ccc'
    //         }
    //       },
    //
    //       tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //       },
    //
    //       visualMap: {
    //         show: false,
    //         min: 80,
    //         max: 600,
    //         inRange: {
    //           colorLightness: [0, 1]
    //         }
    //       },
    //       series: [
    //         {
    //           name: '访问来源',
    //           type: 'pie',
    //           radius: '55%',
    //           center: ['50%', '50%'],
    //           data: [
    //             {value: 335, name: '直接访问'},
    //             {value: 310, name: '邮件营销'},
    //             {value: 274, name: '联盟广告'},
    //             {value: 235, name: '视频广告'},
    //             {value: 400, name: '搜索引擎'}
    //           ].sort(function (a, b) {
    //             return a.value - b.value;
    //           }),
    //           roseType: 'radius',
    //           label: {
    //             color: 'rgba(255, 255, 255, 0.3)'
    //           },
    //           labelLine: {
    //             lineStyle: {
    //               color: 'rgba(255, 255, 255, 0.3)'
    //             },
    //             smooth: 0.2,
    //             length: 10,
    //             length2: 20
    //           },
    //           itemStyle: {
    //             color: '#c23531',
    //             shadowBlur: 200,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           },
    //
    //           animationType: 'scale',
    //           animationEasing: 'elasticOut',
    //           animationDelay: function (idx) {
    //             return Math.random() * 200;
    //           }
    //         }
    //       ]
    //     };
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart1.setOption(option1);
    //     myChart2.setOption(option2);
    //     window.addEventListener("resize", function () {
    //       myChart1.resize();
    //       myChart2.resize();
    //       //myCharts是你的初始化echarts图表时取的名字
    //     });
    //   }


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
.tooltip {//0912map
  color: rgba(50, 50, 50, 1);
  padding: 6px 9px 11px 9px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
}
</style>
