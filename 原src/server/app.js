const Koa = require('koa');
const app = new Koa();
const co = require('co');
const config = require('./config');
var log4js = require('log4js');
const logger = log4js.getLogger('cheese');
//处理错误的文件
const errorHandler = require('./middleware/errorHandler');
//错误处理
errorHandler.error(app, logger);
//初始化所有路由
require('./controllers/index')(app);
const {
    join
} = require('path');

//koa静态资源的
const serve = require('koa-static');
app.use(serve(config.staticDir));
//日志的设置
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'logs/my.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});

const render = require('koa-swig');
app.listen(config.port, () => {
    console.log('开启ok');
})
//模板渲染
app.context.render = co.wrap(render({
    // ...your setting
    root: join(config.viewDir),
    autoescape: true,
    cache: false,
    // cache: 'memory', // ssr性能的瓶颈都在一句话
    ext: 'html',
    writeBody: false //默认（真）自动写入body和response
}));