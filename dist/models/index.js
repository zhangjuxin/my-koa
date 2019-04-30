"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview  实现index的数据模型
 * @author zhangjuxin
 */
class Index {
  constructor() {}
  /**
   * @description  获取数据
   * @param {*} options  配置参数
   * 
   */


  getDate(options) {
    const safeRequest = new _SafeRequest.default("hello/index");
    return safeRequest.fetch({});
  }

}

var _default = Index;
exports.default = _default;