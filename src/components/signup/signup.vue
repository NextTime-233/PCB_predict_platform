<template>
  <div class="login_wrapper">
    <div class="login">
      <el-form :model="formSignUp">
        <el-form-item>
          <h2 class="title">账号注册</h2>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formSignUp.loginName" placeholder="手机号"></el-input>
          <!--          limlin 7.31-->
          <el-link type="primary" @click="verify">验证码</el-link>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="regForm.checkPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
          <el-button @click="resetForm('regForm')" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="bei">京ICP备18050367号-1</p>
    <p  class ='recover' @click="rollBackTables">如果登陆数据异常,点此恢复数据</p>
  </div>
</template>

<script>
  // import api from '../axios.js'

  export default {
    data(){
      //自定义验证规则
      let validatePass1 = (rule, value, callback) => {
        // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
        if(!reg.test(value)){
          callback(new Error('密码长度需6-16位，且包含字母和字符'));
        }else{
          callback();
        }
      };
      //验证密码是否重复
      let validatePass2 = (rule, value, callback) => {
        if(value !== this.regForm.password){
          callback(new Error('两次密码输入不一致'));
        }else{
          callback();
        }
      };

      return {
        regForm: {
          username: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能少', trigger: 'blur'},
            { min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
            { validator: validatePass1, trigger: 'blur'}
          ],
          checkPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur'},
            { validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){ //验证通过
            api.userRegister(this.regForm)
              .then(({ data }) => {
                if(data.success){
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                  });
                }else{
                  this.$message({
                    type: 'info',
                    message: '用户名已经存在'
                  });
                }
              });
          }else{ //验证不通过
            console.log('error submit');
            return false;
          }
        });
      },
      verify(algorithm, key, signature, data) {
        //send a code to the phone
      }
    }
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
