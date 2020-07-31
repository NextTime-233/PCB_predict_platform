<template>
  <div class="login_wrapper">
    <div class="login">
      <el-form :model="formSignUp">
        <el-form-item>
          <h2 class="title">账号注册</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.password" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.loginName" placeholder="手机号"></el-input>
<!--          limlin 7.31-->
          <el-link type="primary" @click="verify">验证码</el-link>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">确定</el-button>
          <el-link type="primary" @click="signUp">重置</el-link>
          <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                    </span>
        </el-form-item>
      </el-form>
    </div>
    <p class="bei">京ICP备18050367号-1</p>
    <p  class ='recover' @click="rollBackTables">如果登陆数据异常,点此恢复数据</p>

  </div>
</template>

<script>
    export default {
        name: "signup"
        data() {
          return {
            formSignUp: {   //表单对象
              loginName: 'admin',
              password: '123456'
            },
            errorInfo: {
              text: '登陆失败,请重试',
              isShowError: false //显示错误提示
            }
          }
        },
    }
</script>
<!--  SCSS是一种CSS预处理语言  -->
<style lang="scss">
  $input_width:300px;

  .login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  .login {
    width: 460px;
    height: 400px;
    margin-top: -150px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  .title {
    text-align: center;
    color: #505458;
  }
  .el-form-item__content {
    width: $input_width;
  }
  .el-button {
    width: $input_width;
  }
  .el-form {
    margin: 30px 80px auto 80px;
  .error {
    display: block;
    text-align: center;
    color: red;
  }
  }
  }
  }
  .recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
  // display: none;
  }
  .bei{
    position:absolute;
    bottom:20px;
    cursor:pointer;
    color:#505458;
  }
</style>
