// gulpfile.js
'use strict';
const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
    return src('./src/*.less')
        .pipe(less()) // 转成CSS
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        })) // 补全
        .pipe(cssmin()) // 压缩
        .pipe(dest('./lib')); // 在当前目录下的lib文件夹输出最终文件
}
function copyfont() {
    return src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
