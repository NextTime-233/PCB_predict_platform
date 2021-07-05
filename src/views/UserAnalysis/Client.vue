<!--客户档案-->
<template>
    <div>
        <a-card>
            <div class="client-list-display">
                <div :class="advanced ? 'search' : null" style="background-color: lightgrey; margin: 10px 0">
                    <a-form id="cForm" layout="horizontal" :model="clientForm" @submit.native.prevent>
                        <div :class="advanced ? null: 'fold'" style="padding: 15px 0 0 30px;">
                            <a-row :gutter="8" >
                                <a-col :span="6">
                                    <a-form-item label="客户姓名" :labelCol="{span: 8}" :wrapperCol="{span: 12}">
                                        <a-input placeholder="请输入" size="small" v-model="clientForm.customerName"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                  <a-form-item label="客户电话" :labelCol="{span: 8}" :wrapperCol="{span: 12}">
                                    <a-input placeholder="请输入" size="small" v-model="clientForm.customerName"/>
                                  </a-form-item>
                                </a-col>
                                <a-col :span="12" >
                                    <a-form-item label="购买总金额" :labelCol="{span:6}" :wrapperCol="{span: 18}">
<!--                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseAmount"/>-->
                                      <a-input-group compact size="small">
<!--                                        <a-select default-value="1">-->
<!--                                          <a-select-option value="1" >-->
<!--                                            区间内-->
<!--                                          </a-select-option>-->
<!--                                          <a-select-option value="2">-->
<!--                                            区间外-->
<!--                                          </a-select-option>-->
<!--                                        </a-select>-->
                                        <a-input style=" width: 80px; text-align: center"  v-model="clientForm.TotalPurchaseAmountLow" placeholder="Minimum" />
                                        <a-input
                                            style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                            placeholder="~"
                                            disabled
                                        />
                                        <a-input style="width: 80px; text-align: center; border-left: 0" v-model="clientForm.TotalPurchaseAmountHigh" placeholder="Maximum" />
                                      </a-input-group>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row  v-if="advanced":gutter="8">
                              <a-col :span="12" >
                                <a-form-item label="购买总量" :labelCol="{span:4}" :wrapperCol="{span: 18}">
                                  <!--                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.TotalPurchaseNum"/>-->
                                  <a-input-group  compact size="small">
<!--                                    <a-select default-value="1">-->
<!--                                      <a-select-option value="1">-->
<!--                                        区间内-->
<!--                                      </a-select-option>-->
<!--                                      <a-select-option value="2">-->
<!--                                        区间外-->
<!--                                      </a-select-option>-->
<!--                                    </a-select>-->
                                    <a-input style=" width: 80px; text-align: center" v-model="clientForm.TotalPurchaseNumLow" placeholder="Minimum" />
                                    <a-input
                                        style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                        placeholder="~"
                                        disabled
                                    />
                                    <a-input style="width: 80px; text-align: center; border-left: 0" v-model="clientForm.TotalPurchaseNumHigh" placeholder="Maximum" />
                                  </a-input-group>
                                </a-form-item>
                              </a-col>

                            <a-col :md="6" >
                              <a-form-item label="省份" :labelCol="{span:6}" :wrapperCol="{span: 12,offset: 1}">
                                <a-select v-model="clientForm.province" size="small" @change="handleProvinceChange">
                                  <a-select-option v-for="province in provinceData" :key="province">
                                    {{ province }}
                                  </a-select-option>
                                </a-select>
                              </a-form-item>
                              <!--                                    <a-form-item label="省份" :labelCol="{span: 8}" :wrapperCol="{span: 12, offset: 1}">-->
                              <!--                                        <a-input style="width: 100%" placeholder="请输入" size="small" v-model="clientForm.province"/>-->
                              <!--                                    </a-form-item>-->
                            </a-col>
                          <a-col :span="6" >
                              <a-form-item label="城市" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">
                                  <a-select v-model="secondCity" size="small"  @change="handleCityChange">
                                      <a-select-option v-for="city in cities" :key="city">
                                          {{ city }}
                                      </a-select-option>
                                  </a-select>
                              </a-form-item>
                                  <!--                                    <a-form-item label="城市" :labelCol="{span: 7}" :wrapperCol="{span: 12, offset: 1}">-->
<!--                                        <a-input placeholder="请输入" size="small" v-model="clientForm.city"/>-->
<!--                                    </a-form-item>-->
                          </a-col>`
                            </a-row>
                          <a-row v-if="advanced"  :gutter="8">
                                  <a-col :md="6" >
                                      <a-form-item
                                              label="客户登记时间"
                                              :labelCol="{span: 7}"
                                              :wrapperCol="{span: 15, offset: 1}"
                                      >
                                          <a-range-picker @change="registerOnChange" size="small" :value="createValueR">
                                              <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                          </a-range-picker>
                                      </a-form-item>
                                  </a-col>
                                  <a-col :md="7" >
                                      <a-form-item
                                              label="付款时间"
                                              :labelCol="{span: 7}"
                                              :wrapperCol="{span: 15, offset: 1}"
                                      >
                                          <a-range-picker @change="shoppingOnChange" size="small" :value="createValueP">
                                              <a-icon type="calendar" theme="twoTone" slot="suffixIcon" />
                                          </a-range-picker>
                                      </a-form-item>
                                  </a-col>
                              </a-row>
                        </div>
                        <span :style="advanced?'float: right; padding-right: 30px':'float: right; margin-top: 18px; padding-right: 30px'">
                        <a-button type="primary" @click="submitList">查询</a-button>
                        <a-button style="margin-left: 8px" type="reset" @click="resetInput">重置</a-button>
                    </span>
                        <br>
                        <a @click="toggleAdvanced" style="margin-left: 50%">
                            <a-icon :type="advanced ? 'up' : 'down'" />
                        </a>
                    </a-form>
                </div>
                <el-button type="success" plain size="small" style="margin-right: 10px">导出数据</el-button>
                <el-tabs v-model="activeName" type="card" @tab-click="showClient" style="margin-top: 10px">
                    <el-tab-pane label="重要客户" name="first">
                        <el-table
                                :data="importantData"
                                border
                                v-loading="loading"
                                style="width: 150%">
                            <el-table-column
                                    fixed
                                    prop="customerType"
                                    label="客户类型"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="customerNo"
                                    label="客户编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="buyerNick"
                                    label="客户网名"
                                    width="170">
                            </el-table-column>
                            <el-table-column
                                    prop="gender"
                                    label="性别"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="country"
                                    label="国家"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="province"
                                    label="省份"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="city"
                                    label="市区"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="district"
                                    label="区县"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="telno"
                                    label="固话"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="mobile"
                                    label="手机"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    label="电子邮件"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="qq"
                                    label="QQ"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="wangwang"
                                    label="旺旺"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="birthday"
                                    label="生日"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPurchaseAmount"
                                    label="购买总金额"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPurchaseNum"
                                    label="购买总次数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="lastPurchaseTime"
                                    label="上次购买时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="lable"
                                    label="用户标签"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="bwlist"
                                    label="黑/白名单"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="stopped"
                                    label="停用"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="lastVisDays"
                                    label="距离上次回访天数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="modifiedTime"
                                    label="修正时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="registrationTime"
                                    label="登记时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="afterBuyingRate"
                                    label="复购率"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="drain_cycle"
                                    label="流失比率"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="loadTime"
                                    label="载入时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看历史订单</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="普通客户" name="second">
                        <el-table
                                :data="tableData"
                                border
                                v-loading="loading"
                                style="width: 150%">
                            <el-table-column
                                    fixed
                                    prop="customerType"
                                    label="客户类型"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="customerNo"
                                    label="客户编号"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="buyerNick"
                                    label="客户网名"
                                    width="170">
                            </el-table-column>
                            <el-table-column
                                    prop="gender"
                                    label="性别"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="country"
                                    label="国家"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="province"
                                    label="省份"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="city"
                                    label="市区"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="district"
                                    label="区县"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="zip"
                                    label="邮编"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="telno"
                                    label="固话"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="mobile"
                                    label="手机"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    label="电子邮件"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="qq"
                                    label="QQ"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="wangwang"
                                    label="旺旺"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="birthday"
                                    label="生日"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPurchaseAmount"
                                    label="购买总金额"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPurchaseNum"
                                    label="购买总次数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="lastPurchaseTime"
                                    label="上次购买时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="lable"
                                    label="用户标签"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="bwlist"
                                    label="黑/白名单"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="stopped"
                                    label="停用"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="lastVisDays"
                                    label="距离上次回访天数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="modifiedTime"
                                    label="修正时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="registrationTime"
                                    label="登记时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="afterBuyingRate"
                                    label="复购率"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="drain_cycle"
                                    label="流失比率"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="loadTime"
                                    label="载入时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看历史订单</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <span>共{{total}}条数据</span>
                <div class="page-roll">
                    <a-pagination
                            v-model="current"
                            :page-size-options="pageSizeOptions"
                            :total="total"
                            show-size-changer
                            show-quick-jumper
                            :page-size="pageSize"
                            @showSizeChange="onShowSizeChange"
                            @change="currentPage"
                    >
                        <template slot="buildOptionText" slot-scope="props">
                            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                            <span v-if="props.value === '50'">全部</span>
                        </template>
                    </a-pagination>
                </div>
            </div>
            <div class="detail-display">
                <div>
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="历史订单">
                            <span v-if="historyBuyer">您正在查看用户---{{historyBuyer}}---的历史订单</span>
                            </br>
                            <el-table
                                    :data="historyData"
                                    style="width: 100%"
                                    height="270"
                                    v-loading="loading0">
                                    <el-table-column
                                            prop="tradeNo"
                                            label="订单编号"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="platformType"
                                            label="平台类型"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="shopName"
                                            label="店铺名称"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="warehouseName"
                                            label="仓库名称"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="warehouseType"
                                            label="仓库类型"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tradeTime"
                                            label="下单时间"
                                            width="160">
                                    </el-table-column>
                                    <el-table-column
                                            prop="srcTids"
                                            label="原始单号"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tradeStatus"
                                            label="订单状态"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="consignStatus"
                                            label="发货状态"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="platformConsignStatus"
                                            label="平台发货状态"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tradeType"
                                            label="订单类型"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="deliveryTerm"
                                            label="发货条件"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="freezeReason"
                                            label="冻结原因"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="refundStatus"
                                            label="退款状态"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="fenxiaoType"
                                            label="分销类别"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="fenxiaoNick"
                                            label="分销商名称"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="payTime"
                                            label="付款时间"
                                            width="160">
                                    </el-table-column>
                                    <el-table-column
                                            prop="payAccount"
                                            label="买家付款账号"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="buyerNick"
                                            label="客户网名"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverName"
                                            label="收件人"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverArea"
                                            label="省市县"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverAddress"
                                            label="地址"
                                            width="300">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverMobile"
                                            label="手机"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverTelno"
                                            label="电话"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverZip"
                                            label="邮编"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverRing"
                                            label="区域"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="receiverDtb"
                                            label="大头笔"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="toDeliverTime"
                                            label="派送时间"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="logisticsName"
                                            label="物流公司"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="logisticsNo"
                                            label="物流单号"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column prop="buyerMessage" label="买家留言" width="100" />
                                    <el-table-column prop="csRemark" label="客服备注" width="100" />
                                    <el-table-column prop="remarkFlag" label="标旗" width="100" />
                                    <el-table-column prop="printRemark" label="打印备注" width="100" />
                                    <el-table-column prop="goodsTypeCount" label="货品种类数" width="100" />
                                    <el-table-column prop="goodsCount" label="货品总数" width="100" />
                                    <el-table-column prop="goodsAmount" label="货品总额" width="100" />
                                    <el-table-column prop="postAmount" label="邮资" width="100" />
                                    <el-table-column prop="otherAmount" label="其它费用" width="100" />
                                    <el-table-column prop="discount" label="优惠" width="100" />
                                    <el-table-column prop="receivable" label="应收金额" width="100" />
                                    <el-table-column prop="outputTax" label="销项税" width="100" />
                                    <el-table-column prop="dapAmount" label="款到发货金额" width="100" />
                                    <el-table-column prop="codAmount" label="COD金额" width="100" />
                                    <el-table-column prop="extCodFee" label="买家COD费用" width="100" />
                                    <el-table-column prop="commission" label="佣金" width="100" />
                                    <el-table-column prop="goodsCost" label="货品预估成本" width="100" />
                                    <el-table-column prop="postCost" label="预估邮资成本" width="100" />
                                    <el-table-column prop="paid" label="已付金额" width="100" />
                                    <el-table-column prop="weight" label="预估重量" width="100" />
                                    <el-table-column prop="profit" label="预估毛利" width="100" />
                                    <el-table-column prop="invoiceType" label="发票类型" width="100" />
                                    <el-table-column prop="invoiceTitle" label="发票抬头" width="100" />
                                    <el-table-column prop="invoiceContent" label="发票内容" width="100" />
                                    <el-table-column prop="salesman" label="业务员" width="100" />
                                    <el-table-column prop="checkerName" label="审核人" width="100" />
                                    <el-table-column prop="fchecker" label="财审人" width="100" />
                                    <el-table-column prop="checkouter" label="签出人" width="100" />
                                    <el-table-column prop="stockoutNo" label="出库单号" width="100" />
                                    <el-table-column prop="flagName" label="标记名称" width="100" />
                                    <el-table-column prop="disposeDays" label="处理天数" width="100" />
                                    <el-table-column prop="tradeFrom" label="订单来源" width="100" />
                                    <el-table-column prop="singleSpecNo" label="商家编码" width="100" />
                                    <el-table-column prop="rawGoodsCount" label="原始货品种类数" width="100" />
                                    <el-table-column prop="rawGoodsTypeCount" label="原始货品数量" width="100" />
                                    <el-table-column prop="submitTime" label="递交时间" width="160" />
                                    <el-table-column prop="currency" label="币种" width="100" />
                                    <el-table-column prop="splitPackageNum" label="线上包裹拆分数" width="100" />
                                    <el-table-column prop="activationTime" label="激活时间" width="160" />
                                    <el-table-column prop="Invoiced" label="已开具发票" width="100" />
                                    <el-table-column prop="volume" label="体积" width="100" />
                                    <el-table-column prop="idCard" label="证件号码" width="100" />
                                    <el-table-column prop="loadTime" label="加载时间" width="160" />
                                </el-table>
                            <span>共{{total0}}条数据</span>
                            <div class="page-roll">
                                <a-pagination
                                        v-model="current0"
                                        :total="total0"
                                        :page-size="pageSize0"
                                        @showSizeChange="sizeChange"
                                        @change="currentChange"
                                >
                                    <template slot="buildOptionText" slot-scope="props">
                                        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                                        <span v-if="props.value === '50'">全部</span>
                                    </template>
                                </a-pagination>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
    const provinceData = ['河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省',
        '河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区',
        '广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔自治区','北京市','天津市','上海市','重庆市','香港特别行政区',
        '澳门特别行政区'];
    const cityData = {
        河北省: ['','石家庄市','邯郸市','邢台市',' 保定市','张家口市',' 承德市',' 唐山市',' 秦皇岛市','沧州市','衡水市','廊坊市'],
        山西省: ['','大同市','朔州市','忻州市','阳泉市','吕梁市','晋中市','长治市','晋城市','临汾市','运城市'],
        辽宁省: ['','沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],
        吉林省: ['','长春市','吉林市','四平市','通化市','白山市','辽源市','白城市','松原市'],
        黑龙江省: ['','哈尔滨市','齐齐哈尔市','佳木斯市','鹤岗市','大庆市','鸡西市','双鸭山市','伊春市','牡丹江市','黑河市','七台河市','绥化市和大兴安岭地区'],
        江苏省: ['','南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','扬州市','镇江市','泰州市','宿迁市'],
        浙江省: ['','舟山市','杭州市','嘉兴市','温州市','宁波市','绍兴市','湖州市','丽水市','台州市','金华市','衢州市'],
        安徽省: ['','宿州市','淮北市','亳州市','阜阳市','蚌埠市','淮南市','滁州市','六安市','马鞍山市','安庆市','芜湖市','铜陵市','宣城市','池州市','黄山市'],
        福建省: ['','福州市','莆田市','泉州市','厦门市','漳州市','龙岩市','三明市','南平市','宁德市'],
        江西省: ['','南昌市','九江市','鹰潭市','上饶市','新余市','景德镇市','宜春市','萍乡市','吉安市','抚州市','赣州市'],
        山东省: ['','济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','滨州市','德州市','聊城市','临沂市','菏泽市','莱芜市'],
        河南省: ['','郑州市','开封市','洛阳市','平顶山市','焦作市','鹤壁市','新乡市','安阳市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市','济源市'],
        湖北省: ['','武汉市','黄石市','十堰市','宜昌市','襄阳市','鄂州市','荆门市','孝感市','荆州市','黄冈市','咸宁市','随州市'],
        湖南省: ['','长沙市','株洲市','湘潭市','衡阳市','邵阳市','岳阳市','常德市','张家界市','益阳市','郴州市','永州市','怀化市','娄底市','湘西土家族自治州'],
        广东省: ['','珠海市','汕头市','佛山市','韶关市','湛江市','肇庆市','江门市','茂名市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'],
        海南省: ['','海口市','三亚市','三沙市','儋州市'],
        四川省: ['','成都市','绵阳市','自贡市','攀枝花市','泸州市','德阳市','广元市','遂宁市','内江市','乐山市','资阳市','宜宾市','南充市','达州市','雅安市','广安市','巴中市','眉山市'],
        贵州省: ['','贵阳市','六盘水市','遵义市','安顺市','铜仁市','毕节市'],
        云南省: ['','昆明市','曲靖市','玉溪市','昭通市','保山市','丽江市','普洱市','临沧市'],
        陕西省: ['','西安市','渭南市','咸阳市','汉中市','铜川市','宝鸡市','安康市','榆林市','商洛市','延安市'],
        甘肃省: ['','兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','酒泉市','平凉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
        青海省: ['','西宁市','海东市','海西蒙古族藏族自治州','海南藏族自治州','海北藏族自治州','黄南藏族自治州','果洛藏族自治州和玉树藏族自治州'],
        台湾省: ['','台北市','新北市','台中市','高雄市','台南市'],
        内蒙古自治区: ['','呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市'],
        广西壮族自治区: ['','南宁市','崇左市','柳州市','来宾市','桂林市','梧州市','贺州市','玉林市','贵港市','百色市','钦州市','河池市','北海市','防城港市'],
        西藏自治区: ['','拉萨市','日喀则市','昌都市','林芝市','山南市','那曲市'],
        宁夏回族自治区: ['','银川市','石嘴山市','吴忠市','固原市','中卫市'],
        新疆维吾尔自治区: ['','乌鲁木齐市','吐鲁番市','哈密市','克拉玛依市'],
        北京市: [],
        天津市: [],
        上海市: [],
        重庆市: [],
        香港特别行政区: [],
        澳门特别行政区: [],
    };
    export default {
        name: "Client",
        data() {
            return {
                // 数据
                tableData: [],
                importantData: [],
                loading: true,
                loading0: false,
                activeName: 'second',
                // 搜索栏
                clientType: '1',  // 客户类型，默认为普通客户1
                clientForm: {
                    customerName:'',
                    TotalPurchaseAmount:'',
                    TotalPurchaseNum:'',
                    TotalPurchaseAmountLow:'',
                    TotalPurchaseAmountHigh:'',
                    TotalPurchaseNumLow:'',
                    TotalPurchaseNumHigh:'',
                    province:'',
                    city:'',
                    LastPurchaseTimeDateStart:'',
                    LastPurchaseTimeDateEnd:'',
                    registrationTimeDateStart:'',
                    registrationTimeDateEnd:'',
                    PayDateStart:'',
                    PayDateEnd:'',
                },
                advanced: false,
                // 日期范围
                createValueB:[],
                createValueP:[],
                createValueS:[],
                createValueR:[],
                // limlin 2020.10.05 省份列表
                provinceData,
                cityData:[],
                cities: cityData[provinceData[0]],
                secondCity: cityData[provinceData[0]][0],
                // 类型
                cType: "客户类型",
                rowData:{},
                // 分页
                pageSizeOptions: ['5', '10', '15', '20', '25'],
                current: 1,
                pageSize: 5,
                total: 0,
                amount: 0,
                flag: 0,  // 普通客户分页标记，0为总表分页，1为查询分页
                current0: 1,
                pageSize0: 5,
                total0: 0,
                amount0: 0,
                flag0: 0,  // 重要客户分页标记，0为总表分页，1为查询分页
                //  token
                tokenStr: '',
                // 历史订单
                historyData:[],
                // 历史订单用户名缓存
                historyBuyer:''
            };
        },
        created() {
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            that.tokenStr = tokenStr
            // console.log(that.tokenStr)
          axios.get('backend/customer/listCustomers/1/5', {headers:{
                token: tokenStr
            }}).then( res => {
              this.tableData = res.data.data
              this.loading=false
          }).catch()
        },
        mounted(){
            const that = this
            const tokenStr = window.sessionStorage.getItem('token')
            axios.get('backend/customer/countCustomer',{headers:{
                    token : tokenStr}}).then( res => {
                that.total = res.data.data  // 普通用户表
                that.amount = res.data.data
            }).catch()

        },
        methods: {
            // 客户类型
            showClient(tab, event) {
                const that = this
                that.current = 1
                if (tab.index === '0') {
                    that.clientType = '0'
                    that.historyData = []
                    axios.get('backend/customer/listImpCustomers/1/5', {
                        headers: {
                            token: this.tokenStr
                        }
                    }).then(res => {
                        that.importantData = res.data.data
                        that.loading = false
                    }).catch()
                    axios.get('backend/customer/countImpCustomers', {
                        headers: {
                            token: that.tokenStr
                        }
                    }).then(res => {
                        that.total = res.data.data
                        that.amount = that.total
                    }).catch()
                }
                if (tab.index === '1') {
                    that.clientType = '1'
                    that.historyData = []
                    axios.get('backend/customer/listCustomers/1/5', {
                        headers: {
                            token: that.tokenStr
                        }
                    }).then(res => {
                        that.tableData = res.data.data
                        that.loading = false
                    }).catch()
                    axios.get('backend/customer/countCustomer', {
                        headers: {
                            token: that.tokenStr
                        }
                    }).then(res => {
                        that.total = res.data.data
                        that.amount = res.data.data
                    }).catch()
                }
            },
            // 日期选择框
            shoppingOnChange(date, dateString) {
                this.createValueS = date
                this.clientForm.LastPurchaseTimeDateStart = dateString[0]
                this.clientForm.LastPurchaseTimeDateEnd = dateString[1]
            },
            registerOnChange(date, dateString) {
                this.createValueR = date;
                this.clientForm.registrationTimeDateStart = dateString[0]
                this.clientForm.registrationTimeDateEnd = dateString[1]
            },
            // 下拉搜索
            handleProvinceChange(value) {
                console.log(value)
                this.clientForm.province = value
                this.cities = cityData[value];
                this.secondCity = cityData[value][0];
            },
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            submitList() {
                const that = this
                const list = that.clientForm
                this.loading = true
                for (let i in list) {
                    if (list[i]) {
                        if (that.clientType === '1') {
                            console.log("普通客户查询" + that.clientType)
                            axios.get('backend/customer/getCustomers/1/5', {
                                params: {
                                    customerName: list.customerName,
                                    TotalPurchaseAmount: list.TotalPurchaseAmount,
                                    TotalPurchaseNum: list.TotalPurchaseNum,
                                    TotalPurchaseAmountLow:list.TotalPurchaseAmountLow,
                                    TotalPurchaseAmountHigh:list.TotalPurchaseAmountHigh,
                                    TotalPurchaseNumLow:list.TotalPurchaseNumLow,
                                    TotalPurchaseNumHigh:list.TotalPurchaseNumHigh,
                                    province: list.province,
                                    city: that.secondCity,
                                    LastPurchaseTimeDateStart: list.LastPurchaseTimeDateStart,
                                    LastPurchaseTimeDateEnd: list.LastPurchaseTimeDateEnd,
                                    PayDateStart: list.PayDateStart,
                                    PayDateEnd: list.PayDateEnd,
                                    registrationTimeDateStart: list.registrationTimeDateStart,
                                    registrationTimeDateEnd: list.registrationTimeDateEnd,
                                },
                                headers: {token: that.tokenStr},
                                tokenBackend: that.tokenStr
                            }).then(res => {
                                if (res.data.code === 3) {
                                    this.$message.error('未能查找到该客户的相关信息！！')
                                } else if (res.data.code === 0) {
                                    this.$message({
                                        message: '查询客户信息成功！',
                                        type: 'success'
                                    });
                                    that.tableData = res.data.data.list
                                    that.loading = false
                                    that.total = res.data.data.total
                                    that.flag = 1
                                    that.current = 1
                                }
                            }).catch()
                            break
                        } else {
                            console.log("重要客户查询" + that.clientType)
                            axios.get('backend/customer/selectImpCustomersFromCustomerIm/1/5', {
                                params: {
                                    customerName: list.customerName,
                                    TotalPurchaseAmount: list.TotalPurchaseAmount,
                                    TotalPurchaseNum: list.TotalPurchaseNum,
                                    TotalPurchaseAmountLow:list.TotalPurchaseAmountLow,
                                    TotalPurchaseAmountHigh:list.TotalPurchaseAmountHigh,
                                    TotalPurchaseNumLow:list.TotalPurchaseNumLow,
                                    TotalPurchaseNumHigh:list.TotalPurchaseNumHigh,
                                    province: list.province,
                                    city: that.secondCity,
                                    LastPurchaseTimeDateStart: list.LastPurchaseTimeDateStart,
                                    LastPurchaseTimeDateEnd: list.LastPurchaseTimeDateEnd,
                                    PayDateStart: list.PayDateStart,
                                    PayDateEnd: list.PayDateEnd,
                                    registrationTimeDateStart: list.registrationTimeDateStart,
                                    registrationTimeDateEnd: list.registrationTimeDateEnd,
                                },
                                headers: {token: that.tokenStr},
                                tokenBackend: that.tokenStr
                            }).then(res => {
                                if (res.data.code === 3) {
                                    this.$message.error('未能查找到该客户的相关信息！！')
                                    that.loading = false
                                } else if (res.data.code === 0) {
                                    this.$message({
                                        message: '查询客户信息成功！',
                                        type: 'success'
                                    });
                                    that.importantData = res.data.data.list
                                    that.loading = false
                                    that.total = res.data.total
                                    that.flag0 = 1
                                    that.current = 1
                                }
                            }).catch()
                            break
                        }
                    } else if (i === 'LastPurchaseTimeDateEnd' && list[i] === '') {
                        this.$message.error('请输入查询信息！！')
                        this.loading = false
                    } else {
                        continue
                    }
                }
            },
            resetInput() {
                const that = this
                that.loading = true
                document.getElementById("cForm").reset()
                that.clientForm = {
                    customerName: '',
                    TotalPurchaseAmount: '',
                    TotalPurchaseNum: '',
                    TotalPurchaseAmountLow:'',
                    TotalPurchaseAmountHigh:'',
                    TotalPurchaseNumLow:'',
                    TotalPurchaseNumHigh:'',
                    province: '',
                    city: '',
                    LastPurchaseTimeDateStart: '',
                    LastPurchaseTimeDateEnd: '',
                    registrationTimeDateStart: '',
                    registrationTimeDateEnd: '',
                    PayDateStart: '',
                    PayDateEnd: '',
                }
                that.createValueB = []
                that.createValueP = []
                that.createValueR = []
                that.createValueS = []
                that.secondCity = ''
                axios.get('backend/customer/listCustomers/1/5', {
                    headers: {
                        token: this.tokenStr
                    }
                }).then(res => {
                    // // console.log(res.data)
                    that.tableData = res.data.data
                    this.loading = false
                    that.total = that.amount
                    that.flag = 0
                }).catch()
                this.$message('搜索表单已重置！');
                that.showClient()
            },
            // el表格
            handleClick(row) {
                const that = this
                that.loading0 = true
                // 查询
                axios.get('backend/order/OrderHistory/1/5', {
                    params: {
                        buyerNick: row.buyerNick,
                    },
                    headers: {token: that.tokenStr},
                }).then(res => {
                    if (res.data.data === null) {
                        this.$message.error('未能查找到用户' + row.buyerNick + "的历史订单！")
                        that.loading0 = false
                    } else {
                        this.$message({
                            message: "查找用户" + row.buyerNick + "的历史订单成功！！",
                            type: 'success'
                        });
                        that.historyData = res.data.data.list
                        that.historyBuyer = row.buyerNick
                        that.total0 = res.data.data.total
                    }
                    that.loading0 = false
                }).catch()
            },
            // 分页
            currentPage(currentPage, size) {
                const that = this
                that.loading = true
                if (that.clientType === '0') {
                    if (that.flag0 === 0) {
                        console.log("重要客户总表分页" + that.clientType)
                        axios.get('backend/customer/listImpCustomers/' + currentPage + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.importantData = res.data.data
                            this.loading = false
                        }).catch()
                    } else {
                        console.log("重要客户查询翻页")
                        axios.get('backend/customer/selectImpCustomersFromCustomerIm/' + currentPage + '/' + size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                TotalPurchaseAmountLow:that.clientForm.TotalPurchaseAmountLow,
                                TotalPurchaseAmountHigh:that.clientForm.TotalPurchaseAmountHigh,
                                TotalPurchaseNumLow:that.clientForm.TotalPurchaseNumLow,
                                TotalPurchaseNumHigh:that.clientForm.TotalPurchaseNumHigh,
                                province: that.clientForm.province,
                                city: that.secondCity,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: this.tokenStr},
                            tokenBackend: this.tokenStr
                        }).then(res => {
                            if (res.data.code === 0) {
                                that.tableData = res.data.data.list
                                this.loading = false
                            }
                        }).catch()
                    }
                } else {
                    if (that.flag === 0) {
                        console.log("普通客户总表分页" + that.clientType)
                        axios.get('backend/customer/listCustomers/' + currentPage + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.tableData = res.data.data
                            this.loading = false
                        }).catch()
                    } else {
                        console.log("普通客户查询分页" + that.clientType)
                        axios.get('backend/customer/getCustomers/' + currentPage + '/' + size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province: that.clientForm.province,
                                city: that.secondCity,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: that.tokenStr},
                            tokenBackend: that.tokenStr
                        }).then(res => {
                            if (res.data.code === 0) {
                                that.tableData = res.data.data.list
                                that.loading = false
                            }
                        }).catch()
                    }
                }
            },
            onShowSizeChange(current, size) {
                this.pageSize = size
                const that = this
                that.loading = true
                if (that.clientType === '0') {
                    if (that.flag0 === 0) {
                        console.log("重要客户总表分页" + that.clientType)
                        axios.get('backend/customer/listImpCustomers/' + current + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.importantData = res.data.data
                            this.loading = false
                        }).catch()
                    } else {
                        console.log("重要客户查询翻页")
                        axios.get('backend/customer/selectImpCustomersFromCustomerIm/' + this.current + '/' + size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province: that.clientForm.province,
                                city: that.secondCity,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: this.tokenStr},
                            tokenBackend: this.tokenStr
                        }).then(res => {
                            if (res.data.code === 0) {
                                that.tableData = res.data.data.list
                                this.loading = false
                            }
                        }).catch()
                    }
                } else {
                    if (that.flag === 0) {
                        console.log("普通客户总表分页" + that.clientType)
                        axios.get('backend/customer/listCustomers/' + current + '/' + size, {
                            headers: {
                                token: this.tokenStr
                            }
                        }).then(res => {
                            that.tableData = res.data.data
                            this.loading = false
                        }).catch()
                    } else {
                        console.log("普通客户查询分页" + that.clientType)
                        axios.get('backend/customer/getCustomers/' + current + '/' + size, {
                            params: {
                                customerName: that.clientForm.customerName,
                                TotalPurchaseAmount: that.clientForm.TotalPurchaseAmount,
                                TotalPurchaseNum: that.clientForm.TotalPurchaseNum,
                                province: that.clientForm.province,
                                city: that.secondCity,
                                LastPurchaseTimeDateStart: that.clientForm.LastPurchaseTimeDateStart,
                                LastPurchaseTimeDateEnd: that.clientForm.LastPurchaseTimeDateEnd,
                                PayDateStart: that.clientForm.PayDateStart,
                                PayDateEnd: that.clientForm.PayDateEnd,
                                registrationTimeDateStart: that.clientForm.registrationTimeDateStart,
                                registrationTimeDateEnd: that.clientForm.registrationTimeDateEnd,
                            },
                            headers: {token: that.tokenStr},
                            tokenBackend: that.tokenStr
                        }).then(res => {
                            if (res.data.code === 0) {
                                that.tableData = res.data.data.list
                                that.loading = false
                            }
                        }).catch()
                    }
                }
            },
            // 历史订单级联分页
            currentChange(currentPage, size) {
                // console.log("历史订单分页，重要客户和普通客户一样，并不需要加判断，只要传递参数用户的网名即可")
                const that = this
                that.loading0 = true
                // console.log(currentPage, size)
                axios.get('backend/order/OrderHistory/' + currentPage + '/' + size, {
                    params: {
                        buyerNick: that.historyBuyer,
                    },
                    headers: {token: that.tokenStr},
                }).then(res => {
                    if (res.data.data === null) {
                        this.$message.error('未能查找到用户' + that.historyBuyer + "的历史订单！")
                        that.loading0 = false
                    } else {
                        this.$message({
                            message: "查找用户" + that.historyBuyer + "的历史订单成功！！",
                            type: 'success'
                        });
                        that.historyData = res.data.data.list
                        that.total0 = res.data.data.total
                        that.loading0 = false
                    }
                }).catch()
            },
            sizeChange(current, size) {
                console.log("历史订单分页")
                this.pageSize0 = size
                const that = this
                that.loading0 = true
                console.log("调用我，重要客户历史订单分页")
                console.log(this.current0, this.pageSize0)
                axios.get('backend/order/OrderHistory/' + current + '/' + size, {
                    params: {
                        buyerNick: that.historyBuyer,
                    },
                    headers: {token: that.tokenStr},
                }).then(res => {
                    console.log(res)
                    if (res.data.data === null) {
                        this.$message.error('未能查找到用户' + that.historyBuyer + "的历史订单！")
                        that.loading0 = false
                    } else {
                        this.$message({
                            message: "查找用户" + that.historyBuyer + "的历史订单成功！！",
                            type: 'success'
                        });
                        that.historyData = res.data.data.list
                        that.total0 = res.data.data.total
                        that.loading0 = false
                    }
                }).catch()
            },
            // 标签页
            callback(key) {
                console.log(key);
            },
        }
    }
</script>
<style lang="less" scoped>
    .search{
        background-color: lightgrey;
    }
    .fold{
        width: calc(100% - 216px);
        display: inline-block;
    }
    /* my design */
    .client-list-display {
        height: 50%;
        padding-bottom: 20px;
        border-bottom: 1px solid #dfe6e9;
        /*from element*/
        .el-row {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
            .el-col {
                border-radius: 4px;
            }
        }
        .page-roll {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
    .page-roll {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>