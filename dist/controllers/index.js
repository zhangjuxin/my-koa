"use strict";

//首页的路由
// 路由模块
const router = require('koa-simple-router');

const IndexController = require('./IndexController');

const indexController = new IndexController(); // let app = new Koa()

module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex());
  }));
  app.use(router(_ => {
    _.get('/add', indexController.actionAdd());
  }));
};