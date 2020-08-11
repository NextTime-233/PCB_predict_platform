<template>
    <div class="login-container">
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
            <!--绝对路径不显示，改为相对路径ok-->
        </div>
        <el-form :model="LoginForm" :rules="rules2"
                 status-icon
                 ref="LoginForm"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">林家铺子后台管理系统</h3>
            <el-form-item prop="userAccount">
                <td>用户名</td>
                <el-input type="text"
                          v-model="LoginForm.userAccount"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
                <td>密码</td>
                <el-input type="password"
                          v-model="LoginForm.userPwd"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked"
                         class="rememberme"
                         style="margin-bottom:10px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
                <el-link class="register" href="http://localhost:8082/#/SignUp" icon="el-icon-user">新人注册</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                logining: false,
                LoginForm: {
                    userAccount: '2',
                    userPwd: '2',
                },
                rules2: {
                    userAccount: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    userPwd: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked: false
            }
        },
        methods: {
            handleSubmit(event){
                this.$refs.LoginForm.validate((valid) => {
                    if(valid){
                        this.logining = true;
                        axios.post('http://localhost:8080/backend/login/userLogin?userAccount='+this.LoginForm.userAccount+'&userPwd='+this.LoginForm.userPwd).then(res=>{
                            console.log(res)
                            if(!res.data.code){
                                this.logining = false;
                                sessionStorage.setItem('user', this.LoginForm.userAccount);
                                sessionStorage.setItem('token',res.data.data.tokenBackend);
                                // 首页展示
                                this.$router.push('/Analysis').catch(err => {});
                            }else{
                                this.logining = false;
                                this.$alert('username or password wrong!', 'info', {
                                    confirmButtonText: 'ok'
                                })
                            }
                        })
                    }else{
                        console.log('error submit!');
                        return false;
                    }
                })
            }
        }
    };
</script>
<!--scoped 控制样式生效区间，加了scoped只在当前页面生效-->
<style lang="less" scoped>
    .title {
        text-align: center;
    }
    .login-container {
        width: 100%;
        height: 100%;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin-top: 140px;
        /*实现水平居中*/
        margin-right: auto;
        margin-left: auto;
        width: 350px;
        padding: 35px 35px 0px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .avatar_box{
        height: 130px;
        width: 250px;
        border-radius:50%;
        /*position: absolute;*/
        /*left:50%;*/
        /*top: 23%;*/
        position: relative;
        left: 50%;
        top: 230px;
        transform:translate(-50%,-50%);
        img{
             width:100%;
             height:100%;
             border-radius:50%;
         }
    }

    .register {

    }
</style>