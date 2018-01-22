var webpack=require('webpack');
var path = require('path');

module.exports={
    //插件项
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options:{
                vue:{
                    loaders: {
                        js: 'babel-loader?{"presets":["es2015"]}'
                    }
                }
            }
        })
    ],
    //页面入口文件配置
    entry:{
        index: './public/js/main.js',
        login:'./public/js/account/js/login.js'
    },
    //入口文件输出配置
    output:{
        path:path.resolve(__dirname, 'dist/'),
        filename:"[name].min.js",
        chunkFilename: '[id].[chunkhash].js'
    },
    module:{
        //加载器配置
        rules:[
            /*{test:/\.css$/,loader:"style-loader!css-loader"},*/
            {test:/\.css$/,loader:"style-loader!css-loader!stylus-loader"},
            {test: /\.vue$/,exclude: /node_modules/,loader:'vue-loader'},
            {test:/\.js$/,exclude: /node_modules/,loader: ['babel-loader?{"presets":["es2015"]}']},//$ npm install babel-loader
            /*{test:/\.scss$/,loader:"style!css!sass?sourchMap"},*/
            {
                test:/\.(png|jpe?g|gif|svg)$/,
                loader:"url-loader?limit=10000",
                options: {
                    limit: 10000
                }
            }
        ]
    },
    resolve:{
        //其它解决方案配置,最后是 resolve 配置，配置查找模块的路径和扩展名和别名（方便书写）
        extensions:[ '.js', '.json', '.scss', '.vue','.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, './public/js'),
            'assets': path.resolve(__dirname, './public/images'),
            'components': path.resolve(__dirname, './public/js/')
        }
    }
};