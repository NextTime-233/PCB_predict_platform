<!--客户画像-->
<template>
    <div>
        <a-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="条件查询" name="first">
                    <div :class="advanced ? 'search' : null">
                        <a-form id="qForm" layout="horizontal">
                            <div :class="advanced ? null: 'fold'">
                                <a-row :gutter="8" >
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="最低购买总金额：" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseAmountLow" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="最高购买总金额：" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseAmountHigh" />
                                        </a-form-item>

                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <!--<a-form-item label="所在省市" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">-->
                                            <!--<a-input placeholder="请输入" size="small" v-model="form.province" />-->
                                        <!--</a-form-item>-->
                                        <a-form-item label="所在省市" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                        <el-select v-model="form.province" filterable placeholder="请选择" size="small" style="">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                     >
                                            </el-option>
                                        </el-select>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="8" v-if="advanced" >
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="最低购买次数" :labelCol="{span: 8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseNumLow" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item label="最高购买次数" :labelCol="{span:8}" :wrapperCol="{span: 15, offset: 1}">
                                            <a-input placeholder="请输入" size="small" v-model="form.totalPurchaseNumHigh" />
                                        </a-form-item>

                                    </a-col>

                                </a-row>
                                <a-row v-if="advanced"  >
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="起始注册时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="startChange" size="small" placeholder="选择日期" clearable >
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="结束注册时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="stopChange" size="small" placeholder="选择日期" clearable>
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="advanced"  >

                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="上次购买起始时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="lastStartChange" size="small" placeholder="选择日期" clearable>
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :md="8" :sm="24" >
                                        <a-form-item
                                                label="上次购买结束时间"
                                                :labelCol="{span: 7}"
                                                :wrapperCol="{span: 15, offset: 1}"
                                        >
                                            <a-date-picker @change="lastStopChange" size="small" placeholder="选择日期" clearable>
                                                <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                            </a-date-picker>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </div>
                            <span style="float: right; margin-top: 3px;">
                      <a-button type="primary" @click="submitButton">查询</a-button>
                      <a-button style="margin-left: 8px" @click="resetButton" >重置</a-button>
                      <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{advanced ? '收起' : '展开'}}
                        <a-icon :type="advanced ? 'up' : 'down'" />
                      </a>
                    </span>
                        </a-form>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="标签查询" name="second">
                    <div :class="advanced ? 'search' : null">
                        <a-form id="pForm" layout="horizontal" :model="formInline" @submit.native.prevent>
                            <div :class="advanced ? null: 'fold'">
                                <div>
                                    <a-row :gutter="15" >
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange" >-->类别维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.categoryDimension" ></a-input>-->
                                            <a-select placeholder="请选择" size="small" v-model="formInline.categoryDimension" allowClear>
                                                <a-select-option value="终端客户">终端客户</a-select-option>
                                                <a-select-option value="分销客户">分销客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange" >-->时间维度
                                            <!--<a-input placeholder="请输入" size="small"  v-model="formInline.timeDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.timeDimension" allowClear>
                                                <a-select-option value="老客户">老客户</a-select-option>
                                                <a-select-option value="新客户">新客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->销量维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.salesDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.salesDimension" allowClear>
                                                <a-select-option value="高销量">高销量</a-select-option>
                                                <a-select-option value="低销量">低销量</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->价值维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.valueDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.valueDimension" allowClear>
                                                <a-select-option value="高价值">高价值</a-select-option>
                                                <a-select-option value="低价值">低价值</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            地区维度
                                            <a-input placeholder="请输入省份" size="small" v-model="formInline.regionalDimension"></a-input>
                                            <!--<a-select placeholder="Select a person" size=small v-model="formInline.regionalDimension">-->
                                            <!--<a-select-option value="高价值">高价值</a-select-option>-->
                                            <!--<a-select-option value="低价值">低价值</a-select-option>-->
                                            <!--</a-select>-->
                                        </a-col>
                                    </a-row>
                                    <a-row v-if="advanced"  :gutter="15">
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->平台维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.platformDimension"></a-input>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.platformDimension" allowClear>
                                                <a-select-option value="淘宝">淘宝</a-select-option>
                                                <a-select-option value="天猫">天猫</a-select-option>
                                                <a-select-option value="其他">其他</a-select-option>
                                            </a-select>
                                            <!--</a-checkbox>-->
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->复购维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.repurchaseDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.repurchaseDimension" allowClear>
                                                <a-select-option value="高复购">高复购</a-select-option>
                                                <a-select-option value="低复购">低复购</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->信誉维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.reputationDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="Select a person" size=small v-model="formInline.reputationDimension" allowClear>
                                                <a-select-option value="高信誉">高信誉</a-select-option>
                                                <a-select-option value="低信誉">低信誉</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->促销维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.promotionDimension"></a-input>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.promotionDimension" allowClear>
                                                <a-select-option value="高敏感度">高敏感度</a-select-option>
                                                <a-select-option value="低敏感度">低敏感度</a-select-option>
                                            </a-select>
                                            <!--</a-checkbox>-->
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            <!--<a-checkbox @change="onChange">-->周期维度
                                            <!--<a-input placeholder="请输入" size="small" v-model="formInline.cycleDimension"></a-input>-->
                                            <!--</a-checkbox>-->
                                            <a-select placeholder="请选择" size=small v-model="formInline.cycleDimension" allowClear>
                                                <a-select-option value="稳定客户">稳定客户</a-select-option>
                                                <a-select-option value="潜在客户">潜在客户</a-select-option>
                                                <a-select-option value="潜在客户">流失客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                </div>
                                <span style="float: right; margin-top: 3px;">
                                   <a-button type="primary" @click="submitList">查询</a-button>
                                   <a-button style="margin-left: 8px" @click="resetInput">重置</a-button>
                                   <a @click="toggleAdvanced" style="margin-left: 8px">
                                       {{advanced ? '收起' : '展开'}}
                                       <a-icon :type="advanced ? 'up' : 'down'" />
                                   </a>
                                </span>
                            </div>
                        </a-form>
                    </div>
                </el-tab-pane>
                <div >
                    <el-dialog title="个人画像" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                        <!--<span>类别维度:{{this.imageRow.categoryDimension}}</span>-->
                        <el-tag >用户网名：{{this.imageRow.buyerNick}}</el-tag>
                        <div  ref="WordCloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>
                        <!--<a-row>-->

                            <!--<el-tag type="success" >{{this.imageRow.salesDimension}}</el-tag>-->
                            <!--<el-tag type="info" >{{this.imageRow.timeDimension}}</el-tag>-->
                            <!--<el-tag type="warning" >{{this.imageRow.cycleDimension}}</el-tag>-->
                            <!--<el-tag type="danger" >{{this.imageRow.platformDimension}}</el-tag>-->
                        <!--</a-row>-->
                        <!--<a-row>-->
                            <!--<el-tag >{{this.imageRow.promotionDimension}}</el-tag>-->
                            <!--<el-tag type="success" >{{this.imageRow.regionalDimension}}</el-tag>-->
                            <!--<el-tag type="info" e>{{this.imageRow.repurchaseDimension}}</el-tag>-->
                            <!--<el-tag type="warning" >{{this.imageRow.valueDimension}}</el-tag>-->
                            <!--<el-tag type="danger" >{{this.imageRow.reputationDimension}}</el-tag>-->
                        <!--</a-row>-->
                        <span slot="footer" class="dialog-footer">
                           <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                           <el-button type="primary" @click="dialogVisible = false">返回</el-button>
                           </span>
                    </el-dialog>
                    <div style="margin-bottom: 10px">
                    <el-button type="success" plain @click="getuserImage">生成画像</el-button>
                    </div>
                    <div>
                        <div>
                            <a-collapse  :bordered="false">
                                <template #expandIcon="props">
                                    <a-icon type="tags" :rotate="props.isActive ? 90 : 0" />
                                </template>
                                <a-collapse-panel key="1" header="按标签维度更新画像" :style="customStyle">
                                    <el-row >
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusCatePortrait">
                                                    类别维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple" >
                                                <a-button type="primary" @click="giveAllCusSalePortrait">
                                                    销量维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary"  @click="giveAllCusTimePortrait">
                                                    时间维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusValPortrait">
                                                    价值维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusRegPortrait">
                                                    地区维度
                                                </a-button>
                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row >
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusPalPortrait">
                                                    平台维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusRepurchasePortrait">
                                                    复购维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple" >
                                                <a-button type="primary"  @click="giveAllCusReputationPortrait">
                                                   信誉维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary"  @click="giveAllCusPromotionPortrait">
                                                    促销维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusCyclePortrait">
                                                    周期维度
                                                </a-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusProp1Portrait">
                                                   自定义标签1
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusProp2Portrait" >
                                                  自定义标签2
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple" >
                                                <a-button type="primary" @click="giveAllCusProp3Portrait" >
                                                    自定义标签3
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary"  @click="giveAllCusProp4Portrait">
                                                    自定义标签4
                                                </a-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" >
                                            <div class="grid-content bg-purple">
                                                <a-button type="primary" @click="giveAllCusProp5Portrait">
                                                    自定义标签5
                                                </a-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </a-collapse-panel>
                            </a-collapse>
                        </div>
                    </div>
                    <el-table :data="tableData" v-loading="loading"
                              element-loading-text="拼命加载中"
                              element-loading-spinner="el-icon-loading"
                              element-loading-background="rgba(255, 255, 255, 0.8)"
                              height="450" border style="..." @row-click="handle"  >
                        <el-table-column  fixed="" type="expand">
                            <template slot-scope="props">

                                <el-form label-position="left" inline class="demo-table-expand">
                                    <!--<el-form-item label="客户网名">-->
                                    <!--<span>{{ props.row.buyerNick}}</span>-->
                                    <!--</el-form-item>-->
                                    <!--<div id="mywordcloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>-->
                                    <div>
                                        <a-row>
                                            <a-col :md="4" :sm="24">
                                                <!--<a-input placeholder="请输入" size="small" ></a-input>-->
                                                <el-form-item label="类别维度:">
                                                    <span>{{ props.row.categoryDimension }}</span>
                                                </el-form-item>
                                                <el-form-item label="销量维度:">
                                                    <span>{{ props.row.salesDimension}}</span>
                                                </el-form-item>
                                                <el-form-item label="时间维度:">
                                                    <span>{{ props.row.timeDimension }}</span>
                                                </el-form-item>
                                                <el-form-item label="价值维度:">
                                                    <span>{{ props.row.valueDimension }}</span>
                                                </el-form-item>
                                                <el-form-item label="地区维度:">
                                                    <span>{{ props.row.regionalDimension }}</span>
                                                </el-form-item>
                                                <el-form-item label="平台维度:">
                                                    <span>{{ props.row.platformDimension}}</span>
                                                </el-form-item>
                                                <el-form-item label="复购维度:">
                                                    <span>{{ props.row.repurchaseDimension}}</span>
                                                </el-form-item>
                                                <el-form-item label="信誉维度:">
                                                    <span>{{ props.row.reputationDimension}}</span>
                                                </el-form-item>
                                                <el-form-item label="促销维度:">
                                                    <span>{{ props.row.promotionDimension}}</span>
                                                </el-form-item>
                                                <el-form-item label="周期维度:">
                                                    <span>{{ props.row.cycleDimension}}</span>
                                                </el-form-item>
                                            </a-col>
                                            <a-col  :md="4" :sm="24">
                                                 <div>
                                                 </div>
                                            </a-col>
                                            <a-col  :md="4" :sm="24">
                                                <div>
                                                </div>
                                            </a-col>
                                            <a-col  :md="4" :sm="24">

                                                    <a-input placeholder="请输入" size="small" ></a-input>
                                            </a-col>
                                        </a-row>
                                    </div>

                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="buyerNick" fixed=""    label="客户网名" width="100">
                        </el-table-column>
                        <el-table-column  prop="categoryDimension" label="类别维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="salesDimension" label="销量维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="timeDimension" label="时间维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="valueDimension" label="价值维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="regionalDimension" label="地区维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="platformDimension" label="平台维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="repurchaseDimension" label="复购维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="reputationDimension" label="信誉维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="promotionDimension" label="促销维度" width="100">
                        </el-table-column >
                        <el-table-column  prop="cycleDimension" label="周期维度" width="100">
                        </el-table-column >
                    </el-table>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pageNum"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="queryInfo.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </el-tabs>
        </a-card>
        <div>
        </div>
    </div>
</template>
<script>
    import echarts from "echarts";
    import "echarts-wordcloud/dist/echarts-wordcloud";
    import "echarts-wordcloud/dist/echarts-wordcloud.min";

    import StandardTable from '@/components/StandardTable'
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    const columns = []
    const dataSource = []
    export default {
        name: "detail",
        components: {ACol, ARow, StandardTable},
        data () {
            return {
                //分页
                queryInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                customStyle:'background:white;border-radius: 2px;margin-bottom: 2px;border: 0;overflow: hidden',
                //省份选择
                options: [{
                    value: '河北省',
                    label: '河北省'
                }, {
                    value: '山西省',
                    label: '山西省'
                }, {
                    value: '辽宁省',
                    label: '辽宁省'
                }, {
                    value: '吉林省',
                    label: '吉林省'
                }, {
                    value: '黑龙江省',
                    label: '黑龙江省'
                },{
                    value: '江苏省',
                    label: '江苏省'
                },{
                    value: '浙江省',
                    label: '浙江省'
                },{
                    value: '安徽省',
                    label: '安徽省'
                },{
                    value: '福建省',
                    label: '福建省'
                },{
                    value: '江西省',
                    label: '江西省'
                },{
                    value: '山东省',
                    label: '山东省'
                },{
                    value: '河南省',
                    label: '河南省'
                },{
                    value: '湖北省',
                    label: '湖北省'
                },{
                    value: '湖南省',
                    label: '湖南省'
                },{
                    value: '广东省',
                    label: '广东省'
                },{
                    value: '海南省',
                    label: '海南省'
                },{
                    value: '四川省',
                    label: '四川省'
                },{
                    value: '贵州省',
                    label: '贵州省'
                },{
                    value: '云南省',
                    label: '云南省'
                },{
                    value: '陕西省',
                    label: '陕西省'
                },{
                    value: '甘肃省',
                    label: '甘肃省'
                },{
                    value: '青海省',
                    label: '青海省'
                },{
                    value: '台湾',
                    label: '台湾'
                },{
                    value: '内蒙古自治区',
                    label: '内蒙古自治区'
                },{
                    value: '广西壮族自治区',
                    label: '广西壮族自治区'
                },{
                    value: '西藏自治区',
                    label: '西藏自治区'
                },{
                    value: '宁夏回族自治区',
                    label: '宁夏回族自治区'
                },{
                    value: '新疆维吾尔自治区',
                    label: '新疆维吾尔自治区'
                },{
                    value: '北京市',
                    label: '北京市'
                },{
                    value: '天津市',
                    label: '天津市'
                },{
                    value: '上海市',
                    label: '上海市'
                },{
                    value: '重庆市',
                    label: '重庆市'
                },{
                    value: '香港特别行政区',
                    label: '香港特别行政区'
                },{
                    value: '澳门特别行政区',
                    label: '澳门特别行政区'
                }],
                //每行数据
                imageRow:[],
                //个人画像弹框
                dialogVisible: false,
                //表格加载
                loading: true,
                advanced: true,
                tableData:[],
                selectedRows: [],
                pageSize: '',
                total: 0,
                tokenStr:'',
                activeName: 'second',
                // 复选框
                checked: true,
                indeterminate: true,
               //词云
                worddata: [
                    {
                        name: "中国特色社会主义",
                        value: 2500
                    },
                    {
                        name: "两学一做",
                        value: 3008
                    },{
                        name: "中华民族",
                        value: 5386
                    },
                    {
                        name: "马克思主义",
                        value: 4500
                    },
                    {
                        name: "民族复兴",
                        value: 3900
                    },
                    {
                        name: "社会主义制度",
                        value: 2500
                    },
                    {
                        name: "国防白皮书",
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
                flag: 0,
                //词云图片
                //标签搜索
                formInline:{
                    categoryDimension:'',
                    timeDimension:'',
                    salesDimension:'',
                    valueDimension:'',
                    regionalDimension:'',
                    platformDimension:'',
                    repurchaseDimension:'',
                    reputationDimension:'',
                    promotionDimension:'',
                    cycleDimension:'',
                },
                //条件查询
                form:{
                    reStartTime:'',
                    reEndTime:'',
                    // payStartTime:'',
                    // payEndTime:'',
                    totalPurchaseAmountLow:'',
                    totalPurchaseAmountHigh:'',
                    province:'',
                    totalPurchaseNumLow:'',
                    totalPurchaseNumHigh:'',
                    lastStartTime:'',
                    lastEndTime:'',
                }
            }
        },
        authorize: {
            deleteRecord: 'delete'
        },
        created() {
            this.finduserImage()
        },
        mounted(){
            this.initChart();
            // this.getuserImage();
        },
        methods: {
            finduserImage(){
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data)
                    // 去掉缓存，不对tableData重复赋值不会出现增量列表问题
                    console.log("拿到数据")
                    this.loading=false
                    that.total = res.data.data.length
                }).catch()
                axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findAllCusPortrait/1/10').then(res => {
                    console.log(res.data.data)
                    console.log("看看数据")
                    that.tableData = res.data.data
                }).catch()
            },
            //生成画像
            getuserImage(){
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                that.tokenStr = tokenStr
                console.log(that.tokenStr)
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusPortrait', {headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data)
                    console.log("拿到画像")
                    this.loading=false
                    this.$message({
                        message: '画像生成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            // 分页ok
            handleCurrentChange(currentPage){
                console.log(currentPage)
                this.queryInfo.pageNum = currentPage
                const that = this
                if(this.flag===0){
                    axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findAllCusPortrait/'+currentPage+'/'
                        +this.queryInfo.pageSize).then(res => {
                        console.log(res.data.data)
                        that.tableData = res.data.data
                        console.log("总接口当前页码")
                    }).catch()
                }
                if(this.flag===1){
                    axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByCondition/'+currentPage+'/'
                        +this.queryInfo.pageSize).then(res => {
                        console.log(res.data.data)
                        that.tableData = res.data.data
                        console.log("分页接口当前页码")
                    }).catch()
                }
            },
            handleSizeChange(pageSize) {
                console.log("页面数据量")
                console.log(pageSize)
                this.queryInfo.pageSize = pageSize;
                const that = this
                if(this.flag===0){
                    axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findAllCusPortrait/'
                        +this.queryInfo.pageNum+'/'+pageSize).then(res => {
                        // console.log(res.data.data)
                        that.tableData = res.data.data
                        console.log("总接口页面数据")
                    }).catch()
                }
                if(this.flag===1){
                    axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByCondition/'
                        +this.queryInfo.pageNum+'/'+pageSize).then(res => {
                        // console.log(res.data.data)
                        that.tableData = res.data.data
                        console.log("分页接口页面数据")
                    }).catch()
                }

            },
            // 标签查询
            submitList() {
                const vm = this;
                this.loading=true
                const that = this
                const midlist = {}
                const list = this.formInline
                console.log(list.categoryDimension)
                for(let i in list){
                    let value = list[i]
                    if (value === "") {
                        console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                console.log(midlist)
                console.log("提交表单")
                axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByLabel', {
                    params: midlist,
                }).then( res => {
                    console.log(res.data)
                    that.tableData = res.data.data;
                    that.total=res.data.length;
                    this.loading=false
                    if(res.data.data == null) {
                        this.$message.error('未查询到相关用户！')

                    }else{
                        console.log("成功！！")
                        //遇到失效问题，解决
                        vm.$message({
                            showClose: true,
                            message: '查询成功',
                            type: 'success'
                        });
                    }
                }).catch()
            },
            //条件查询
            submitButton() {
                const vm = this
                this.loading=true
                const that = this
                const midlist = {}
                const list = this.form
                // console.log(list)
                for(let i in list){
                    let value = list[i]
                    if (value === "") {
                        console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                        console.log(midlist)
                        console.log("提交表单")
                        axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByCondition', {
                         params:midlist,
                         }).then( res => {
                        console.log(res.data)
                        // 去掉缓存，不对tableData重复赋值不会出现增量列表问题
                        console.log("拿到查询数据")
                            this.flag=1
                       this.loading=false
                       // that.total = res.data.data.length
                        }).catch()
                        axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByCondition/1/10', {
                            params:midlist,
                        }).then( res => {
                            that.tableData = res.data.data;
                            console.log(that.tableData )
                            console.log("拿到分页数据")
                            // that.total = res.data.data.length;
                            // console.log(res.data.data.length)
                            this.loading=false
                            this.flag=1
                            console.log(this.flag)
                            if(res.data.data == null) {
                                this.$message.error('未查询到相关用户！')
                            }else{
                                console.log("chengong")
                                //遇到失效问题，解决
                                vm.$message({
                                    showClose: true,
                                    message: '查询成功',
                                    type: 'success'
                                });
                            }
                        }).catch()
            },
            //条件查询重置
            resetButton(){
                const that = this
                document.getElementById("qForm").reset()
                this.form={
                    reStartTime:'',
                    reEndTime:'',
                    payStartTime:'',
                    payEndTime:'',
                    totalPurchaseNum:'',
                    province:'',
                    totalPurchaseAmount:'',
                    lastStartTime:'',
                    lastEndTime:'',
                }
                axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findCusPortraitByCondition', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    // console.log(res.data)
                    that.tableData = res.data.data;
                    // that.total=res.data.length;
                }).catch()
            },
            // 重置
            resetInput(){
                const that = this
                document.getElementById("pForm").reset()
                this.formInline = {
                    categoryDimension:'',
                    timeDimension:'',
                    salesDimension:'',
                    valueDimension:'',
                    regionalDimension:'',
                    platformDimension:'',
                    repurchaseDimension:'',
                    reputationDimension:'',
                    promotionDimension:'',
                    cycleDimension:'',
                }
                axios.get('http://192.168.1.100:8080/backend/portrait/customerPortrait/findAllCusPortrait', {headers:{
                        token: this.tokenStr
                    }}).then( res => {
                    // console.log(res.data)
                    that.tableData = res.data.data;
                    // that.total=res.data.length;
                }).catch()
            },
            //类别维度更新
            giveAllCusCatePortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusCatePortrait').then( res => {
                    console.log(res.msg)
                    console.log("11111")
                    this.loading=false
                    this.$message({
                        message: '类别维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //销量维度更新
            giveAllCusSalePortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusSalePortrait').then( res => {
                    console.log(res.msg)
                    console.log("22222")
                    this.loading=false
                    this.$message({
                        message: '销量维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //时间维度更新
            giveAllCusTimePortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusTimePortrait').then( res => {
                    console.log(res.msg)
                    console.log("33333")
                    this.loading=false
                    this.$message({
                        message: '时间维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
             //价值维度更新
            giveAllCusValPortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusValPortrait').then( res => {
                    console.log(res.msg)
                    console.log("44444")
                    this.loading=false
                    this.$message({
                        message: '价值维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //地区维度更新
            giveAllCusRegPortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusRegPortrait').then( res => {
                    console.log(res.msg)
                    console.log("55555")
                    this.loading=false
                    this.$message({
                        message: '地区维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //平台维度更新
            giveAllCusPalPortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080//backend/portrait/customerPortrait/giveAllCusPalPortrait').then( res => {
                    console.log(res.msg)
                    console.log("66666")
                    this.loading=false
                    this.$message({
                        message: '平台维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //复购维度更新
            giveAllCusRepurchasePortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080//backend/portrait/customerPortrait/giveAllCusRepurchasePortrait').then( res => {
                    console.log(res.msg)
                    console.log("77777")
                    this.loading=false
                    this.$message({
                        message: '复购维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //信誉维度更新
            giveAllCusReputationPortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusReputationPortrait').then( res => {
                    console.log(res.msg)
                    console.log("88888")
                    this.loading=false
                    this.$message({
                        message: '信誉维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //促销维度更新
            giveAllCusPromotionPortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusPromotionPortrait').then( res => {
                    console.log(res.msg)
                    console.log("99999")
                    this.loading=false
                    this.$message({
                        message: '促销维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //周期维度
            giveAllCusCyclePortrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusCyclePortrait').then( res => {
                    console.log(res.msg)
                    console.log("！！！！")
                    this.loading=false
                    this.$message({
                        message: '周期维度更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度1
            giveAllCusProp1Portrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusProp1Portrait').then( res => {
                    console.log(res.msg)
                    console.log("？？？")
                    this.loading=false
                    this.$message({
                        message: '自定义1更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度2
            giveAllCusProp2Portrait(){
                this.loading=true
                const that = this
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusProp2Portrait').then( res => {
                    console.log(res.msg)
                    console.log("？!？!？!")
                    this.loading=false
                    this.$message({
                        message: '自定义2更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度3
            giveAllCusProp3Portrait(){
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusProp3Portrait').then( res => {
                    console.log(res.msg)
                    console.log("？!？!？!")
                    this.loading=false
                    this.$message({
                        message: '自定义3更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度4
            giveAllCusProp4Portrait(){
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusProp4Portrait').then( res => {
                    console.log(res.msg)
                    console.log("mmmmm")
                    this.loading=false
                    this.$message({
                        message: '自定义4更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义味素5
            giveAllCusProp5Portrait(){
                axios.put('http://192.168.1.100:8080/backend/portrait/customerPortrait/giveAllCusProp5Portrait').then( res => {
                    console.log(res.msg)
                    console.log("mmmmm")
                    this.loading=false
                    this.$message({
                        message: '自定义5更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            checkAll(){
            },
            // 展开
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            onChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
            },
            //时间选择框
            startChange(date,dateString){
                this.form.reStartTime =dateString
                console.log(dateString)
            },
            stopChange(date,dateString){
                this.form.reEndTime = dateString
                console.log(dateString)
            },
            lastStartChange(date,dateString){
                this.form.lastStartTime = dateString
            },
            lastStopChange(date,dateString){
                this.form.lastEndTime = dateString
            },
            //词云
            initChart() {
                    const WordCloud  = this.$refs.WordCloud
                    console.log('lll');
                    if (WordCloud){
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
                        window.addEventListener("resize",function () {
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
                    .catch(_ => {});
            },
            // table
            handleClick(row) {
                console.log("绑定查询按键");
                console.log(row);
            },
            remove () {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            handleMenuClick (e) {
                if (e.key === 'delete') {
                    this.remove()
                }
            },
            //获取行内信息
            handle(row, event, column) {
                    console.log("这是row")
                    console.log(row)
                    const that = this
                    that.imageRow =row
                    this.dialogVisible=true
                    this.$nextTick(()=>{
                        this.initChart()
                    })
                    let j = 0
                     for(let i in row){
                         // console.log(i)
                         if (i!=='buyerNick'){
                         console.log(row[i])
                         this.worddata[j].name=row[i]
                         j++
                         }

                     }
                      }

        }
    }
</script>

<style lang="less" scoped>

    .search{
        margin-bottom:30px;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block
    }
    .operator{
        margin-bottom: 18px;
    }
    .biaoge{
        margin-bottom:10px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
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
    .el-tag {
        margin-right: 10px;
        font-size: medium;
        /*margin-top: 0px;*/
        position: center;
    }
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>