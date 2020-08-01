<template>
  <div>
  </div>
</template>

<style>
.zanzhutb  tr td:first-child{
  text-align: right;
}
.zanzhutb  tr td:nth-child(2){
  width:80px;
}
</style>
<script>
import apis from "../apis/apis";
export default {
  data() {
    return {

    }
  },
  methods: {
    rollBackTables() {
      var text = "数据还原";
      apis.shiroApi
        .rollBackTables()
        .then(data => {
          var alertText = "";
          if (data.data.status == "SUCCESS") {
            text += "成功";
            alertText = text + ",请重新登陆";
          } else {
            text += "失败";
            alertText = text + ",请重试";
          }
          this.$alert(alertText, "提示", {
            confirmButtonText: "确定"
          });
          log(text);
        })
        .catch(e => {
          this.$alert("数据还原异常,请重试", "提示", {
            confirmButtonText: "确定"
          });
          text += "失败";
          log(text);
        });
      console.log(text);

      function log(text) {
        var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-" + text
        };

        apis.shiroApi.loginLog(loginLog);
      }
    },
    getZanZhu(){
      apis.mayiApi.getZanZhu().then(res=>{
        if(res.status=="200"){
          if(res.data.dataList){
            this.zanzhu=res.data.dataList;
          }
        }
      }).catch(

      );
    },
    getDate(param){
      return this.$common.toDate(param);
    }
  },
  mounted() {
    this.getZanZhu();
  },
  computed:{

  }
};
</script>
