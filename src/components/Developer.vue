<template>
    <div>
        <a-card style="margin-top: 10px; padding: 20px 60px" v-if="dev">
            <span>选择更新的数据库表单>>>  </span>
            <a-select label="更新数据库表单" style="width: 120px" @change="handleChange" v-model="table">
                <a-select-option value="客户档案">
                    客户档案
                </a-select-option>
                <a-select-option value="订单管理">
                    订单管理
                </a-select-option>
                <a-select-option value="订单详情">
                    订单详情
                </a-select-option>
            </a-select>
            <div v-show="clientTable">
                <el-steps :active="active" finish-status="success" style="margin:60px 30px 60px 60px">
                    <el-step title="文件上传"></el-step>
                    <el-step title="从顾客信息处理表中筛选重要客户"></el-step>
                    <el-step title="新增数据到顾客信息表"></el-step>
                    <el-step title="清空顾客信息处理表"></el-step>
                    <el-step title="顾客信息表备份"></el-step>
                </el-steps>
                <span v-show="b1">
                <span v-if="upload">
                     <el-upload
                             class="upload-demo"
                             ref="uploadCustomer"
                             action="backend/customer/uploadExcel"
                             :headers=myHeaders
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             :auto-upload="false"
                             accept=".xlsx">
                      <el-button slot="trigger" type="primary">选取文件</el-button>
<!--                      <el-button style="margin-left: 10px;" type="success" @click="submitUploadCustomer">上传到customer_mid表</el-button>-->
                      <div slot="tip" class="el-upload__tip" style="font-size: 20px">选择要上传的顾客信息表，请点击下一步，导入到顾客信息处理表</div>
                    </el-upload>
                </span>
                <span v-else>
                    文件已经成功上传，请点击下一步，继续执行相关操作
                </span>
                </span>
                    <span v-show="b2">
                    <div class="mes">查找顾客信息处理表中关键客户，写入重要客户表</div>
                </span>
                    <span v-show="b3">
                    <div class="mes">将顾客信息处理表中数据导入顾客表</div>
                </span>
                    <span v-show="b4">
                    <div class="mes">清空所有顾客信息处理表中的数据</div>
                </span>
                    <span v-show="b5">
                    <div class="mes">备份林家铺子数据库中的顾客信息表</div>
                </span>
                <el-button style="margin-top: 12px; float: right; margin-right: 20px" @click="next">{{active>3?'确定备份':'下一步'}}</el-button>
            </div>
            <div v-show="orderTable">
                <el-steps :active="active" finish-status="success" style="margin:60px 30px 60px 60px">
                    <el-step title="文件上传"></el-step>
                    <el-step title="数据导入"></el-step>
                    <el-step title="清空订单信息处理表"></el-step>
                    <el-step title="订单管理表备份"></el-step>
                </el-steps>
                <span v-show="b1">
                <span v-if="upload">
                     <el-upload
                             class="upload-demo"
                             ref="uploadOrder"
                             action="backend/order/uploadExcel"
                             :headers=myHeaders
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             :auto-upload="false"
                             accept=".xlsx">
                      <el-button slot="trigger" type="primary">选取文件</el-button>
<!--                      <el-button style="margin-left: 10px;" type="success" @click="submitUploadOrder">上传到t_order_mid表</el-button>-->
                      <div slot="tip" class="el-upload__tip" style="font-size: 20px">选择要上传的订单信息表，请点击下一步，导入到订单信息处理表</div>
                    </el-upload>
                </span>
                <span v-else>
                    文件已经成功上传，请点击下一步，继续执行相关操作
                </span>
                </span>
                    <span v-show="b2">
                    <div class="mes">将订单信息处理表中数据导入订单管理表</div>
                </span>
                    <span v-show="b3">
                    <div class="mes">清空所有订单信息处理表中数据</div>
                </span>
                    <span v-show="b4">
                    <div class="mes">备份林家铺子数据库中的订单管理表</div>
                </span>
                <el-button style="margin-top: 12px; float: right; margin-right: 20px" @click="next">{{active>2?'确定备份':'下一步'}}</el-button>
            </div>
            <div v-show="orderDetailsTable">
                <el-steps :active="active" finish-status="success" style="margin:60px 30px 60px 60px">
                    <el-step title="文件上传"></el-step>
                    <el-step title="数据导入"></el-step>
                    <el-step title="数据库整理"></el-step>
                    <el-step title="数据备份"></el-step>
                </el-steps>
                <span v-show="b1">
                <span v-if="upload">
                     <el-upload
                             class="upload-demo"
                             ref="uploadDetails"
                             action="backend/"
                             :headers=myHeaders
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             :auto-upload="false"
                             accept=".xlsx">
                      <el-button slot="trigger" type="primary">选取文件</el-button>
<!--                      <el-button style="margin-left: 10px;" type="success" @click="submitUploadDetails">上传到order_details_mid表</el-button>-->
                      <div slot="tip" class="el-upload__tip" style="font-size: 20px">上传订单详情表，导入到订单详情处理表</div>
                    </el-upload>
                </span>
                <span v-else>
                    文件已经成功上传，请点击下一步，继续执行相关操作
                </span>
                </span>
                <span v-show="b2">
                    <div class="mes">将订单详情处理表中数据导入订单详情表</div>
                </span>
                <span v-show="b3">
                    <div class="mes">清空所有订单详情处理表中的数据</div>
                </span>
                <span v-show="b4">
                    <div class="mes">备份林家铺子数据库中的订单详情表</div>
                </span>
                <el-button style="margin-top: 12px; float: right; margin-right: 20px" @click="next">{{active>2?'确定备份':'下一步'}}</el-button>
            </div>
        </a-card>
    </div>
</template>

<script>
    import URLSearchParams from 'url-search-params'

    export default {
        data() {
            return {
                dev: window.sessionStorage.getItem('limit')==='2'?1:0,
                table: '客户档案',
                // 步骤条自带
                active: 0,
                buttonContent:'上传文件',
                clientTable:true,
                orderTable:false,
                orderDetailsTable:false,
                b1: true,
                upload: true,
                b2: false,
                b3: false,
                b4: false,
                b5: false,
                // upload
                fileList: [],
                tokenStr: window.sessionStorage.getItem('token'),
                myHeaders: {token: this.tokenStr}
            };
        },
        watch: {
        //    下拉改变而且active不为初值，active重置
            table(newValue, oldValue) {
                console.log("选择框的变化")
                console.log(newValue)
                if(this.active !== 0) {
                    this.active = 0
                    this.b1= true
                    this.b2= false
                    this.b3= false
                    this.b4= false
                    this.b5= false
                }
            }
        },
        methods: {
            // 步骤条自带
            next() {
                console.log(this.tokenStr)
                const that = this
                if (that.clientTable === true) {
                    if (this.active++ > 3) {
                        alert("暂时请按需要进行人工备份！已完成数据库更新！")
                        this.active = 0
                        that.b1=true
                        that.b5 = false
                        this.fileList = []
                    }
                    if (this.active === 1) {
                        that.b1 = false
                        that.b2 = true
                        that.loading0 = true
                        this.$refs.uploadCustomer.submit();
                    } else if (this.active === 2) {
                        that.b2 = false
                        that.b3 = true
                        axios.get('backend/customer/selectImpCustomersMid', {
                            headers : {token : this.tokenStr},
                            tokenBackend : this.tokenStr
                        }).then( res => {
                            console.log(res)
                        }).catch()

                    } else if (this.active === 3) {
                        that.b3 = false
                        that.b4 = true
                        const params = new URLSearchParams();
                        params.append('key', 'value');
                        console.log(params)
                        // fetch("backend/customer/customerBackup")
                        //     .then(res => {
                        //         return res.json();
                        //     })
                        //     .then(res => {
                        //         // 这里返回的数据就是我们想要请求的json数据
                        //         console.log(res);
                        //     })
                        axios.post('backend/customer/customerBackup','', {
                            headers : {
                                token : this.tokenStr,
                            },
                            tokenBackend : this.tokenStr
                        }).then( res => {
                            console.log(res)
                        }).catch(function (error) {
                            if (error.response) {
                                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        })
                        // axios.post('backend/customer/customerBackup', {
                        //     params,
                        //     headers : {
                        //         token : this.tokenStr,
                        //     }
                        // }).then(function(res){
                        //         console.log(res);
                        //     })
                        //     .catch(function(err){
                        //         console.log(err);
                        //     });
                        // URLSearchParams IE11 才支持
                        // 所以需要引入一个js
                        // https://cdn.bootcss.com/url-search-params/0.10.0/url-search-params.js npm install url-search-paramsNPM
                    } else if (this.active === 4) {
                        that.b4 = false
                        axios.post('backend/customer/customerClear','', {
                            headers : {token : this.tokenStr},
                            tokenBackend : this.tokenStr
                        }).then( res => {
                            console.log(res)
                        }).catch()
                        that.b5 = true
                    }
                }
                else if (this.orderTable === true) {
                    that.b4 = false
                    if (this.active++ > 2) {
                        alert("暂时请按需要进行人工备份！已完成数据库更新！！")
                        this.fileList = []
                        this.active = 0
                        that.b1=true
                        that.b4 = false
                    }
                    if (this.active === 1) {
                        that.b1 = false
                        that.b2 = true
                        this.$refs.uploadOrder.submit();
                    } else if (this.active === 2) {
                        that.b2 = false
                        that.b3 = true
                        axios.post('backend/order/orderBackup', '', {
                            headers : {token : this.tokenStr},
                            tokenBackend : this.tokenStr
                        }).then( res => {
                            console.log(res)
                        }).catch()
                    } else if (this.active === 3) {
                        that.b3 = false
                        that.b4 = true
                        axios.post('backend/order/orderClear','', {
                            headers : {token : this.tokenStr},
                            tokenBackend : this.tokenStr
                        }).then( res => {
                            console.log(res)
                        }).catch()
                    }
                }
                else {
                    that.b4 = false
                    if (this.active++ > 2) {
                        alert("暂时请按需要进行人工备份！已完成数据库更新！！")
                        this.active = 0
                        that.b1=true
                        that.b4 = false
                        this.fileList = []
                    }
                    if (this.active === 1) {
                        that.b1 = false
                        that.b2 = true
                        this.$refs.uploadDetails.submit()
                    } else if (this.active === 2) {
                        that.b2 = false
                        that.b3 = true
                    } else if (this.active === 3) {
                        that.b3 = false
                        that.b4 = true
                    }
                }
            },
            // upload
            // submitUploadCustomer() {
            //     this.$refs.uploadCustomer.submit();
            //     // this.upload = false
            // },
            // submitUploadOrder() {
            //     console.log("这里提交order")
            //     this.$refs.uploadOrder.submit();
            //     // this.upload = false
            // },
            // submitUploadDetails() {
            //     this.$refs.uploadDetails.submit();
            //     // this.upload = false
            // },
            handleRemove(file, fileList) {
                console.log("输出文件和文件列表，移除")
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log("文件预览")
                console.log(file);
            },
            // 选择器
            handleChange(value) {
                console.log(`selected ${value}`);
                console.log("此处为选择器的值")
                console.log(value)
                if(value==="订单管理"){
                    this.clientTable = false
                    this.orderTable = true
                    this.orderDetailsTable = false
                }
                else if (value==="订单详情") {
                    this.clientTable = false
                    this.orderTable = false
                    this.orderDetailsTable = true
                }
                else {
                    this.clientTable = true
                    this.orderTable = false
                    this.orderDetailsTable = false
                }
            },
        }
    }
</script>
<style>
    .mes {
        font-size: 20px;
    }
</style>

