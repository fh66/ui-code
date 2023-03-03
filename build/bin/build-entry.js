// build-entry.js
let render = require('json-templater/string');
let uppercamelcase = require('uppercamelcase');
let endOfLine = require('os').EOL;

let strs = `{{include}}
const components = [
  {{list}}
];
const install = function(Vue, opts = {}) {
  Vue.use(param);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$toast = Toast;
};
export default {
  install,
  {{list}}
};
`;

let Components = require('../../components.json')
let ComponentNames = Object.keys(Components);
let IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
let includeComponentTemplate = [];
let listTemplate = [];

ComponentNames.forEach(name => {
    var componentName = uppercamelcase(name);
    includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
        name: componentName,
        package: name
    }));
    listTemplate.push(`  ${componentName}`);
})
// 引入公共参数
includeComponentTemplate.unshift("import param from './utils/param.js';");
let template = render(strs, {
    include: includeComponentTemplate.join(endOfLine),
    list: listTemplate.join(',' + endOfLine),
});

// 写入文件
let path = require('path');
let fs = require('fs');
let OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
fs.writeFileSync(OUTPUT_PATH, template);
