<!--客户画像-->
<template>
    <div>
        <a-card>
            <div style="font-size: large;">
                重要客户画像
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
                                <span style="float: right; margin-top: 3px;">
                                     <el-button type="success" plain style="margin-right: 10px;margin-bottom: 6px" size="small">导出数据</el-button>
                                   <a-button type="primary" @click="submitList" style="margin-bottom: 6px">查询</a-button>
                                   <a-button style="margin-left: 8px;margin-bottom: 6px" @click="resetInput">重置</a-button>
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
                        <el-tag >用户网名：{{this.imageRow.buyerNick}}</el-tag>
                        <el-tag >姓名：{{this.imageRow.customerName}}</el-tag>
                        <el-tag >电话：{{this.imageRow.mobile}}</el-tag>
                        <div  ref="WordCloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>
                        <span slot="footer" class="dialog-footer">
                           <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                           <el-button type="primary" @click="dialogVisible = false">返回</el-button>
                           </span>
                    </el-dialog>
                    <el-table :data="tableData" v-loading="loading"
                              element-loading-text="拼命加载中"
                              element-loading-spinner="el-icon-loading"
                              element-loading-background="rgba(255, 255, 255, 0.8)"
                              height="450" border style="..." @row-click="handle"  >
                        <!--<el-table-column  fixed="" type="expand">-->
                            <!--<template slot-scope="props">-->
                                <!--&lt;!&ndash;<el-form label-position="left" inline class="demo-table-expand">&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;<el-form-item label="客户网名">&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;<span>{{ props.row.buyerNick}}</span>&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;<div id="mywordcloud"  :style="{width: '100%', height: '200px'}" :data="worddata"></div>&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<a-row>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<a-col :md="4" :sm="24">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="类别维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.categoryDimension }}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="销量维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.salesDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="时间维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.timeDimension }}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="价值维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.valueDimension }}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="地区维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.regionalDimension }}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="平台维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.platformDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="复购维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.repurchaseDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="信誉维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.reputationDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="促销维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.promotionDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<el-form-item label="周期维度:">&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<span>{{ props.row.cycleDimension}}</span>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<a-col  :md="4" :sm="24">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<a-col  :md="4" :sm="24">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
                                        <!--&lt;!&ndash;</a-row>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
                            <!--</template>-->
                        <!--</el-table-column>-->
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
                        name: "1",
                        value: 8500
                    },
                    {
                        name: "2",
                        value: 6008
                    },{
                        name: "3",
                        value: 8386
                    },
                    {
                        name: "4",
                        value: 7500
                    },
                    {
                        name: "5",
                        value: 7900
                    },
                    {
                        name: "6",
                        value: 8500
                    },
                    {
                        name: "7",
                        value:7000
                    },
                    {
                        name: "8",
                        value: 6800
                    },
                    {
                        name: "9",
                        value: 7850
                    },
                    {
                        name: "10",
                        value: 7380
                    },{
                        name: "11",
                        value: 6380
                    },{
                        name: "12",
                        value: 7220
                    },{
                        name: "13",
                        value: 7211
                    },{
                        name: "14",
                        value: 8380
                    },{
                        name: "15",
                        value: 8380
                    },{
                        name: "16",
                        value: 6780
                    },{
                        name: "17",
                        value: 5230
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
            axios.get('backend/portrait/customerPortrait/findAllCusPortraitIm/1/10', {headers:{
                    token: tokenStr
                }}).then(res => {
                this.loading=false
                // console.log(res.data.data)
                // console.log("看看数据")
                that.tableData = res.data.data.list
                that.total=res.data.data.total
            }).catch()
        },
        mounted(){
            this.initChart();
            // this.getuserImage();
            this.getLabelVal();
        },
        methods: {
            finduserImage(){
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                axios.get('backend/portrait/customerPortrait/findAllCusPortraitIm/1/10', {headers:{
                        token: tokenStr
                    }}).then(res => {
                    this.loading=false
                    // console.log(res.data.data)
                    console.log("看看数据")
                    that.tableData = res.data.data.list
                    that.total=res.data.data.total
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

            // 分页ok,首页是0，标签是1，条件是2
            handleCurrentChange(currentPage){
                // console.log(currentPage)
                this.loading=true
                this.queryInfo.pageNum = currentPage
                const tokenStr = window.sessionStorage.getItem('token')
                const that = this
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortraitIm/'+currentPage+'/'
                        +this.queryInfo.pageSize, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // console.log(res.data.data)
                        that.tableData = res.data.data.list
                        that.total=res.data.data.total
                        this.loading=false
                        console.log("总接口当前页码")
                    }).catch()
                }
                else if(this.flag===1){
                    this.submitList()
                }
                else{
                    this.submitButton()
                }
            },
            handleSizeChange(pageSize) {
                // console.log("页面数据量")
                // console.log(pageSize)
                this.queryInfo.pageSize = pageSize;
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findAllCusPortraitIm/'
                        +this.queryInfo.pageNum+'/'+pageSize, {headers:{
                            token: tokenStr
                        }}).then(res => {
                        // // console.log(res.data.data)
                        that.tableData = res.data.data.list
                        that.total=res.data.data.total
                        console.log("总接口页面数据")
                    }).catch()
                }
                else if(this.flag===1){
                    this.submitList()
                }
                else if(this.flag===2){
                    this.submitButton()
                }
            },
            // 标签查询
            submitList() {
                const vm = this;
                this.loading=true
                const that = this
                const midlist = {}
                const list = this.formInline
                // console.log(list.categoryDimension)
                for(let i in list){
                    let value = list[i]
                    if (value === "") {
                        // console.log(i,"空值")
                    } else {
                        midlist[i] = value
                    }
                }
                // console.log(midlist)
                // console.log("提交表单")
                const tokenStr = window.sessionStorage.getItem('token')
                if(that.flag===0){
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByLabelIm/1/10', {
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
                else if(this.flag===1){
                    console.log("标签查询分页")
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByLabelIm/'+
                        this.queryInfo.pageNum+'/'+this.queryInfo.pageSize, {
                        params: midlist,
                        headers: {token:tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        // console.log(res.data)
                        that.tableData = res.data.data.list;
                        that.total=res.data.data.total;
                        this.loading=false
                    }).catch()

                }
            },
            //条件查询
            submitButton() {
                const vm = this
                this.loading=true
                const that = this
                const tokenStr = window.sessionStorage.getItem('token')
                const midlist = {}
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
                // console.log(midlist)
                // console.log("提交表单")
                if(this.flag===0){
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByConditionIm/1/10', {
                        params:midlist,
                        headers: {token: tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        // console.log(res.data)
                        // 去掉缓存，不对tableData重复赋值不会出现增量列表问题
                        // console.log("拿到查询数据")
                        this.flag=2
                        this.loading=false
                        that.tableData = res.data.data.list;
                        this.total=res.data.data.total
                    }).catch()
                }
                else if(this.flag===2){
                    axios.get('backend/portrait/customerPortrait/findCusPortraitByConditionIm/'
                        +this.queryInfo.pageNum+'/'+this.queryInfo.pageSize, {
                        params:midlist,
                        headers: {token: tokenStr},
                        tokenBackend: tokenStr
                    }).then( res => {
                        that.tableData = res.data.data.list;
                        that.total = res.data.data.total
                        // console.log(that.tableData )
                        console.log("拿到条件查询分页数据")
                        // that.total = res.data.data.length;
                        // // console.log(res.data.data.length)
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
                axios.get('backend/portrait/customerPortrait/findCusPortraitByConditionIm/1/10',
                    {headers:{token: tokenStr}, tokenBackend: tokenStr}).then( res => {
                    // // console.log(res.data)
                    that.tableData = res.data.data.list;
                    that.total=res.data.data.total
                    // that.total=res.data.length;
                }).catch()
            },
            // 重置
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
                axios.get('backend/portrait/customerPortrait/findAllCusPortraitIm/1/10','',
                    {headers:{token: tokenStr},tokenBackend: tokenStr}).then( res => {
                    // // console.log(res.data)
                    that.tableData = res.data.data.list;
                    that.total=res.data.data.total
                    // that.total=res.data.length;
                }).catch()
            },
            reLoad(){
                // location.reload()
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
            // table
            handleClick(row) {
                // console.log("绑定查询按键");
                // console.log(row);
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
                // console.log("这是row")
                // console.log(row)
                const that = this
                that.imageRow =row
                this.dialogVisible=true
                this.$nextTick(()=>{
                    this.initChart()
                })
                let j = 0
                for(let i in row){
                    // // console.log(i)
                    if (i!=='buyerNick'){
                        // console.log(row[i])
                        this.worddata[j].name=row[i]
                        j++
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