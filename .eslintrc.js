module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['eslint:recommended', 'plugin:vue/recommended'],
    // required to lint *.vue files
    plugins: ['vue', 'prettier'],
    // add your custom rules here
    rules: {
        'indent': 1, // 缩进
        // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
        'for-direction': 'error',
        // 禁止与负零进行比较
        'no-compare-neg-zero': 'error',
        // 禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
        'no-cond-assign': [
            'error',
            'except-parens'
        ],
        // 禁止在函数参数中出现重复名称的参数
        'no-dupe-args': 'error',
        // 禁止在对象字面量中出现重复名称的键名
        'no-dupe-keys': 'error',
        // 禁止在 switch 语句中出现重复测试表达式的 case
        'no-duplicate-case': 'error',
        // @fixable 禁止出现多余的分号
        'no-extra-semi': 'error',
        // @fixable 禁止函数表达式中出现多余的括号，比如 let foo = (function () { return 1 })
        'no-extra-parens': [
            'error',
            'functions'
        ],
        // 禁止在 if 代码块内出现函数声明
        'no-inner-declarations': [
            'error',
            'both'
        ],
        // 禁止在数组中出现连续的逗号，如 let foo = [,,]
        'no-sparse-arrays': 'error',
        // @fixable 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true,
                exceptions: {
                    Property: true,
                    BinaryExpression: false,
                    VariableDeclarator: true,
                    ImportDeclaration: true
                }
            }
        ],
        // 禁止直接 new 一个类而不赋值
        'no-new': 'error',
        // 禁止重复定义变量
        'no-redeclare': 'error',
        // 禁止在 return 语句里使用 await
        'no-return-await': 'error',
        // 禁止出现 location.href = 'javascript:void(0)';
        'no-script-url': 'error',
        // 禁止将自己赋值给自己
        'no-self-assign': 'error',
        // 禁止将自己与自己比较
        'no-self-compare': 'error',
        // 禁止无用的表达式
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
            }
        ],
        // 定义过的变量必须使用
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                caughtErrors: 'none',
                ignoreRestSiblings: true
            }
        ],
        // @fixable 对象字面量中冒号前面禁止有空格，后面必须有空格
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            }
        ],
        // @fixable 关键字前后必须有空格
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        // 函数的参数禁止超过 7 个
        'max-params': [
            'error',
            7
        ],
        // new 后面的类名必须首字母大写
        'new-cap': [
            'error',
            {
                newIsCap: true,
                capIsNew: false,
                properties: true
            }
        ],
        // @fixable 禁止出现超过三行的连续空行
        'no-multiple-empty-lines': [
            'error',
            {
                max: 3,
                maxEOF: 1,
                maxBOF: 1
            }
        ],
        // @fixable 注释的斜线或 * 后必须有空格
        'spaced-comment': [
            'error',
            'always',
            {
                block: {
                    exceptions: [
                        '*'
                    ],
                    balanced: true
                }
            }
        ],
        // @fixable case 的冒号前禁止有空格，冒号后必须有空格
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/no-side-effects-in-computed-properties': 1,
        'generator-star-spacing': 'off',
        "vue/return-in-computed-property": ["error", {
            "treatUndefinedAsUnspecified": false
        }],
        "vue/no-unused-components": ["error", {
            "ignoreWhenBindingPresent": true
        }],
        "vue/attribute-hyphenation": ["error", "always", {
            "ignore": []
        }],
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
            "ignores": []
        }],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "always"
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/html-quotes": ["error", "double"],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/multiline-html-element-content-newline": ["error", {
            "ignoreWhenEmpty": true,
            "ignores": ["pre", "textarea"]
        }],
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/no-multi-spaces": ["error", {
            "ignoreProperties": false
        }],
        "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
        "vue/no-template-shadow": ["error"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/v-on-style": ["error", "shorthand"],
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                "UNIQUE",
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT"
            ]
        }],
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                "inheritAttrs",
                ["props", "propsData"],
                "data",
                "computed",
                "watch",
                "LIFECYCLE_HOOKS",
                "methods",
                "renderError"
            ]
        }],
        "vue/require-default-prop": "off"
    }
};

