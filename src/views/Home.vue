<template>
    <div>
        <el-button type="info" @click="logOut">退出登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            logOut() {
                window.sessionStorage.clear()
                // 必须加$符号
                this.$router.push('/Login')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>