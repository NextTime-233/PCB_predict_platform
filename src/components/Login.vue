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
            <h3 class="title">林家铺子数据挖掘系统</h3>
            <el-form-item prop="accountName">
                <td>用户名</td>
                <el-input type="text"
                          v-model="LoginForm.accountName"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <td>密码</td>
                <el-input type="password"
                          v-model="LoginForm.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked"
                         class="saveCode"
                         style="margin-bottom:10px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
                <el-link class="register" @click="returnSignUp" icon="el-icon-user">新人注册</el-link>
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
                    accountName: '',
                    password: '',
                },
                rules2: {
                    accountName: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    password: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked: false,
            }
        },
        created(key) {
            this.LoginForm.accountName = window.localStorage.getItem("accountName")
            //console.log(window.localStorage.getItem("accountName"))
            this.LoginForm.password = window.localStorage.getItem("password")
        },
        methods: {
            returnSignUp(){
                this.$router.push({path: '/SignUp'}).catch(err => {});
            },

            // limlin 记住密码功能完善
            handleSubmit(){
                const that = this
                const storage = window.localStorage
                if(that.checked === true) {
                    console.log("记住密码")
                    storage["accountName"]=that.LoginForm.accountName
                    storage["password"]=that.LoginForm.password
                }
                else {
                    console.log("不记住密码")

                }
                console.log(storage["accountName"]);
                console.log(storage["password"]);
                console.log(that.checked)
                this.$refs.LoginForm.validate((valid) => {
                    if(valid){
                        this.logining = true;
                        axios.post('backend/login/userLogin?accountName='+this.LoginForm.accountName+'&password='+this.LoginForm.password).then(res=>{
                            console.log(res)
                            if(res.data.data!=null){
                                this.logining = false;
                                sessionStorage.setItem('user', this.LoginForm.accountName);
                                sessionStorage.setItem('token',res.data.data.tokenBackend);
                                sessionStorage.setItem('limit',res.data.data.userLimit);
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
        margin-top: auto;
        /*实现水平居中*/
        margin-right: auto;
        margin-left: auto;
        width: 350px;
        padding: 35px 35px 0px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .avatar_box {
        height: 140px;
        width: 250px;
        border-radius:50%;
        position: relative;
        left: 50%;
        top: 120px;
        transform:translate(-50%,-50%);
        img {
             width:100%;
             height:100%;
         }
    }
</style>