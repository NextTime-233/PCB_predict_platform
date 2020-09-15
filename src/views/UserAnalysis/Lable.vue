<!--标签管理-->
<template>
    <div>
        <el-row  :gutter="280">
            <el-col :span="4">
                <div class="order-form-searchBar">
                    <div class="global-search-wrapper" style="width: 300px">
                        <a-input-search placeholder="请输入标签名" enter-button @search="onSearch" />
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="global-search-wrapper" style="width: 200px">
                    <!--<el-button type="primary" @click="dialogFormVisible = true" size="small">新增标签</el-button>-->
                    <el-button type="success" icon="el-icon-refresh-left" circle size="small" @click="getLabel"></el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <div>
                    <a-collapse  :bordered="false">
                        <template #expandIcon="props">
                            <a-icon type="tags" :rotate="props.isActive ? 90 : 0" />
                        </template>
                        <a-collapse-panel key="1" header="新增标签维度" :style="customStyle">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        <a-button type="primary" :disabled=dis0 @click="dialogFormVisible = true">
                                            标签1
                                        </a-button>
                                    </div>
                                </el-col>
                                <el-col :span="4" >
                                    <div class="grid-content bg-purple" >
                                        <a-button type="primary" :disabled=dis1 @click="dialogForm2 = true">
                                            标签2
                                        </a-button>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        <a-button type="primary"  :disabled=dis2 @click="dialogForm3 = true">
                                            标签3
                                        </a-button>
                                    </div>
                                </el-col>
                                <el-col :span="4" >
                                    <div class="grid-content bg-purple">
                                        <a-button type="primary" v-bind:disabled=dis3 @click="dialogForm4 = true">
                                            标签4
                                        </a-button>
                                    </div>
                                </el-col>
                                <el-col :span="4" >
                                    <div class="grid-content bg-purple">
                                        <a-button type="primary" v-bind:disabled=dis4 @click="dialogForm5 = true">
                                            标签5
                                        </a-button>
                                    </div>
                                </el-col>

                            </el-row>

                        </a-collapse-panel>
                    </a-collapse>
                </div>
            </el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <div>
            <el-table :data="tableData" border style="width: 200%"   @sort-change="changeTableSort" :default-sort = "{prop: 'updateTime', order: 'descending'}">
                <el-table-column fixed prop="labelDimension" label="所属维度" width="">
                </el-table-column>
                <el-table-column fixed prop="labelVal" label="标签名称" width="">
                </el-table-column>
                <el-table-column fixed prop="state" label="标签描述" width="">
                </el-table-column>
                <el-table-column fixed prop="updateTime" label="创建时间" width="" :sortable="'custom'">
                </el-table-column>
                <el-table-column
                        fixed
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                       <span v-if="scope.row.status===3">
                           <a>-</a>
                       </span>
                        <span v-else>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                删除
                            </el-button>
                       </span>

                    </template>
                </el-table-column>
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
            <!-- 新增标签1-->
            <el-dialog
                    title="新增标签1"
                    :visible.sync="dialogFormVisible"
                    width="60%"
                    @close='closeDialog'>
                <el-form :model="addForm" >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="新增标签名称：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                                <el-input v-model="addForm.labelVal" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增标签说明：" :label-width="formLabelWidth" v-model="addForm.state">
                                <el-input v-model="addForm.state" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最低购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountLow">
                                <el-input v-model="addForm.totalPurchaseAmountLow" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最高购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountHigh">
                                <el-input v-model="addForm.totalPurchaseAmountHigh" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款起始时间：" :label-width="formLabelWidth" v-model="addForm.reStartTime">
                                <el-date-picker
                                        v-model="addForm.reStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款结束时间：" :label-width="formLabelWidth" v-model="addForm.reEndTime">
                                <el-date-picker
                                        v-model="addForm.reEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="购买起始时间：" :label-width="formLabelWidth" v-model="addForm.lastStartTime">
                                <el-date-picker
                                        v-model="addForm.lastStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买结束时间：" :label-width="formLabelWidth" v-model="addForm.lastEndTime">
                                <el-date-picker
                                        v-model="addForm.lastEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="客户所在省份：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-select v-model="value" filterable placeholder="请选择" size="small">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogFormVisible= false">重置</el-button>
                           <el-button @click="dialogFormVisible= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel();open1();getLabel();dialogFormVisible=false " >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 新增标签2-->
            <el-dialog
                    title="新增标签2"
                    :visible.sync="dialogForm2"
                    width="60%"
                    @close='closeDialog'>
                <el-form :model="addForm" >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="新增标签名称：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                                <el-input v-model="addForm.labelVal" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增标签说明：" :label-width="formLabelWidth" v-model="addForm.state">
                                <el-input v-model="addForm.state" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最低购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountLow">
                                <el-input v-model="addForm.totalPurchaseAmountLow" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最高购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountHigh">
                                <el-input v-model="addForm.totalPurchaseAmountHigh" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款起始时间：" :label-width="formLabelWidth" v-model="addForm.reStartTime">
                                <el-date-picker
                                        v-model="addForm.reStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款结束时间：" :label-width="formLabelWidth" v-model="addForm.reEndTime">
                                <el-date-picker
                                        v-model="addForm.reEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="购买起始时间：" :label-width="formLabelWidth" v-model="addForm.lastStartTime">
                                <el-date-picker
                                        v-model="addForm.lastStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买结束时间：" :label-width="formLabelWidth" v-model="addForm.lastEndTime">
                                <el-date-picker
                                        v-model="addForm.lastEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="客户所在省份：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-select v-model="value" filterable placeholder="请选择" size="small">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogForm2= false">重置</el-button>
                           <el-button @click="dialogForm2= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel2();open1();dialogForm2=false " >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 新增标签3-->
            <el-dialog
                    title="新增标签3"
                    :visible.sync="dialogForm3"
                    width="60%"
                    @close='closeDialog'>
                <el-form :model="addForm" >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="新增标签名称：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                                <el-input v-model="addForm.labelVal" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增标签说明：" :label-width="formLabelWidth" v-model="addForm.state">
                                <el-input v-model="addForm.state" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最低购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountLow">
                                <el-input v-model="addForm.totalPurchaseAmountLow" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最高购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountHigh">
                                <el-input v-model="addForm.totalPurchaseAmountHigh" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款起始时间：" :label-width="formLabelWidth" v-model="addForm.reStartTime">
                                <el-date-picker
                                        v-model="addForm.reStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款结束时间：" :label-width="formLabelWidth" v-model="addForm.reEndTime">
                                <el-date-picker
                                        v-model="addForm.reEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="购买起始时间：" :label-width="formLabelWidth" v-model="addForm.lastStartTime">
                                <el-date-picker
                                        v-model="addForm.lastStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买结束时间：" :label-width="formLabelWidth" v-model="addForm.lastEndTime">
                                <el-date-picker
                                        v-model="addForm.lastEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="客户所在省份：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-select v-model="value" filterable placeholder="请选择" size="small">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogForm3= false">重置</el-button>
                           <el-button @click="dialogForm3= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel3();open1();dialogForm3=false " >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 新增标签4-->
            <el-dialog
                    title="新增标签4"
                    :visible.sync="dialogForm4"
                    width="60%"
                    @close='closeDialog'>
                <el-form :model="addForm" >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="新增标签名称：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                                <el-input v-model="addForm.labelVal" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增标签说明：" :label-width="formLabelWidth" v-model="addForm.state">
                                <el-input v-model="addForm.state" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最低购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountLow">
                                <el-input v-model="addForm.totalPurchaseAmountLow" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最高购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountHigh">
                                <el-input v-model="addForm.totalPurchaseAmountHigh" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款起始时间：" :label-width="formLabelWidth" v-model="addForm.reStartTime">
                                <el-date-picker
                                        v-model="addForm.reStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款结束时间：" :label-width="formLabelWidth" v-model="addForm.reEndTime">
                                <el-date-picker
                                        v-model="addForm.reEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="购买起始时间：" :label-width="formLabelWidth" v-model="addForm.lastStartTime">
                                <el-date-picker
                                        v-model="addForm.lastStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买结束时间：" :label-width="formLabelWidth" v-model="addForm.lastEndTime">
                                <el-date-picker
                                        v-model="addForm.lastEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="客户所在省份：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-select v-model="value" filterable placeholder="请选择" size="small">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogForm4= false">重置</el-button>
                           <el-button @click="dialogForm4= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel4();open1();dialogForm4=false " >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 新增标签5-->
            <el-dialog
                    title="新增标签5"
                    :visible.sync="dialogForm5"
                    width="60%"
                    @close='closeDialog'>
                <el-form :model="addForm" >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="新增标签名称：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                                <el-input v-model="addForm.labelVal" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新增标签说明：" :label-width="formLabelWidth" v-model="addForm.state">
                                <el-input v-model="addForm.state" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最低购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountLow">
                                <el-input v-model="addForm.totalPurchaseAmountLow" autocomplete="off"  size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最高购买金额：" :label-width="formLabelWidth" v-model="addForm.totalPurchaseAmountHigh">
                                <el-input v-model="addForm.totalPurchaseAmountHigh" autocomplete="off" size="small" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款起始时间：" :label-width="formLabelWidth" v-model="addForm.reStartTime">
                                <el-date-picker
                                        v-model="addForm.reStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款结束时间：" :label-width="formLabelWidth" v-model="addForm.reEndTime">
                                <el-date-picker
                                        v-model="addForm.reEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="购买起始时间：" :label-width="formLabelWidth" v-model="addForm.lastStartTime">
                                <el-date-picker
                                        v-model="addForm.lastStartTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买结束时间：" :label-width="formLabelWidth" v-model="addForm.lastEndTime">
                                <el-date-picker
                                        v-model="addForm.lastEndTime"
                                        type="date"
                                        placeholder="选择日期"
                                        size="small">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="客户所在省份：" :label-width="formLabelWidth" v-model="addForm.labelVal">
                            <el-select v-model="value" filterable placeholder="请选择" size="small">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                           <el-button @click="dialogForm5= false">重置</el-button>
                           <el-button @click="dialogForm5= false">取 消</el-button>
                           <el-button type="primary"  @click="addLabel5();open1();dialogForm5=false " >确 定</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import ARow from "ant-design-vue/es/grid/Row";
    export default {
        components: {ARow},
        data() {
            return {
                dis0: false,
                dis1: false,
                dis2: false,
                dis3: false,
                dis4: false,
                dis5: false,
                // raw:{
                //     labelVal:'',
                // },
                //分页
                queryInfo:{
                    pageNum:1,
                    pageSize:5,
                },
                pageSize: '',
                total: 0,
                tableData:[],
                tokenStr: '',
                //  新增对话框的显示与否
                dialogFormVisible:false,
                dialogForm2:false,
                dialogForm3:false,
                dialogForm4:false,
                dialogForm5:false,
                // 表单数据
                addForm: {
                    labelVal:'',
                    labelDimension:'',
                    state:'',
                    reStartTime:'',
                    reEndTime:'',
                    province:'',
                    lastStartTime:'',
                    lastEndTime:'',
                    totalPurchaseAmountLow:'',
                    totalPurchaseAmountHigh:'',
                },
                formLabelWidth:'120px',
                dialogCode:true,
                customStyle:'background:white;border-radius: 2px;margin-bottom: 15px;border: 0;overflow: hidden',
                value:'',
                //省份
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
            }

        },
        computed: {
            dataColumns() {
                return this.columns.map(column => {
                    column.title = column.key
                    return column
                })
            }
        },
        //生命周期函数
        created(){
            this.getLabel()
        },
        activated(){
            this.getLabel()
        },
        methods: {
            getLabel(){
                const that = this;
                let tokenStr =  window.sessionStorage.getItem('token')
                axios.get('http://172.20.10.2:8080/backend/label/findAllLabelVal/1/5').then(res => {
                    that.tableData = res.data.data;
                    that.total=res.data.data.length;
                    console.log((that.tableData));
                    if (that.tableData[0].labelDimension === '自定义维度1') {
                        that.dis0 = true;
                    } else if (that.tableData[0].labelDimension === '自定义维度2') {
                        that.dis1 = true;
                    } else if (that.tableData[0].labelDimension === '自定义维度3') {
                        that.dis2 = true;
                    } else if (that.tableData[0].labelDimension === '自定义维度4') {
                        that.dis3 = true;
                    } else if (that.tableData[0].labelDimension === '自定义维度5') {
                        that.dis4 = true;
                    }
                }).catch()
                axios.get('http://172.20.10.2:8080/backend/label/findAllLabelVal',{headers:{
                        token: tokenStr
                    }}).then( res => {
                    console.log(res.data.data)
                    // that.tableData = res.data.data;
                    // that.tableData = res.data.data.reverse();
                    that.total=res.data.data.length;
                    // for (let i = 0; i <= 5; i++) {
                    //     let tableTemp = [total + 1];
                    //     tableTemp[i + 1] = tableData[i];
                    //     tableTemp[0] = tableData[total - 1];
                    // }
                    // console.log(res.data);
                    // console.log(res.data.data);
                    // console.log(res.data.data.reverse())
                    // res.data.data = res.data.data.reverse()
                    // if (that.tableData[that.total - 1].labelDimension == '自定义维度1') {
                    //     that.dis = true;
                    // } else {
                    //     that.dis = false;
                    // }

                    // for (let i = 0; i < 6; i++) {
                    //     if (that.tableData[i].labelDimension == '自定义维度' + i) {
                    //         that.dis = true;
                    //         that.tableData=res.data.data.unshift()
                    //     } else {
                    //         that.dis = false;
                    //     }
                    // }
                    console.log(that.total);
                    console.log('------- 判断 -------')
                }).catch()

            },
            submitList(){
                const that = this
                const list = this.formInline
                console.log(list)
                if(0) {
                    console.log("暂时未执行")
                } else{
                    console.log("提交表单")
                    axios.get('http://172.20.10.2:8080/backend/label/findLabelValByName/', {
                        headers:{token : this.tokenStr},
                        tokenBackend: this.tokenStr
                    }).then( res => {
                        console.log(res.data)
                        that.tableData = res.data.data;
                        that.total=res.data.data.length;
                    }).catch()
                }
            },
            // 分页ok
            handleCurrentChange(currentPage){
                console.log("当前页码")
                console.log(currentPage)
                this.queryInfo.pageNum = currentPage
                const that = this
                axios.get('http://172.20.10.2:8080/backend/label/findAllLabelVal/'+currentPage+'/'+this.queryInfo.pageSize).then(res => {
                    console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            handleSizeChange(size) {
                console.log("页面数据量")
                console.log(size)
                this.queryInfo.pageSize = size;
                const that = this
                axios.get('http://172.20.10.2:8080/backend/label/findAllLabelVal/'+this.queryInfo.pageNum+'/'+size).then(res => {
                    // console.log(res.data.data)
                    that.tableData = res.data.data
                }).catch()
            },
            // 模糊查询ok
            onSearch(labelVal) {
                console.log(labelVal);
                const that = this;
                let tokenStr =  window.sessionStorage.getItem('token')
                if(!labelVal){
                    alert("请输入要搜索的用户名！")
                } else {
                    axios.get('http://172.20.10.2:8080/backend/label/findLabelValByName/'+labelVal, {headers:{
                            token: this.tokenStr}}).then( res => {
                        console.log(res.data);
                        const dataset=0;
                        console.log(dataset);
                        that.tableData = res.data.data;
                        that.total=res.data.data.length;

                    }).catch()
                }
            },
            closeDialog() {
                this.dialogCode = false
            },

            // 新增标签ok
            addLabel() {
                // this.dis=false
                axios.post('http://172.20.10.2:8080/backend/label/saveLabelProp1?labelVal='
                    +this.addForm.labelVal+'&state='+this.addForm.state+'&totalPurchaseAmountLow='+this.addForm.totalPurchaseAmountLow
                    +'&totalPurchaseAmountHigh'+this.addForm.totalPurchaseAmountHigh+'&reStartTime'+this.addForm.reStartTime+'&reEndTime'+this.addForm.reEndTime
                    +'&lastStartTime'+this.addForm.lastStartTime+'&lastEndTime'+this.addForm.lastEndTime+'&province'+this.addForm.province).then(res=>{
                    console.log(res)
                    // console.log(res)
                })
                // this.dis=true
            },
            addLabel2(){
                // this.dis1=false
                axios.post('http://172.20.10.2:8080//backend/label/saveLabelProp2?labelVal='
                    +this.addForm.labelVal+'&state='+this.addForm.state+'&totalPurchaseAmountLow='+this.addForm.totalPurchaseAmountLow
                    +'&totalPurchaseAmountHigh'+this.addForm.totalPurchaseAmountHigh+'&reStartTime'+this.addForm.reStartTime+'&reEndTime'+this.addForm.reEndTime
                    +'&lastStartTime'+this.addForm.lastStartTime+'&lastEndTime'+this.addForm.lastEndTime+'&province'+this.addForm.province).then(res=>{
                    console.log(res)
                })

                // this.dis1=true
            },
            addLabel3(){
                // this.dis2=false
                axios.post('http://172.20.10.2:8080//backend/label/saveLabelProp3?labelVal='
                    +this.addForm.labelVal+'&state='+this.addForm.state+'&totalPurchaseAmountLow='+this.addForm.totalPurchaseAmountLow
                    +'&totalPurchaseAmountHigh'+this.addForm.totalPurchaseAmountHigh+'&reStartTime'+this.addForm.reStartTime+'&reEndTime'+this.addForm.reEndTime
                    +'&lastStartTime'+this.addForm.lastStartTime+'&lastEndTime'+this.addForm.lastEndTime+'&province'+this.addForm.province).then(res=>{
                    console.log(res)
                })
            },
            addLabel4(){
                // this.dis3=false
                axios.post('http://172.20.10.2:8080//backend/label/saveLabelProp4?labelVal='
                    +this.addForm.labelVal+'&state='+this.addForm.state+'&totalPurchaseAmountLow='+this.addForm.totalPurchaseAmountLow
                    +'&totalPurchaseAmountHigh'+this.addForm.totalPurchaseAmountHigh+'&reStartTime'+this.addForm.reStartTime+'&reEndTime'+this.addForm.reEndTime
                    +'&lastStartTime'+this.addForm.lastStartTime+'&lastEndTime'+this.addForm.lastEndTime+'&province'+this.addForm.province).then(res=>{
                    console.log(res)
                })
            },
            addLabel5(){
                // this.dis4=false
                axios.post('http://172.20.10.2:8080//backend/label/saveLabelProp5?labelVal='
                    +this.addForm.labelVal+'&state='+this.addForm.state+'&totalPurchaseAmountLow='+this.addForm.totalPurchaseAmountLow
                    +'&totalPurchaseAmountHigh'+this.addForm.totalPurchaseAmountHigh+'&reStartTime'+this.addForm.reStartTime+'&reEndTime'+this.addForm.reEndTime
                    +'&lastStartTime'+this.addForm.lastStartTime+'&lastEndTime'+this.addForm.lastEndTime+'&province'+this.addForm.province).then(res=>{
                    console.log(res)
                })
            },
            //删除标签
            deleteRow(index, rows) {
                // console.log(index)
                rows.splice(index, 1);
                // // console.log(row.labelVal)
                // // console.log(rows[0].labelVal)
                // console.log( rows[index].labelVal)
                // rows.splice(index, 1)
                // const params =new URLSearchParams()
                // params.append("labelVal",rows.labelVal)
                const list={}
                list[0]= rows[0].labelVal
                console.log( list[0])
                axios.put('http://172.20.10.2:8080/backend/label/delLabel', {params:list}).then(res=>{
                    console.log(res)
                    console.log(rows)
                }).catch()
            },
            open1(){
                this.$notify({
                    title: '新增标签成功',
                    message: '',
                    type: 'success'
                });
            },
            changeTableSort(row,column, prop, order){
                // console.log(column.prop); //prop标签 => nickname
                // console.log(column.order);//descending降序、ascending升序
                // console.log(column)
                // return row.labelDimension

            }
            // judge(){
            //     const that =this
            //     if(that.tableData.labelDimension==='自定义标签2'){
            //         this.dis1=true
            //     }
            // },
        },
    }
</script>

<style>
    .global-search-wrapper {
        padding-right: 50px;
        margin: 20px 0;
    }

</style>
