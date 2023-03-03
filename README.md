# 项目概述
组件库技术选型上采用基于`Vue2`、`Webpack4.X`、`gulp`进行构建的UI组件库，为APP-C提供组件支持。

# 安装依赖
* 执行依赖安装： npm install

# 组册组件
* 若组件内部需要引入其他组件的话需要在相应的less文件继续引入其他组件的less文件否则打包后会造成改组件部分样式丢失

# 项目构建命令
* 新建组件文件： npm run new xxx   // xxx为组件名
* 引入组件： npm run build:entry
* 补全LESS缺失文件： npm run gen
* 打包组件： npm run build // 打包目录：lib/
* 打包样式： npm run build:theme // 打包目录：packages/theme-chalk
* 生成.tgz包： npm pack
* 使用.tgz包： npm install 本地放置tgz包的全路径
* 启动项目： npm run serve
# 打包组件库
* npm pack
# 按需引入
* npm install t --save-dev
* 创建babel.config.js
* 代码如下
```js
module.exports = {
    plugins: [
        [
            "import",
            {
                "libraryName": "gm-ui-code",
                "customName": (name) => {
                    let componentName = name.replace('gm-m-', '')
                    return `gm-ui-code/lib/${componentName}.js`;
                },
                "style": (name) => {
                    let styleName = name.replace('gm-ui-code/lib', 'gm-ui-code/lib/theme-chalk')
                    return `${styleName.substring(0,styleName.length-3)}.css`;
                }
            }
        ]
    ]
}
```