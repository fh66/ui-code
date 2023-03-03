// 监听命令行退出
process.on('exit', () => {
    console.log('命令行退出了');
});
// 执行 npm run new xxx 必须填写组件名, 否则直接结束命令
if (!process.argv[2]) {
    console.error('[组件名]必填 - Please enter new component name');
    process.exit(1);
}

// 引入相关模块
const path = require('path');
const fs = require('fs')
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase')
const componentsFile = require('../../components.json');

// 获取第一个参数
const componentname = process.argv[2];
// 绝对路径: 定位到你项目的packages目录下
const PackagePath = path.resolve(__dirname, '../../packages', componentname);
const ComponentName = uppercamelcase(componentname)
// 获取 components.json 的内容
if (componentsFile[componentname]) {
    console.error(`${componentname} 已存在.`);
    process.exit(1); // 如果 components.json 文件中已经有新组件的定义, 直接就退出命令行, 组件目录也不用生成了
}
// 添加新组件定义
componentsFile[componentname] = `./packages/${componentname}/index.js`;
// 把最终结果写回 components.json 文件中
fileSave(path.join(__dirname, '../../components.json'))
    .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
    .end('\n');

// 获取总样式文件 index.less 路径
const lessPath = path.join(__dirname, '../../packages/theme-chalk/src/index.less')
// 读取文件原本的内容, 再添加写新组件样式的导入
const lessImportText = `${fs.readFileSync(lessPath)}@import "./${componentname}.less";`;
// 写入最终结果
fileSave(lessPath)
    .write(lessImportText, 'utf8')
    .end('\n');
// 定义需要创建的文件
const Files = [
    {
        filename: 'index.js',
        content: `import ${ComponentName} from './src/main.vue'
${ComponentName}.install = function(Vue) { 
    Vue.component(${ComponentName}.name, ${ComponentName});
};
export default ${ComponentName};
            `,
    },
    {
        filename: 'src/main.vue', 
        content: `<template>
    <div class="gm-m-${componentname}">${componentname}</div>
</template>
            
<script>
export default {
    name: 'GmM${ComponentName}'
};
</script>
            `,
    },
    {
        filename: `../theme-chalk/src/${componentname}.less`,
        content: `@import "common/var";`
    }
];

// 循环创建定义的文件
Files.forEach(file => {
    fileSave(path.join(PackagePath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});
