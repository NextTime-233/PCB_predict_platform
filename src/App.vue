<template>
  <div id="app">
      <el-container style="border: 1px solid #eee" v-if="$route.meta.keepalive">
          <el-main>
<!--              路由占位符-->
            <router-view></router-view>
          </el-main>
      </el-container>
      <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
    export default {
        name:'app'
    }
</script>

<style>

</style>

