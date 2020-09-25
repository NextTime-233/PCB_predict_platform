//package.json 中启动了dev和build两个环境

const path = require('path');

module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 基本路径
    // baseUrl: '/',
    // 输出文件目录
    // outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    //如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,
    // css相关配置
    //css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    // 开启 CSS source maps?
    //   sourceMap: false,
    // css预设器配置项
    //   loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
    // },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    //parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    //   pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: false,  // 配置运行项目是否自动开启浏览器
        host: 'localhost',  // 0.0.0.0，可以配置真机测试，根据个人需要可以配置成localhost
        port: 8082,  // 前端配置运行端口
        https: false,  //配置true的话是https安全通道但是如果没有后注册SSL会有警告
        hotOnly: false,
        //配置跨域
        proxy:{// 设置代理
            'backend': {     //这里最好有一个 /
                target: 'http://192.168.1.102:8080',  //后台接口域名
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^backend':''
                }
            }
        },
        before: app => {}  //请求本地资源类似node的express， `app` 是一个 express 实例
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}