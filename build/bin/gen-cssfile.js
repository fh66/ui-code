let fs = require('fs')
let path = require('path')
let Components = require('../../components.json') // 引入组件的配置文件
Components = Object.keys(Components)

/** 文件类型:
 * 'theme-chalk': 表示自动生成的是 .less 文件;
 * 'theme-default': 表示自动生成的是 .css 文件.
 */
var themes = ['theme-chalk'];
// 绝对路径: 定位到你项目的packages目录下
var basepath = path.resolve(__dirname, '../../packages/');

// 判断一个文件是否存在工具函数
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}
themes.forEach((theme) => {
    let isLESS = theme !== 'theme-default';
    // index.less文件开头第一句默认引入base.less文件, base.less文件为图标或者动画样式
    let indexContent = isLESS ? '@import "./base.less";\n' : '@import "./base.css";\n';
    Components.forEach(function(key) {
        if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
        let fileName = key + (isLESS ? '.less' : '.css');
        // 组件在 index.less 中引入
        indexContent += '@import "./' + fileName + '";\n';
        let filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            fs.writeFileSync(filePath, '', 'utf8');
            console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
        }
    });
    // 把 indexContent 内容写入 index.scss 中, 每次都进行覆盖
    fs.writeFileSync(path.resolve(basepath, theme, 'src', isLESS ? 'index.less' : 'index.css'), indexContent);
});