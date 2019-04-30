//首页的路由
// 路由模块
import router from 'koa-simple-router';
import IndexController from './IndexController';
const indexController = new IndexController();
// let app = new Koa()

export default (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex())
    }))
    app.use(router(_ => {
        _.get('/add', indexController.actionAdd())
    }))
}