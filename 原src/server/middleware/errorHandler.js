const errHandler = {
    error(app, logger) {
        //监控500的错误
        app.use(async (ctx, next) => {
            console.log('------+++++++++++++++++++++++++++');
            try {
                await next();
            } catch (e) {
                logger.error(e);
                ctx.status = 200;
                ctx.body = "<h1>哇呜😿~~~网站出错了</h1>";
            }
        });
        //监控404错误
        app.use(async (ctx, next) => {
            console.log('00000000');
            await next();
            console.log('111111111');
            if (404 != ctx.status) {
                return;
            }
            console.log(ctx.url, '=========');
            logger.error(`${ctx.url}--找不到该路由`);
            ctx.status = 200;
            ctx.body = '找不到了404';
        })
    }
}
module.exports = errHandler;
/**
  ------+++++++++++++++++++++++++++
00000000
111111111
------+++++++++++++++++++++++++++
00000000
111111111
 */