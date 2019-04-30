"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
  constructor() {}

  actionIndex() {
    //因为渲染是异步的，所以使用async,因为使用了koa-swig模板，所以ctx上有了render方法
    return async (ctx, next) => {
      const index = new _index.default();
      const result = await index.getDate();
      console.log(index.getDate(), '🍉'); //promise

      console.log(result); //返回的是数据，因为promise已经resolve或者reject

      const data = result.data;
      ctx.body = await ctx.render('index', {
        data
      });
    };
  }

  actionAdd(ctx, next) {
    return async (ctx, next) => {
      ctx.body = await ctx.render('add');
    };
  }

}

var _default = IndexController;
exports.default = _default;