<template>
    <a-layout id="layout-demo">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <!--   主页logo跳转   -->
            <div class="logo">{{collapsed?'LJPZ':'林家铺子后台管理系统'}}</div>
            <a-menu class="left-menu"
                    :default-selected-keys="['1']"
                    :default-open-keys="['']"
                    mode="inline"
                    :theme="theme"
                    :selected-keys="[current]"
                    @click="handleClick">
                <a-sub-menu  key="sub0">
                    <span slot="title"><a-icon type="appstore" /><span>公司管理</span></span>
                    <a-menu-item key="0">
                        <router-link to="/Analysis" tag="div">
                            <span>数据分析</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="1">
                    <router-link to="/employee" tag="div">
                        <span>员工管理</span>
                    </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="appstore" /><span>用户管理</span></span>
                    <a-menu-item key="2">
                        <router-link to="/EntireOrder" tag="div">
                            <span>标签管理</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <router-link to="/userImage" tag="div">
                            <span>客户画像</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="4">
                        <router-link to="/Client" tag="div">
                            <span>客户档案</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="setting" /><span>订单管理</span></span>
                        <a-menu-item key="5">
                            <router-link to="/detail" tag="div">
                                <span>订单明细</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="6">
                            <router-link to="/manage" tag="div">
                                <span>订单管理</span>
                            </router-link>
                        </a-menu-item>
                    <a-menu-item key="7">
                        <router-link to="/purchase" tag="div">
                            <span>货品档案</span>
                        </router-link>
                    </a-menu-item>

                </a-sub-menu>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; display: flex; justify-content: space-between; align-items: center">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
                <template>
<!--                    <a-icon type="bell" />-->

                    <a-dropdown class="self">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar style="backgroundColor:#87d068" icon="user" />
                            {{user}}<a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;">个人中心</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">修改密码</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" @click="logOut">退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-layout-header>

            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
            <!--路由占位符-->
                <bread></bread>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import Bread from "../components/Bread";
    export default {
        name: 'index',
        components: {Bread},
        data() {
            return {
                user: window.sessionStorage.getItem('user'),
                collapsed: false,
                // 导航栏
                current: '1',
                theme: 'dark',
                // 页面标签
                selectedKeys: [],
                openKeys: []
            };
        },
        watch: {
          $route() {
            console.log(this.$route.meta);
            document.title = '林家铺子 - ' + this.$route.meta.title
          }
        },
        // 路由页面标签
        created() {
            if(this.$route.meta && this.$route.meta.module){
                this.openKeys = [this.$route.meta.module];
            }
            this.selectedKeys = [this.$route.path];
        },
        methods:{
            logOut() {
                window.sessionStorage.clear()
                // 必须加$符号
                this.$router.push('/Login')
            },
            // 导航栏
            handleClick(e) {
                console.log('click ', e);
                this.current = e.key;
            },
        }
    };
</script>

<style lang="less" scoped>
    /*仿佛变窄了*/
    ::-webkit-scrollbar {
        width: 3px;
        height: 6px;
    }
    /*滚动区域背景*/
    ::-webkit-scrollbar-track-piece {
        -webkit-border-radius: 3px;
    }
    /*竖向滚动条*/
    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        -webkit-border-radius: 3px;
    }
    #layout-demo{
        height: 100vh;
        .left-menu{
            height: 85vh;
            overflow-y: scroll;
        }
    }
    #layout-demo .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #layout-demo .trigger:hover {
        color: #1890ff;
    }

    #layout-demo .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        line-height: 32px;
        color: white;
        text-align: center;
        letter-spacing: 1px;
        font-weight: bold;
    }
    .self {
        margin-right: 15px;
    }
</style>
