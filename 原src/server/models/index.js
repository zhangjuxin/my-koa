/**
 * @fileoverview  实现index的数据模型
 * @author zhangjuxin
 */
const SafeRequest = require('../utils/SafeRequest');

class Index {
    constructor(app) {}
    /**
     * @description  获取数据
     * @param {*} options  配置参数
     * 
     */
    getDate(options) {
        const safeRequest = new SafeRequest("hello/index");
        return safeRequest.fetch({});
    }
}
module.exports = Index;