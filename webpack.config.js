var argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
console.log(argv.mode, '🍎当前的环境');
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const glob = require('glob');
// 找到views的入口文件
const files = glob.sync("./src/web/views/**/*.entry.js");
/*
 [ './src/web/views/books/books-add.entry.js',
  './src/web/views/books/books-index.entry.js' ]
*/
let _entry = {};
// 对views的入口文件进行分析
for (let item of files) {
    if (/.+\/([a-zA-z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entryKey = RegExp.$1;
        console.log('🍊', entryKey); // books-add  books-index
        //html-plugin 
        //注册插件   html-plugin  送到dist之前，插入静态资源
    }
}

// views  --  components  --  js css 
console.log('🍎', files);

let webpackConfig = {
    entry: _entry
};
module.exports = merge(webpackConfig, _mergeConfig);
//{ _: [], mode: 'development' }
/**
 * [ '/usr/local/bin/node',
  '/Users/apple/Desktop/my-koa-2/node_modules/.bin/webpack',
  '--mode',
  'development' ] '🍎'

  属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。 
  第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，
  参阅 process.argv0。 
  第二个元素将是正在执行的 JavaScript 文件的路径。 
  其余元素将是任何其他命令行参数。
 */