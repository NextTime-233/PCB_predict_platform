<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">林家铺子数据中心</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="login">登陆</el-button>
<!--                  无法点击-->
                  <el-link href="http://localhost:6002/signup" icon="el-icon-user">新人注册</el-link>
<!--                  <a v-link="{path:'/signup'}" target="_blank">注册</a>-->
                  <a href="signup.vue" >找回密码</a>
                  <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                  </span>
                </el-form-item>
            </el-form>

        </div>
        <p class="bei">林家铺子</p>
        <p  class ='recover' @click="rollBackTables">登陆数据异常,点此恢复数据</p>

    </div>
</template>

<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        height: 320px;
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
              /*display: block;*/
              float: right;
              text-align: center;
              color: red;
            }
        }
        .el-link {
          clear: both;
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

<script>
import apis from '../apis/apis';

export default {
  name: 'login',
  data() {
    return {
      formLogin: { // 表单对象，可以随便修改，作为默认输入
        loginName: 'adm',
        password: '12356'
      },
      errorInfo: {
        text: '登陆失败,请重试',
        isShowError: false //显示错误提示
      }
    }
  },
  mounted() {
    document.onkeydown = (event) => {
      // var router = this.$route.path;
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13 && this.$route.path == '/login') { // enter 键
        this.login();
      }
    };
    var loginLog = {
      ip: returnCitySN["cip"],
      city: returnCitySN["cname"] + '-' + '进入首页'
    };

    apis.shiroApi.loginLog(loginLog);
  },
  methods: {
    login() {
      //调用后端登陆接口
      apis.shiroApi.loginIn(this.formLogin)
        .then((data) => {
          console.log('success:', data);
          if (data && data.data) {
            var json = data.data;
            if (json.status == 'SUCCESS') {
              this.$common.setSessionStorage('token', json.data.userInfo.token);
              this.$common.setSessionStorage('username', json.data.userInfo.userName);
              this.$common.setSessionStorage('lev', json.data.sysRoleVoList);
              //存入菜单,渲染菜单
              this.$store.dispatch("add_Menus", json.data.sysMenuVoList);

              //动态设置路由
              this.$store.dispatch("add_Routes", json.data.sysMenuVoList);

              //存储按钮权限
              this.$store.dispatch("add_Permissions", json.data.rolePermissionVoList);
              this.$router.replace({path: "/index"});

              var loginLog = {
                ip: returnCitySN["cip"],
                city: returnCitySN["cname"] + '-' + json.data.userInfo.userName + '-登陆'
              };

              apis.shiroApi.loginLog(loginLog);
              return;
            } else if (json.message) {
              this.errorInfo.text = json.message;
            }
          }
          this.errorInfo.isShowError = true;
          this.$store.dispatch("loginLog", loginLog);
        })
        .catch((err) => {
          console.log('error:', err);
          this.errorInfo.isShowError = true;
          this.errorInfo.text = '系统接口异常';
        });

    },
    rollBackTables() {
      var text = '数据还原';
      apis.shiroApi.rollBackTables()
        .then(data => {
          var alertText = '';
          if (data.data.status == 'SUCCESS') {
            text += '成功';
            alertText = text + ',请重新登陆';
          } else {
            text += '失败';
            alertText = text + ',请重试';
          }
          this.$alert(alertText, '提示', {
            confirmButtonText: '确定',
          });
          log(text);
        })
        .catch(e => {
          this.$alert('数据还原异常,请重试', '提示', {
            confirmButtonText: '确定',
          });
          text += '失败';
          log(text);
        });
      console.log(text);

      function log(text) {
        var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + '-' + text
        };
        apis.shiroApi.loginLog(loginLog);
      }
    },
  }
}
</script>
