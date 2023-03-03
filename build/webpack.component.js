// webpack.components.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Components = require('../components.json'); // 引入组件的配置文件

const webpackConfig = {
    mode: 'production',
    entry: Components, // {'button': './packages/button/index.js'}
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: '[name].js', // 组件名
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@/utils': path.resolve('./src/utils'),
        }
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        Taro: {
            root: 'Taro',
            commonjs: 'Taro',
            commonjs2: 'Taro',
            amd: 'Taro'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(png|svg|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:7].[ext]',
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
module.exports = webpackConfig;
