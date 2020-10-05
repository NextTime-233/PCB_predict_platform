<!--客户画像-->
<template>
    <div>
        <a-card>
            <div style="font-size: large">
                全体客户画像
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick()">
                <el-tab-pane label="条件查询" name="first" >
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
                      <a-button type="primary" @click="submitButton()">查询</a-button>
                      <a-button style="margin-left: 8px" @click="resetButton" >重置</a-button>
                      <!--<a @click="toggleAdvanced" style="margin-left: 8px">-->
                        <!--{{advanced ? '收起' : '展开'}}-->
                        <!--<a-icon :type="advanced ? 'up' : 'down'" />-->
                      <!--</a>-->
                    </span>
                            <el-table :data="tableData1" v-loading="loading"
                                      element-loading-text="拼命加载中"
                                      element-loading-spinner="el-icon-loading"
                                      element-loading-background="rgba(255, 255, 255, 0.8)"
                                      height="450" border style="..." @row-click="handle"  >
                                <el-table-column  prop="buyerNick" fixed=""    label="客户网名" >
                                </el-table-column>
                                <el-table-column  prop="categoryDimension" label="类别维度" >
                                </el-table-column >
                                <el-table-column  prop="salesDimension" label="销量维度" >
                                </el-table-column >
                                <el-table-column  prop="timeDimension" label="时间维度" >
                                </el-table-column >
                                <el-table-column  prop="valueDimension" label="价值维度" >
                                </el-table-column >
                                <el-table-column  prop="regionalDimension" label="地区维度" >
                                </el-table-column >
                                <el-table-column  prop="platformDimension" label="平台维度" >
                                </el-table-column >
                                <el-table-column  prop="repurchaseDimension" label="复购维度">
                                </el-table-column >
                                <el-table-column  prop="reputationDimension" label="信誉维度" >
                                </el-table-column >
                                <el-table-column  prop="promotionDimension" label="促销维度" >
                                </el-table-column >
                                <el-table-column  prop="cycleDimension" label="周期维度" >
                                </el-table-column >
                                <el-table-column  prop="prop1" label="自定义维度1" >
                                </el-table-column >
                                <el-table-column  prop="prop2" label="自定义维度2" >
                                </el-table-column >
                                <el-table-column  prop="prop3" label="自定义维度3">
                                </el-table-column >
                                <el-table-column  prop="prop4" label="自定义维度4" >
                                </el-table-column >
                                <el-table-column  prop="prop5" label="自定义维度5" >
                                </el-table-column >
                            </el-table>
                            <el-pagination
                                    @size-change="handleSizeChange1"
                                    @current-change="handleCurrentChange1"
                                    :current-page="queryInfo1.pageNum1"
                                    :page-sizes="[5, 10, 15, 20]"
                                    :page-size="queryInfo1.pageSize1"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total1">
                            </el-pagination>
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
                                            类别维度
                                            <a-select placeholder="请选择" size="small" v-model="formInline.categoryDimension" allowClear>
                                                <a-select-option value="终端客户">终端客户</a-select-option>
                                                <a-select-option value="分销客户">分销客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            时间维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.timeDimension" allowClear>
                                                <a-select-option value="老客户">老客户</a-select-option>
                                                <a-select-option value="新客户">新客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            销量维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.salesDimension" allowClear>
                                                <a-select-option value="高销量">高销量</a-select-option>
                                                <a-select-option value="低销量">低销量</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >价值维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.valueDimension" allowClear>
                                                <a-select-option value="高价值">高价值</a-select-option>
                                                <a-select-option value="低价值">低价值</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            地区维度
                                            <a-select
                                                    allowClear
                                                    size=small
                                                    show-search
                                                    placeholder="请选择"
                                                    option-filter-prop="children"
                                                    :filter-option="filterOption"
                                                    @focus="handleFocus"
                                                    @blur="handleBlur"
                                                    @change="handleChange"
                                                    v-model="formInline.regionalDimension"
                                            >
                                                <a-select-option value="河北省">
                                                    河北省
                                                </a-select-option>
                                                <a-select-option value="山西省">
                                                    山西省
                                                </a-select-option>
                                                <a-select-option value="辽宁省">
                                                    辽宁省
                                                </a-select-option>
                                                <a-select-option value="吉林省">
                                                    吉林省
                                                </a-select-option>
                                                <a-select-option value="黑龙江省">
                                                    黑龙江
                                                </a-select-option>
                                                <a-select-option value="江苏省">
                                                    江苏省
                                                </a-select-option>
                                                <a-select-option value="浙江省">
                                                    浙江省
                                                </a-select-option>
                                                <a-select-option value="安徽省">
                                                    安徽省
                                                </a-select-option>
                                                <a-select-option value="福建省">
                                                    福建省
                                                </a-select-option>
                                                <a-select-option value="江西省">
                                                    江西省
                                                </a-select-option>
                                                <a-select-option value="山东省">
                                                    山东省
                                                </a-select-option>
                                                <a-select-option value="河南省">
                                                    河南省
                                                </a-select-option>
                                                <a-select-option value="湖北省">
                                                    湖北省
                                                </a-select-option>
                                                <a-select-option value="湖南省">
                                                    湖南省
                                                </a-select-option>
                                                <a-select-option value="广东省">
                                                    广东省
                                                </a-select-option>
                                                <a-select-option value="海南省">
                                                    海南省
                                                </a-select-option>
                                                <a-select-option value="四川省">
                                                    四川省
                                                </a-select-option>
                                                <a-select-option value="贵州省">
                                                    贵州省
                                                </a-select-option>
                                                <a-select-option value="云南省">
                                                    云南省
                                                </a-select-option>
                                                <a-select-option value="陕西省">
                                                    陕西省
                                                </a-select-option>
                                                <a-select-option value="甘肃省">
                                                    甘肃省
                                                </a-select-option>
                                                <a-select-option value="青海省">
                                                    青海省
                                                </a-select-option>
                                                <a-select-option value="台湾省">
                                                    台湾省
                                                </a-select-option>
                                                <a-select-option value="北京市">
                                                    北京市
                                                </a-select-option>
                                                <a-select-option value="天津市">
                                                    天津市
                                                </a-select-option>
                                                <a-select-option value="上海市">
                                                    上海市
                                                </a-select-option>
                                                <a-select-option value="重庆市">
                                                    重庆市
                                                </a-select-option>
                                                <a-select-option value="内蒙古自治区">
                                                    内蒙古自治区
                                                </a-select-option>
                                                <a-select-option value="广西壮族自治区">
                                                    广西壮族自治区
                                                </a-select-option>
                                                <a-select-option value="宁夏回族自治区">
                                                    宁夏回族自治区
                                                </a-select-option>
                                                <a-select-option value="新疆维吾尔自治区">
                                                    新疆维吾尔自治区
                                                </a-select-option>
                                                <a-select-option value="西藏自治区">
                                                    西藏自治区
                                                </a-select-option>
                                                <a-select-option value="香港特别行政区">
                                                    香港特别行政区
                                                </a-select-option>
                                                <a-select-option value="澳门特别行政区">
                                                    澳门特别行政区
                                                </a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                    <a-row v-if="advanced"  :gutter="15">
                                        <a-col :md="4" :sm="24" >
                                            平台维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.platformDimension" allowClear>
                                                <a-select-option value="京东">京东</a-select-option>
                                                <a-select-option value="天猫">天猫</a-select-option>
                                                <a-select-option value="平台跳转">平台跳转</a-select-option>
                                                <a-select-option value="其他">其他</a-select-option>
                                            </a-select>
                                            <!--</a-checkbox>-->
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            复购维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.repurchaseDimension" allowClear>
                                                <a-select-option value="高复购">高复购</a-select-option>
                                                <a-select-option value="低复购">低复购</a-select-option>
                                            </a-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            信誉维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.reputationDimension" allowClear>
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
                                            周期维度
                                            <a-select placeholder="请选择" size=small v-model="formInline.cycleDimension" allowClear>
                                                <a-select-option value="稳定客户">稳定客户</a-select-option>
                                                <a-select-option value="潜在客户">潜在客户</a-select-option>
                                                <a-select-option value="流失客户">流失客户</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </a-row>
                                    <a-row v-if="advanced"  :gutter="15">
                                        <a-col :md="4" :sm="24" >
                                            自定义维度1
                                            <el-select v-model="formInline.prop1" filterable placeholder="请选择" size="small" clearable  :disabled=cannot1>
                                                <el-option
                                                        v-for="item in optionLabel"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            自定义维度2
                                            <el-select v-model="formInline.prop2" filterable placeholder="请选择" size="small" clearable :disabled=cannot2>
                                                <el-option
                                                        v-for="item in optionLabel2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            自定义维度3
                                            <el-select v-model="formInline.prop3" filterable placeholder="请选择" size="small" clearable :disabled=cannot3>
                                                <el-option
                                                        v-for="item in optionLabel3"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            自定义维度4
                                            <el-select v-model="formInline.prop4" filterable placeholder="请选择" size="small" clearable :disabled=cannot4>
                                                <el-option
                                                        v-for="item in optionLabel4"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </a-col>
                                        <a-col :md="4" :sm="24" >
                                            自定义维度5
                                            <el-select v-model="formInline.prop5" filterable placeholder="请选择" size="small" clearable :disabled=cannot5>
                                                <el-option
                                                        v-for="item in optionLabel5"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"

                                                >
                                                </el-option>
                                            </el-select>
                                        </a-col>
                                    </a-row>
                                </div>
                                <el-row>
                                      <span style="float: right; margin-top: 3px;">
                                    <el-button type="success" plain style="margin-right: 10px;margin-top: 5px" size="small">导出数据</el-button>
                                   <a-button type="primary" @click="submitList()" style="margin-top: 5px">查询</a-button>
                                   <a-button style="margin-left: 8px;margin-top: 5px" @click="resetInput">重置</a-button>
                                   <!--<a @click="toggleAdvanced" style="margin-left: 8px">-->
                                       <!--{{advanced ? '收起' : '展开'}}-->
                                       <!--<a-icon :type="advanced ? 'up' : 'down'" />-->
                                   <!--</a>-->
                                </span>
                                </el-row>
                                <el-row>
                                    <div>
                                        <!--按维度更新画像-->
                                        <a-collapse  :bordered="false">
                                            <template #expandIcon="props">
                                                <a-icon type="tags" :rotate="props.isActive ? 90 : 0" />
                                            </template>
                                            <!--按维度更新画像-->
                                            <a-collapse-panel key="1" header="按标签维度更新画像" :style="customStyle">
                                                <!--<el-row >-->
                                                <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusCatePortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;类别维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusSalePortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;销量维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary"  @click="giveAllCusTimePortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;时间维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusValPortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;价值维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusRegPortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;地区维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--</el-row>-->
                                                <!--<el-row >-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusPalPortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;平台维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusRepurchasePortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;复购维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary"  @click="giveAllCusReputationPortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;信誉维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary"  @click="giveAllCusPromotionPortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;促销维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-col :span="4" >&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<a-button type="primary" @click="giveAllCusCyclePortrait">&ndash;&gt;-->
                                                <!--&lt;!&ndash;周期维度&ndash;&gt;-->
                                                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                                                <!--</el-row>-->
                                                <el-row >
                                                    <el-col :span="4" >
                                                        <div class="grid-content bg-purple">
                                                            <a-button type="primary"  :disabled=dis0 @click="giveAllCusProp1Portrait">
                                                                自定义标签1
                                                            </a-button>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple">
                                                            <a-button type="primary" :disabled=dis1 @click="giveAllCusProp2Portrait" >
                                                                自定义标签2
                                                            </a-button>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4" >
                                                        <div class="grid-content bg-purple" >
                                                            <a-button type="primary" :disabled=dis2 @click="giveAllCusProp3Portrait" >
                                                                自定义标签3
                                                            </a-button>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple">
                                                            <a-button type="primary" :disabled=dis3 @click="giveAllCusProp4Portrait">
                                                                自定义标签4
                                                            </a-button>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4" >
                                                        <div class="grid-content bg-purple">
                                                            <a-button type="primary" :disabled=dis4 @click="giveAllCusProp5Portrait">
                                                                自定义标签5
                                                            </a-button>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </a-collapse-panel>
                                        </a-collapse>
                                    </div>
                                </el-row>
                                <!--渲染表格数据-->
                                <el-table :data="tableData" v-loading="loading"
                                          element-loading-text="拼命加载中"
                                          element-loading-spinner="el-icon-loading"
                                          element-loading-background="rgba(255, 255, 255, 0.8)"
                                          height="450" border style="..." @row-click="handle"  >
                                    <el-table-column  prop="buyerNick" fixed=""    label="客户网名" >
                                    </el-table-column>
                                    <el-table-column  prop="categoryDimension" label="类别维度" >
                                    </el-table-column >
                                    <el-table-column  prop="salesDimension" label="销量维度" >
                                    </el-table-column >
                                    <el-table-column  prop="timeDimension" label="时间维度" >
                                    </el-table-column >
                                    <el-table-column  prop="valueDimension" label="价值维度" >
                                    </el-table-column >
                                    <el-table-column  prop="regionalDimension" label="地区维度" >
                                    </el-table-column >
                                    <el-table-column  prop="platformDimension" label="平台维度" >
                                    </el-table-column >
                                    <el-table-column  prop="repurchaseDimension" label="复购维度">
                                    </el-table-column >
                                    <el-table-column  prop="reputationDimension" label="信誉维度" >
                                    </el-table-column >
                                    <el-table-column  prop="promotionDimension" label="促销维度" >
                                    </el-table-column >
                                    <el-table-column  prop="cycleDimension" label="周期维度" >
                                    </el-table-column >
                                    <el-table-column  prop="prop1" label="自定义维度1" >
                                    </el-table-column >
                                    <el-table-column  prop="prop2" label="自定义维度2" >
                                    </el-table-column >
                                    <el-table-column  prop="prop3" label="自定义维度3">
                                    </el-table-column >
                                    <el-table-column  prop="prop4" label="自定义维度4" >
                                    </el-table-column >
                                    <el-table-column  prop="prop5" label="自定义维度5" >
                                    </el-table-column >
                                </el-table>
                                <!--分页-->
                                <el-pagination
                                        :current-page.sync = "page"
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="queryInfo.pageNum"
                                        :page-sizes="[5, 10, 15, 20]"
                                        :page-size="queryInfo.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total">
                                </el-pagination>
                            </div>
                        </a-form>
                    </div>
                </el-tab-pane>
                <div >
                    <!--弹窗-->
                    <el-dialog title="个人画像" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                        <el-tag >用户网名：{{this.imageRow.buyerNick}}</el-tag>
                        <div  ref="WordCloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>
                        <span slot="footer" class="dialog-footer">
                           <el-button type="primary" @click="dialogVisible = false">返回</el-button>
                           </span>
                    </el-dialog>
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
                page: 1,  // 当前页面
                //条件查询分页
                queryInfo1:{
                    pageNum1:1,
                    pageSize1:10,
                },
                //分页
                queryInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                customStyle:'background:white;border-radius: 2px;margin-bottom: 2px;border: 0;overflow: hidden',
                //自定义标签解决
                optionLabel5:[
                    {
                        value: '选项1',
                        label: ''
                    },
                ],
                optionLabel4:[
                    {
                        value: '选项1',
                        label: ''
                    },
                ],
                optionLabel3:[
                    {
                        value: '选项1',
                        label: ''
                    },
                ],
                optionLabel2:[
                    {
                        value: '选项1',
                        label: ''
                    },
                ],
                optionLabel:[
                    {
                        value: '选项1',
                        label: ''
                    },
                ],
                value:'',
                //选择器
                selectData:[],
                cannot1:true,
                cannot2:true,
                cannot3:true,
                cannot4:true,
                cannot5:true,
                //自定义按钮
                dis0:true,
                dis1:true,
                dis2:true,
                dis3:true,
                dis4:true,
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
                tableData1:[],
                selectedRows: [],
                pageSize: '',
                total: 0,
                total1:0,
                tokenStr:'',
                activeName: 'second',
                // 复选框
                checked: true,
                indeterminate: true,
                //词云
                worddata: [
                    {
                        name: "中国特色社会主义",
                        value: 5600
                    },
                    {
                        name: "两学一做",
                        value: 6008
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
                        value: 4380
                    },
                    {
                        name: "文化强国",
                        value: 5380
                    },
                    {
                        name: "文化强国",
                        value:5380
                    },
                    {
                        name: "文化强国",
                        value: 4380
                    },
                    {
                        name: "文化强国",
                        value: 3380
                    },{
                        name: "文化强国",
                        value: 3380
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
                    prop1:'',
                    prop2:'',
                    prop3:'',
                    prop4:'',
                    prop5:'',
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
            this.loading=true
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            // console.log(tokenStr)
            axios.get('backend/portrait/customerPortrait/findAllCusPortrait/1/10', {headers:{
                    token: tokenStr
                }}).then(res => {
                this.loading=false
                // console.log(res.data.data)
                // console.log("看看数据")
                that.tableData = res.data.data.list
                that.tableData1=res.data.data.list
                that.total=res.data.data.total
                that.total1=res.data.data.total
            }).catch()
            this.getLabelVal()
        },
        mounted(){
            this.initChart();
            // this.getuserImage();
            this.getLabelVal();
        },
        // inject: ['reload'],
        methods: {
            finduserImage(){
                console.log('调用全表数据刷新!')
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                axios.get('backend/portrait/customerPortrait/findAllCusPortrait/1/10', {headers:{
                        token: tokenStr
                    }}).then(res => {
                    that.loading=false
                    that.tableData = res.data.data.list
                    that.tableData1=res.data.data.list
                    that.total=res.data.data.total
                    that.total1=res.data.data.total
                }).catch()
            },
            //s获取标签
            getLabelVal(){
                const that = this
                // console.log("画像页调取页面更新自定义标签")
                const tokenStr = window.sessionStorage.getItem('token')
                axios.get('backend/label/findAllLabelVal/1/5',{headers:{
                        token: tokenStr}}).then(res => {
                    // console.log(res.data)
                    that.selectData = res.data.data.list;
                    // that.getTotal()
                    if (that.selectData[0].labelDimension === '自定义维度1') {
                        that.dis0 = false
                        this.cannot1=false
                        this.optionLabel[0].label= that.selectData[0].labelVal
                        // this.optionLabel[0].value=res.data.data.list[0].labelVal
                        // console.log(res.data.data.list[0].labelVal)
                        // console.log('标签1')
                    } else if (that.selectData[0].labelDimension === '自定义维度2') {
                        that.dis1 = false;
                        this.cannot2=false
                        this.optionLabel2[0].label=that.selectData[0].labelVal
                        // console.log('已定义2')
                    } else if (that.selectData[0].labelDimension === '自定义维度3') {
                        that.dis2 = false;
                        this.cannot3=false
                        this.optionLabel3[0].label=that.selectData[0].labelVal
                        // console.log('已定义3')
                    } else if (that.selectData[0].labelDimension === '自定义维度4') {
                        that.dis3 = false;
                        this.cannot4=false
                        this.optionLabel4[0].label=that.selectData[0].labelVal
                        // console.log('已定义4')
                    } else if (that.selectData[0].labelDimension === '自定义维度5') {
                        that.dis4 = false;
                        this.cannot5=false
                        this.optionLabel5[0].label=that.selectData[0].labelVal
                        // console.log('已定义5')
                    }
                }).catch()
            },
            // //生成画像
            // getuserImage(){
            //     this.loading=true
            //     const that = this
            //     const tokenStr = window.sessionStorage.getItem('token')
            //     that.tokenStr = tokenStr
            //     // console.log(that.tokenStr)
            //     axios.put('backend/portrait/customerPortrait/giveAllCusPortrait', {headers:{
            //             token: tokenStr
            //         }}).then( res => {
            //         // console.log(res.data)
            //         // console.log("拿到画像")
            //         this.loading=false
            //         this.$message({
            //             message: '画像生成成功！',
            //             type: 'success'
            //         });
            //     }).catch()
            // },
            // 分页ok,首页是0，标签是1，条件是2
            handleCurrentChange(currentPage){
                // console.log(currentPage)
                this.loading=true
                this.queryInfo.pageNum = currentPage
                const tokenStr = window.sessionStorage.getItem('token')
                const that = this
                this.page=1
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortrait/'+currentPage+'/'
                        +this.queryInfo.pageSize, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // console.log(res.data.data)
                        that.tableData = res.data.data.list
                        that.total=res.data.data.total
                        this.loading=false
                        // console.log("总接口当前页码")
                    }).catch()
                }
                else if(this.flag===1){
                    this.submitList()
                }

            },
            handleSizeChange(pageSize) {
                // console.log("页面数据量")
                // console.log(pageSize)
                this.queryInfo.pageSize = pageSize;
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortrait/'
                        +this.queryInfo.pageNum+'/'+pageSize, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // // console.log(res.data.data)
                        that.tableData = res.data.data.list
                        that.total=res.data.data.total
                        // console.log("总接口页面数据")
                    }).catch()
                }
                else if(this.flag===1){
                    this.submitList()
                }
            },
            //条件查询分页
            handleCurrentChange1(currentPage){
                // console.log(currentPage)
                this.loading=true
                this.queryInfo1.pageNum1 = currentPage
                const tokenStr = window.sessionStorage.getItem('token')
                const that = this
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortrait/'+currentPage+'/'
                        +this.queryInfo1.pageSize1, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // console.log(res.data.data)
                        that.tableData1 = res.data.data.list
                        that.total1=res.data.data.total
                        this.loading=false
                        // console.log("总接口当前页码")
                    }).catch()
                }
                else if(this.flag===2){
                    this.submitButton()
                }
            },
            handleSizeChange1(pageSize) {
                // console.log("页面数据量")
                // console.log(pageSize)
                this.queryInfo1.pageSize1 = pageSize;
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortrait/'
                        +this.queryInfo1.pageNum1+'/'+pageSize, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // // console.log(res.data.data)
                        that.tableData1 = res.data.data.list
                        that.total1=res.data.data.total
                        // console.log("总接口页面数据")
                    }).catch()
                }
                else if(this.flag===2){
                    this.submitButton()
                }
            },
            // 标签查询
            submitList() {
                console.log('标签查询')
                const vm = this;
                this.loading=true
                const that = this
                const midlist = {}
                const list = this.formInline

                for(let i in list){
                    let value = list[i]
                    if (value === "") {
                        // console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                const tokenStr = window.sessionStorage.getItem('token')
                if(that.flag===0){
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByLabel/1/10', {
                        params: midlist,
                        headers: {token: tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        console.log(res.data)
                        that.tableData = res.data.data.list;
                        that.total=res.data.data.total;
                        this.loading=false
                        this.flag=1
                        if(res.data.data.list == null) {
                            this.$message.error('未查询到相关用户！')
                        }else{
                            // console.log("成功！！")
                            //遇到失效问题，解决
                            vm.$message({
                                showClose: true,
                                message: '查询成功',
                                type: 'success'
                            });
                        }
                    }).catch()
                }
                else {

                    axios.get('backend/portrait/customerPortrait/findCusPortraitByLabel/'+
                        this.queryInfo.pageNum+'/'+this.queryInfo.pageSize, {
                        params: midlist,
                        headers: {token:tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        // console.log(res.data)
                        console.log('当前页码'+this.queryInfo.pageNum)
                        that.tableData = res.data.data.list;
                        that.total=res.data.data.total;
                        this.loading=false
                    }).catch()

                }
            },
            // 条件查询绑定button
            submitButton() {
                const vm = this
                console.log('条件查询')
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                const midlist = {}
                console.log('条件查询结果111')
                const list = this.form
                // // console.log(list)
                for(let i in list){
                    let value = list[i]
                    if (value === "") {
                        // console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByCondition/1/10', {
                        params:midlist,
                        headers: {token: tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        console.log("第一次拿到条件查询数据")
                        this.flag=2
                        this.loading=false
                        that.tableData1 = res.data.data.list
                        this.total1=res.data.data.total
                    }).catch()
                }
                // 查询结果分页,limlin放在分页函数
                else {
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByCondition/'
                        +this.queryInfo1.pageNum1+'/'+this.queryInfo1.pageSize1, {
                        params:midlist,
                        headers: {token: tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        console.log("第一次拿到分页查询数据")
                        that.tableData1 = res.data.data.list;
                        that.total1 = res.data.data.total
                        this.loading=false
                        // this.flag=1
                        // console.log(this.flag)
                    }).catch()
                }
            },
            //条件查询重置
            resetButton(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
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
                axios.get('backend/portrait/customerPortrait/findCusPortraitByCondition/1/10',
                    {headers:{token: tokenStr}, tokenBackend: tokenStr}).then( res => {
                    that.tableData1 = res.data.data.list
                    that.total=res.data.data.total
                    that.loading = false
                }).catch()
                this.finduserImage()
            },
            // 标签查询重置
            resetInput(){
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
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
                axios.get('backend/portrait/customerPortrait/findAllCusPortrait/1/10','',
                    {headers:{token: tokenStr},tokenBackend: tokenStr}).then( res => {
                    that.tableData = res.data.data.list;
                    that.total=res.data.data.total
                    that.loading = false
                }).catch()
                this.finduserImage()
            },
            //类别维度更新
            giveAllCusCatePortrait(){
                this.loading=true
                // const tokenStr = window.sessionStorage.getItem('token')
                // // console.log(window.sessionStorage)
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                const that = this
                // // console.log(tokenStr)
                // console.log('检查')
                axios.put('backend/portrait/customerPortrait/giveAllCusCatePortrait','',config).then( res => {
                    this.loading=false
                    this.$message({
                        message: '类别维度更新成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //销量维度更新
            giveAllCusSalePortrait(){
                this.loading=true
                const that = this
                // const tokenStr = window.sessionStorage.getItem('token')
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusSalePortrait'
                    ,'',config).then( res => {
                    // console.log(res.msg)
                    // console.log("22222")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                // const tokenStr = window.sessionStorage.getItem('token')
                axios.put('backend/portrait/customerPortrait/giveAllCusTimePortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("33333")
                    this.loading=false
                    this.$message({
                        message: '时间维度更新成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //价值维度更新
            giveAllCusValPortrait(){
                this.loading=true
                const that = this
                // const tokenStr = window.sessionStorage.getItem('token')
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusValPortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("44444")
                    this.loading=false
                    this.$message({
                        message: '价值维度更新成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //地区维度更新
            giveAllCusRegPortrait(){
                this.loading=true
                const that = this
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusRegPortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("55555")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusPalPortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("66666")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusRepurchasePortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("77777")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusReputationPortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("88888")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusPromotionPortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("99999")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusCyclePortrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("！！！！")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusProp1Portrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("？？？")
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
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusProp2Portrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("？!？!？!")
                    this.loading=false
                    this.$message({
                        message: '自定义2更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度3
            giveAllCusProp3Portrait(){
                this.loading=true
                const that = this
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusProp3Portrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("？!？!？!")
                    this.loading=false
                    this.$message({
                        message: '自定义3更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度4
            giveAllCusProp4Portrait(){
                this.loading=true
                const that = this
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusProp4Portrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("mmmmm")
                    this.loading=false
                    this.$message({
                        message: '自定义4更新成成功！',
                        type: 'success'
                    });
                }).catch()
            },
            //自定义维度5
            giveAllCusProp5Portrait(){
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "token":window.sessionStorage.getItem('token')
                    }
                }
                axios.put('backend/portrait/customerPortrait/giveAllCusProp5Portrait','',config).then( res => {
                    // console.log(res.msg)
                    // console.log("mmmmm")
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
            // onChange(checkedList) {
            //     this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
            //     this.checkAll = checkedList.length === plainOptions.length;
            // },
            //时间选择框
            startChange(date,dateString){
                this.form.reStartTime =dateString
                // console.log(dateString)
            },
            stopChange(date,dateString){
                this.form.reEndTime = dateString
                // console.log(dateString)
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
                // console.log('lll');
                if (WordCloud){
                    const myChart = this.$echarts.init(WordCloud)
                    // console.log('5555');
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
                // console.log('6666');
                // chart.setOption(option);
            },
            handleClose(done) {
                this.dialogVisible=false
            },
            // tab切换
            handleClick() {
                this.finduserImage()
                console.log(this.activeName)
                // this.$router.go(0)
                // this.reload()
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
                // let j = 0
                let j =this.worddata.length
                for(let i in row){
                    // // console.log(i)
                    if (i!=='buyerNick'){
                        j--
                        console.log(row[i])
                        this.worddata[j].name={ }
                        this.worddata[j].name=row[i]

                    }

                }
            },
            //省份选择
            handleChange(value) {
                // console.log(`selected ${value}`);
            },
            handleBlur() {
                // console.log('blur');
            },
            handleFocus() {
                // console.log('focus');
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },

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