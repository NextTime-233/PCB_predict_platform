<!--数据分析-->
<template>
    <div id ='data-analysis'>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content">
                <div class="data-tab" style="width: 95%;">
                    <a-statistic title="今日订单总量" :value="112893" style="margin-right: 100px" />
                    </br>
                    <a-statistic title="订单流水 (CNY)" :precision="2" :value="112893" />
                </div>
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
                <div style="border: 1px solid grey; padding: 20px 25px; height: 200px">
                    <a-row :gutter="18">
                        <a-col :span="12">
                            <a-card>
                                <a-statistic
                                        title="Feedback"
                                        :value="11.28"
                                        :precision="2"
                                        suffix="%"
                                        :value-style="{ color: '#3f8600' }"
                                        style="margin-right: 50px"
                                >
                                    <template #prefix>
                                        <a-icon type="arrow-up" />
                                    </template>
                                </a-statistic>
                            </a-card>
                        </a-col>
                        <a-col :span="12">
                            <a-card>
                                <a-statistic
                                        title="Idle"
                                        :value="9.3"
                                        :precision="2"
                                        suffix="%"
                                        class="demo-class"
                                        :value-style="{ color: '#cf1322' }"
                                >
                                    <template #prefix>
                                        <a-icon type="arrow-down" />
                                    </template>
                                </a-statistic>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
                <div style="padding: 20px; border: 1px solid darkgray; height: 200px">
                    <h3>线上购物转化率</h3>
                    <div style="font-size: 40px">78%</div>
                    <a-progress :percent="30" />
                </div>

            </div></el-col>
            <el-col :span="6"><div class="grid-content">
                <div style="border: 1px solid grey; height: 200px">
                    <div id="myChart4" :style="{width: '100%', height: '200px', float: 'left'}"></div>
                </div>
            </div></el-col>
        </el-row>
        <a-row type="flex" style="border: 1px solid lightgrey; padding: 5px">
            <a-col :flex="1" >
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 70vh; padding: 5px;">
                    <el-tab-pane label="今日" name="first">
                        <div style="">
                            <div id="myChart1" :style="{width: '600px', height: '300px', float: 'left'}"></div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="本周" name="second">本周</el-tab-pane>
                    <el-tab-pane label="本月" name="third">本月</el-tab-pane>
                    <el-tab-pane label="全年" name="fourth">全年</el-tab-pane>
                </el-tabs>
            </a-col>
            <a-col :flex="2" style="margin: 0 10px">
                <a-range-picker @change="onChange">
                    <a-icon type="calendar" theme="twoTone" slot="suffixIcon"/>
                </a-range-picker>
                <h3 style="margin-top: 10px">门店销售额排名</h3>
                <a-list item-layout="horizontal" :data-source="data">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-list-item-meta
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        >
                            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                            <a-avatar
                                    slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </a-col>
        </a-row>
        <el-row>
            <el-col :span="12"><div class="grid-content" style="border: 1px solid lightgrey;">
                <a-card>
                    <h3 style="margin-bottom: 16px; padding: 20px">热门商品</h3>
                    <div style="margin-left: 10%">
                        <div id="myChart3" :style="{width: '600px', height: '300px', float: 'left'}"></div>
                    </div>
                </a-card>
            </div></el-col>
            <el-col :span="12"><div class="grid-content" style="border: 1px solid lightgrey;">
                <a-card>
                    <a-radio-group v-model="size" style="margin-bottom: 16px; padding: 16px 20px">
                        <a-radio-button value="small">
                            全部渠道
                        </a-radio-button>
                        <a-radio-button value="default">
                            线上
                        </a-radio-button>
                        <a-radio-button value="large">
                            门店
                        </a-radio-button>
                    </a-radio-group>
                    <div style="margin-left: 15%">
                        <div id="myChart2" :style="{width: '600px', height: '300px', float: 'left'}"></div>
                    </div>
                </a-card>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    // mid data
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    let echarts = require('echarts')
    export default {
        name: "Analysis",
        data () {
            return {
                // middle prt
                activeName: 'first',
                data,
                // 右下控制
                size: 'small',
            }
        },
        mounted(){
            //我们要在mounted生命周期函数中实例化echarts对象。因为我们要确保dom元素已经挂载到页面中
            this.Bar();
            this.Curve();
            this.CurveSoft();
            this.Pie()
        },
        methods:{
            // 标签页头
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 日期选择框
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            CurveSoft(){
                let myChart = this.$echarts.init(document.getElementById('myChart4'))
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                })
            },
            Curve(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart3'))
                var base = +new Date(1968, 9, 3);
                var oneDay = 24 * 3600 * 1000;
                var date = [];

                var data = [Math.random() * 300];

                for (var i = 1; i < 20000; i++) {
                    var now = new Date(base += oneDay);
                    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
                }
                // 绘制柱状图
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center',
                        text: '大数据量面积图',
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 10
                    }, {
                        start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            name: '模拟数据',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data: data
                        }
                    ]
                })
            },
            Pie(){
                let myChart = this.$echarts.init(document.getElementById('myChart2'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                })
            },
            Bar(){
                let myChart = this.$echarts.init(document.getElementById('myChart1'))
                myChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    #data-analysis{
        height: 100%;
    }
    .data-tab {
        height: 200px;
        width: 200px;
        margin: 10px;
        padding: 20px;
        border: 1px solid #8c8c8c;
        text-align: center;
    }
    /*布局*/
    .el-row {
        margin-bottom: 20px;
        &:last-child {
         margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        color: #8c8c8c;
        min-height: 300px;
        margin-top: 25px;
    }
</style>