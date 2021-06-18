/**
 * webpack 配置文件
 * author：fengsen   2021-06-12
 * */
const path = require('path')
// 引入  html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // 入口
    entry: {
        // 公用css
        commonCSS: './src/js/commonCSS.js',
        dom: './src/js/common/dom.js',
        http: './src/js/common/http.js',
        utils: './src/js/common/utils.js',

        //三方插件
        captcha: './src/lib/captcha/captcha-mini.js',
        swiper: './src/lib/swiper/swiper-bundle.js',

        //多页面
        index: './src/js/index.js',
        login: './src/js/login.js',
        advertisement: './src/js/advertisement.js',
        register: './src/js/register.js',
        mine: './src/js/mine.js',
        sports: './src/js/sports.js',
        drill: './src/js/drill.js',
        amend: './src/js/amend.js',
        introduce: './src/js/introduce.js',
        sportsdata: './src/js/sportsdata.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    // 解释器loader
    module: {
        rules: [
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 15 * 1024,
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            },
        ]
    },
    plugins: [
        //主页 index.js
        new HtmlWebpackPlugin({
            template: './src/page/index.html',
            filename: 'index.html',
            chunks: ['index', 'commonCSS', 'dom', 'swiper', 'utils', 'http']
        }),
        // 登录页login.html
        new HtmlWebpackPlugin({
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 广告页 advertisement.html
        new HtmlWebpackPlugin({
            template: './src/page/advertisement.html',
            filename: 'advertisement.html',
            chunks: ['advertisement', 'commonCSS', 'dom']
        }),
        // 注册页 register
        new HtmlWebpackPlugin({
            template: './src/page/register.html',
            filename: 'register.html',
            chunks: ['register', 'commonCSS', 'dom', 'captcha', 'http', 'utils']
        }),
        // 运动页
        new HtmlWebpackPlugin({
            template: './src/page/sports.html',
            filename: 'sports.html',
            chunks: ['sports', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 我的
        new HtmlWebpackPlugin({
            template: './src/page/mine.html',
            filename: 'mine.html',
            chunks: ['mine', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 训练
        new HtmlWebpackPlugin({
            template: './src/page/drill.html',
            filename: 'drill.html',
            chunks: ['drill', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 修改
        new HtmlWebpackPlugin({
            template: './src/page/amend.html',
            filename: 'amend.html',
            chunks: ['amend', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 运动数据
        new HtmlWebpackPlugin({
            template: './src/page/sportsdata.html',
            filename: 'sportsdata.html',
            chunks: ['sportsdata', 'commonCSS', 'dom', 'http']
        }),
        // 介绍
        new HtmlWebpackPlugin({
            template: './src/page/introduce.html',
            filename: 'introduce.html',
            chunks: ['introduce', 'commonCSS', 'dom', 'http', 'utils']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    // mode环境
    mode: 'development',

    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'login.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
