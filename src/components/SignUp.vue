<template>
    <div>
        <el-button class="return" type="primary" icon="el-icon-arrow-left" @click="returnTop">返回登录页面</el-button>
        <el-container class="frame"  style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-header class="title">账号注册</el-header>
            <h3 ></h3>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="用户名" prop="accountName">
                    <el-input v-model.number="ruleForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            const accountName = (rule, value, callback) => {
                const reg = /^([a-zA-Z]|[0-9])/;
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }else if (reg.test(value)){
                    callback();
                } else {
                    callback(new Error('用户名格式不正确，只能用数字或字母'));
                }
            };
            const validatePass = (rule, value, callback) => {
                // const reg = /^([a-zA-Z]|[0-9])/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: '',
                    checkPass: '',
                    accountName: '',
                },
                rules: {
                    accountName: [
                        { validator: accountName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            // 返回登录页面
            returnTop() {
                this.$router.push({path: '/Login'}).catch(err => {});
            },
            // 表单提交
            submitForm(formName) {
                // 申请表传入后端，高级用户由管理员设定，普通用户自己申请
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('backend/user/saveUser?accountName='+this.ruleForm.accountName+'&password='+this.ruleForm.password).then(res=>{
                            console.log(res.data.code)
                            if (!res.data.code) {
                                this.$alert('您的账号已经注册成功', '提示', {
                                    confirmButtonText: '确定',
                                });
                                this.$router.push({path: '/Login'}).catch(err => {});
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .return {
        margin: 15px;
        /*background-color: #52c41a;*/
        position: fixed;
        left: 10px;
        top: 10px
    }
    .frame{
        margin: 200px auto;
        width: 400px;
        height: auto;
        padding: 20px;
        .title {
            text-align: right;
            padding-right: 30px;
            margin-bottom: 30px;
        }
        .avatar_box{
            height: 140px;
            width: 250px;
            border-radius:50%;
            position: relative;
            left: 50%;
            top: 80px;
            transform:translate(-50%,-50%);
            img{
                width:100%;
                height:100%;
            }
        }
    }

</style>