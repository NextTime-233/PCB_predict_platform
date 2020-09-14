<template>
    <div>
        <a-card style="margin-top: 10px; padding: 20px 60px" v-if="dev">
            <span>选择更新的数据库表单>>>  </span>
            <a-select label="更新数据库表单" default-value="客户档案" style="width: 120px" @change="handleChange">
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
            <el-steps :active="active" finish-status="success" style="margin:60px 30px 60px 60px">
                <el-step title="上传数据"></el-step>
                <el-step title="筛选重要客户"></el-step>
                <el-step title="数据导入"></el-step>
                <el-step title="数据库整理"></el-step>
                <el-step title="数据备份"></el-step>
            </el-steps>
            <span v-show="b1">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://192.168.1.102:8080"
                        :headers=myHeaders
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        accept=".xlsx">
                  <el-button slot="trigger" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size: 20px">只能上传xlsx/txt文件，且不超过500kb，其分别导入到customer_mid，t_order_mid，order_details_mid中</div>
                </el-upload>
            </span>
            <span v-show="b2">
                <div class="mes">查找customer_mid表中关键客户，写入customer_im表</div>
            </span>
            <span v-show="b3">
                <div class="mes">将customer_mid表中数据导入customer表；将t_order_mid表中数据导入t_order表；将order_details_mid表中数据导入order_details表</div>
            </span>
            <span v-show="b4">
                <div class="mes">清空所有mid表中数据</div>
            </span>
            <span v-show="b5">
                <div class="mes">备份数据</div>
            </span>
            <el-button style="margin-top: 12px; float: right; margin-right: 20px" @click="next">{{active>3?'确定备份':'下一步'}}</el-button>
        </a-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dev: window.sessionStorage.getItem('limit')==='2'?1:0,
                // 步骤条自带
                active: 0,
                buttonContent:'上传文件',
                b1: true,
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

        methods: {
            // 步骤条自带
            next() {
                const that = this
                if (this.active++ > 3) {
                    alert("数据库更新已完成！")
                    this.active = 0
                    that.b1=true
                }
                if (this.active === 1) {
                    that.b1 = false
                    that.b2 = true
                } else if (this.active === 2) {
                    that.b2 = false
                    that.b3 = true
                } else if (this.active === 3) {
                    that.b3 = false
                    that.b4 = true
                } else if (this.active === 4) {
                    that.b4 = false
                    that.b5 = true
                }
            },
            // upload
            submitUpload() {
                this.$refs.upload.submit();
                console.log()
            },
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
            },
        }
    }
</script>
<style>
    .mes {
        font-size: 20px;
    }
</style>

