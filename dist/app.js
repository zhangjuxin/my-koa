"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _co = require("co");

var _config = require("./config");

var _log4js = require("log4js");

var _errorHandler = require("./middleware/errorHandler");

var _path = require("path");

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
const logger = (0, _log4js.getLogger)('cheese'); //处理错误的文件

//错误处理
(0, _errorHandler.error)(app, logger); //初始化所有路由
//初始化所有路由

require('./controllers/index').default(app);

app.use((0, _koaStatic.default)(_config.staticDir)); //日志的设置

(0, _log4js.configure)({
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
app.listen(_config.port, () => {
  console.log('开启ok');
}); //模板渲染

app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  // ...your setting
  root: (0, _path.join)(_config.viewDir),
  autoescape: true,
  cache: false,
  // cache: 'memory', // ssr性能的瓶颈都在一句话
  ext: 'html',
  writeBody: false //默认（真）自动写入body和response

}));