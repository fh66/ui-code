// build/webpack.common.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'gm-ui.js',
        libraryTarget: 'commonjs2', // 将库的返回值分配给module.exports
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
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@/utils': path.resolve('./src/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false // 打包后清除多余的空格
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
