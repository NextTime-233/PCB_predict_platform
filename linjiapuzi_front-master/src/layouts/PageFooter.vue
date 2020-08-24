<template>
    <div class="footer">
        <div class="links">
            <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in linkList">
                <a-icon v-if="item.icon" :type="item.icon"/>{{item.name}}
            </a>
        </div>
        <div class="copyright">
            Copyright<a-icon type="copyright" />{{copyright}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageFooter",
        props: ['copyright', 'linkList']
    }
</script>
<!--@text-color-second: blue;-->
<style lang="less" scoped>
    @import "src/theme/color";
    .footer{
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
        position: fixed;
        left: 50%;
        bottom: 10px;
    .copyright{
        color: @text-color-second;
        font-size: 14px;
    }
    .links{
        margin-bottom: 8px;
    a:not(:last-child) {
        margin-right: 40px;
    }
    a{
        color: @text-color-second;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
    }
    }
</style>