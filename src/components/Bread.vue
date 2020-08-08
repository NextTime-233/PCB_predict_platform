<template>
    <a-breadcrumb>
        <a-breadcrumb-item>林家铺子后台管理中心</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">{{this.$route.meta.module}}</a></a-breadcrumb-item>
        <!--                        <a-breadcrumb-item><a href="">{{}}</a></a-breadcrumb-item>-->
        <a-breadcrumb-item>{{this.$route.meta.title}}</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
    export default {
        name: "Bread"
    }
</script>

<style scoped>

</style>