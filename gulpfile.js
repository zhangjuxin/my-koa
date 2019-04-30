// 开发环境
const gulp = require('gulp');
// 编译es6
const babel = require('gulp-babel');
const watch = require('gulp-watch');
//清洗流的模块
const rollup = require('gulp-rollup');
// 需要清洗的文件
const cleanEntry = "./src/server/config/index.js";
//编译的入口文件
const entry = "./src/server/**/*.js";
//在编译文件的时候替换文件中的字符串（清洗config文件的开发环境判断）
const replace = require("rollup-plugin-replace");
//eslint
const eslint = require('gulp-eslint');

function builddev() {
    return watch(entry, { ignoreInitial: false }, function() {
        gulp.src(entry)
            .pipe(babel({
                // 关闭掉外部的babelrc的干扰
                babelrc: false,
                // 编译es6的import的plugins
                "plugins": ['@babel/plugin-transform-modules-commonjs']
            }))
            .pipe(gulp.dest('dist/server'))
    })
}

// 上线环境
function buildprod() {
    return gulp.src(entry)
        .pipe(babel({
            // 关闭掉外部的babelrc的干扰
            babelrc: false,
            // 编译es6的import的plugins
            "plugins": ['@babel/plugin-transform-modules-commonjs'],
            //忽略的文件
            ignore: [cleanEntry]
        }))
        .pipe(gulp.dest('dist'))
}
// 清洗config文件
function buildconfig() {
    return gulp.src(entry)
        .pipe(rollup({
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ],
            output: {
                format: "cjs" //commonjs
            },
            input: cleanEntry
        }))
        .pipe(gulp.dest('./dist'));
}

// 代码校验
function buildhint() {
    return gulp.src([entry])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

let build = gulp.series(builddev);
//先完成核心的编译流程再去清洗文件
if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == 'hint') {
    build = gulp.series(buildhint);
}
gulp.task('default', build);