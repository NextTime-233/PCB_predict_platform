<template>
    <a-breadcrumb>
        <a-breadcrumb-item>轨道交通轴承故障智能诊断系统</a-breadcrumb-item>
<!--        <a-breadcrumb-item><a :href=hrefs>{{this.$route.meta.module}}</a></a-breadcrumb-item>-->
        <!--                        <a-breadcrumb-item><a href="">{{}}</a></a-breadcrumb-item>-->
        <a-breadcrumb-item>{{this.$route.meta.module}}</a-breadcrumb-item>
        <a-breadcrumb-item>{{this.$route.meta.title}}</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
    export default {
        name: "Bread",
        data(){
            return{
                // hrefs: "http://localhost:8082"+this.$route.path
            }
        }
    }
</script>

<style scoped>

</style>