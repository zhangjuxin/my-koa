//因为浏览器支持fetch,以后如果前端的代码复制到node也可以执行
import fetch from 'node-fetch';
import config from '../config';
/**
 * @author:zhangjuxin
 * @description:安全请求模块，fetch为请求关键方法
 * @param  url  请求链接
 * @param  options  object  请求参数 
 * @example fetch({
 *          method : post
 *           params : {
 *                  username:zhangjuxin
 *                   .........
 *              }
 *      })
 */
class SafeRequest {
    constructor(url) {
        this.url = url;
        this.baseUrl = config.baseUrl;
    }
    fetch(options) {
        //get请求
        let ydfetch = fetch(this.baseUrl + this.url);
        //有参数
        if (options) {
            ydfetch = fetch(this.baseUrl + this.url, {
                method: options.method,
                body: options.params
            });
        }
        return new Promise((resolve, reject) => {
            let result = {
                code: 0,
                message: "",
                data: []
            };
            ydfetch
                .then((res) => {
                    let _json = {};
                    try {
                        _json = res.json();
                    } catch (e) {
                        //发邮件
                    }
                    return _json;
                })
                .then((json) => {
                    result.data = json;
                    resolve(result);
                })
                .catch((err) => {
                    result.message = "接口异常";
                    reject(result);
                })
        })
    }
}

export default SafeRequest;