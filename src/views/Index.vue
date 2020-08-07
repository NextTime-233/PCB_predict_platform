<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <!--   主页logo跳转   -->
            <div class="logo">{{collapsed?'LJPZ':'林家铺子后台管理系统'}}</div>
            <a-menu :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    mode="inline"
                    :theme="theme"
                    :selected-keys="[current]"
                    @click="handleClick">
                <a-menu-item key="1">
                    <a-icon type="idcard" />公司员工
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="appstore" /><span></span>营销数据</span>
                    <a-menu-item key="2">
                        货品档案
                    </a-menu-item>
                    <a-menu-item key="3">
                        订单一体化
                    </a-menu-item>
                    <a-sub-menu key="sub1-2" title="商品订单">
                        <a-menu-item key="4">
                            订单管理
                        </a-menu-item>
                        <a-menu-item key="5">
                            订单明细
                        </a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="setting" /><span>用户档案</span></span>
                    <a-menu-item key="6">
                        用户信息
                    </a-menu-item>
                    <a-menu-item key="7">
                        用户画像
                    </a-menu-item>
                    <a-menu-item key="8">
                        数据分析
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
            <a-switch
                    default-checked
                    checked-children="dark"
                    un-checked-children="light"
                    @change="changeTheme"
            />
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; display: flex; justify-content: space-between; align-items: center">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
                <template>
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            limlin <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;">修改密码</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">个人中心</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
                <el-button type="info" @click="logOut">退出登录</el-button>
            </a-layout-header>

            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
            <!--路由占位符-->
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                collapsed: false,
                // 导航栏
                current: '1',
                theme: 'dark',
            };
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
            changeTheme(checked) {
                this.theme = checked ? 'dark' : 'light';
            },
        }
    };
</script>
<style lang="less" scoped>
    #components-layout-demo-custom-trigger{
        height: 960px;
    }
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        line-height: 32px;
        color: white;
        text-align: center;
        letter-spacing: 1px;
        font-weight: bold;
    }
</style>
