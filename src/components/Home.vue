<template>
    <div>
        <h3>Welcome</h3>

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