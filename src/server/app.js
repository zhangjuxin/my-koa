import Koa from 'koa';
const app = new Koa();
import { wrap } from 'co';
import { staticDir, port, viewDir } from './config';
import { getLogger, configure } from 'log4js';
const logger = getLogger('cheese');
//处理错误的文件
import { error } from './middleware/errorHandler';
//错误处理
error(app, logger);
//初始化所有路由
//初始化所有路由
//初始化所有路由
//初始化所有路由
require('./controllers/index').default.default
require('./controllers/index').default(app);
import { join } from 'path';

//koa静态资源的
import serve from 'koa-static';
app.use(serve(staticDir));
//日志的设置
configure({
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

import render from 'koa-swig';
app.listen(port, () => {
    console.log('开启ok');
})
//模板渲染
app.context.render = wrap(render({
    // ...your setting
    root: join(viewDir),
    autoescape: true,
    cache: false,
    // cache: 'memory', // ssr性能的瓶颈都在一句话
    ext: 'html',
    writeBody: false //默认（真）自动写入body和response
}));