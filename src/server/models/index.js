/**
 * @fileoverview  实现index的数据模型
 * @author zhangjuxin
 */
import SafeRequest from '../utils/SafeRequest';

class Index {
    constructor() {}
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
export default Index;