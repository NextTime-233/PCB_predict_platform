<template>
  <div id="app">
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

