<template>
    <div>
        <el-container class="frame"  style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-header>用户注册信息</el-header>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userAccount">
                    <el-input v-model.number="ruleForm.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPwd">
                    <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
            const userAccount = (rule, value, callback) => {
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
                } else if (value !== this.ruleForm.userPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userPwd: '',
                    checkPass: '',
                    userAccount: '',
                },
                rules: {
                    userAccount: [
                        { validator: userAccount, trigger: 'blur' }
                    ],
                    userPwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                // 申请表传入后端，高级用户由管理员设定，普通用户自己申请
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        axios.post('http://192.168.1.102:8080/backend/user/saveUser?userAccount='+this.ruleForm.userAccount+'&userPwd='+this.ruleForm.userPwd).then(res=>{
                            console.log(res.data.code)
                            if (!res.data.code) {
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

<style scoped>
    .frame{
        margin: 200px auto;
        width: 500px;
        height: auto;
        padding: 20px;
    }
    .avatar_box{
        height: 130px;
        width: 250px;
        border-radius:50%;
        position: absolute;
        left:50%;
        top: 15%;
        transform:translate(-50%,-50%);
    }
    img{
        width:100%;
        height:100%;
        border-radius:50%;
    }

</style>