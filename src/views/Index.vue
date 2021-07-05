<!--整体框架-->
<template>
    <div id="layout-demo">
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" v-model="collapsed" :trigger="null" collapsible>
            <!--   主页logo跳转   -->
            <div class="logo">
                <!--<img src="../assets/logo.png" style="height: 55px; width: 96px;"/>-->
                {{collapsed?'BEARING':'轨道交通轴承智能诊断系统'}}
            </div>
            <a-menu class="left-menu"
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub0']"
                    mode="inline"
                    :theme="theme"
                    :selected-keys="[current]"
                    @click="handleClick">
                <!--<a-sub-menu  key="sub0">-->
                    <a-menu-item key="1">
                        <router-link to="/Analysis" tag="div">
                            <a-icon type="home" /><span>数据中心管理</span>
                            <!--<span>数据分析</span>-->
                        </router-link>
                    </a-menu-item>
                <!--</a-sub-menu>-->
                <!--<a-sub-menu v-show="boss" key="sub1">-->
                    <!--<span slot="title"><a-icon type="team" /><span>用户管理</span></span>-->
                    <!--<a-menu-item  key="2">-->
                        <!--<router-link to="/employee" tag="div">-->
                            <!--<span>用户管理</span>-->
                        <!--</router-link>-->
                    <!--</a-menu-item>-->
                <!--</a-sub-menu>-->
                <!--<a-sub-menu key="sub2">-->

                    <a-menu-item key="3">
                        <!--<span slot="title">-->

                        <!--</span>-->
                        <router-link to="/Lable" tag="div">
                            <a-icon type="edit" />
                            <span>监测与预警管理</span>
                            <!--<span>标签管理</span>-->
                        </router-link>
                    </a-menu-item>
                    <!--<a-sub-menu key="4" title="客户画像">-->
                        <!--<a-menu-item key="8">-->
                            <!--<router-link to="/userImage" tag="div">-->
                                <!--<span>全体客户画像</span>-->
                            <!--</router-link>-->
                        <!--</a-menu-item>-->
                        <!--<a-menu-item key="9">-->
                            <!--<router-link to="/important" tag="div">-->
                                <!--<span>重要客户画像</span>-->
                            <!--</router-link>-->
                        <!--</a-menu-item>-->
                        <!--<a-menu-item key="10">-->
                            <!--<router-link to="/Repurchase" tag="div">-->
                                <!--<span>高复购客户画像</span>-->
                            <!--</router-link>-->
                        <!--</a-menu-item>-->
                    <!--</a-sub-menu>-->
                <!--</a-sub-menu>-->
                <a-sub-menu key="sub3">
                    <span slot="title"><a-icon type="hdd" theme="filled"/><span>数据预处理</span></span>
                    <a-menu-item key="5">
                        <router-link to="/Client" tag="div">
                            <span>特征提取</span>
                        </router-link>
                    </a-menu-item>
                    <!--<a-menu-item key="6">-->
                        <!--<router-link to="/manage" tag="div">-->
                            <!--<span>订单管理</span>-->
                        <!--</router-link>-->
                    <!--</a-menu-item>-->
                    <!--<a-menu-item key="7">-->
                        <!--<router-link to="/purchase" tag="div">-->
                            <!--<span>货品档案</span>-->
                        <!--</router-link>-->
                    <!--</a-menu-item>-->
                </a-sub-menu>
                <!--<a-sub-menu v-show="admin" key="sub4">-->
                    <!--<span slot="title"><a-icon type="codepen-square" theme="filled" /><span>增量维护</span></span>-->
                    <!--<a-menu-item key="8">-->
                        <!--<router-link to="/increment" tag="div">-->
                            <!--<span>增量维护</span>-->
                        <!--</router-link>-->
                    <!--</a-menu-item>-->
                <!--</a-sub-menu>-->
<!--              11.2 syf-->
              <a-sub-menu key="sub5">
                <span slot="title"><a-icon type="hdd" theme="filled"/><span>故障诊断模型</span></span>
                <a-menu-item key="9">
                  <router-link to="/Wkcnn" tag="div">
                      <span>模型训练</span>
                  </router-link>
              </a-menu-item>
                  <a-menu-item key="10">
                      <router-link to="/Kcnn" tag="div">
                          <span>实时诊断</span>
                      </router-link>
                  </a-menu-item>
              </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: '200px' }">
            <a-layout-header style="background: #fff; padding: 0px 20px; display: flex; justify-content: space-between; align-items: center">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
                <div>
                    <a-dropdown class="self">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar style="backgroundColor:#87d068; margin-right:10px" icon="user" />
                            {{user}}
                            <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay" style="margin-top:10px">
<!--                            <a-menu-item>-->
<!--                                <router-link to="/Home" tag="div">-->
<!--                                    <span>个人中心</span>-->
<!--                                </router-link>-->
<!--                                &lt;!&ndash;                                <a href="javascript:;"></a>&ndash;&gt;-->
<!--                            </a-menu-item>-->
                            <a-menu-item>
                                <router-link to="/ResetPassword" tag="div">
                                    <span>修改密码</span>
                                </router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" @click="logOut">退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '106vh'}">
            <!--路由占位符-->
                <bread></bread>
                <router-view></router-view>
<!--                <page-footer></page-footer>-->
            </a-layout-content>
        </a-layout>
    </div>
</template>
<script>
    import Bread from "../components/Bread";
    // import PageFooter from "../layouts/PageFooter";
    export default {
        name: 'index',
        components: {Bread},
        // components: {Bread, PageFooter},
        data() {
            return {
                user: window.sessionStorage.getItem('user'),
                collapsed: false,
                // 导航栏
                current: '1',
                theme: 'dark',
                // 页面标签
                selectedKeys: [],
                openKeys: [],
                // 角色判断
                boss: false,
                admin: false,
            };
        },
        watch: {
          $route() {
            // console.log(this.$route.meta);
            document.title = '轴承诊断系统 - ' + this.$route.meta.title
          }
        },
        // 路由页面标签
        created() {
            if(this.$route.meta && this.$route.meta.module){
                this.openKeys = [this.$route.meta.module];
            }
            this.selectedKeys = [this.$route.path];
            // 权限设置
            const limit = window.sessionStorage.getItem('limit');
            console.log('boss here');
            console.log(limit);
            if(limit>0){
                this.boss = true;
                // console.log('已经执行');
            }
            if(limit>1){
                this.admin = true;
                // console.log('已经执行2');
            }
        },
        methods:{
            logOut() {
                window.sessionStorage.clear()
                // 必须加$符号
                this.$router.push('/Login')
            },
            // 导航栏
            handleClick(e) {
                // console.log('click ', e);
                this.current = e.key;
            },
        }
    };
</script>

<style lang="less" scoped>
    #layout-demo{
        height: 100%;
        .trigger {
            font-size: 20px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }
        .trigger:hover {
            color: #1890ff;
        }
        .self {
            margin-left: 100px;
        }
        .logo {
            margin-top: 12px;
            margin-left: 12px;
            line-height: 32px;
            color: white;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .head-example {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            padding-top: 5px;
            /*background: #eee;*/
            display: inline-block;
        }
    }
</style>
