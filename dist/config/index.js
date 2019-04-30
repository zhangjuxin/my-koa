'use strict';

var lodash = require('lodash');
var path = require('path');

let config = {
    // 模板路径
    "viewDir": path.join(__dirname, '..', 'views'),
    // 静态资源路径
    "staticDir": path.join(__dirname, '..', 'assets')
};
//开发环境
//cross-env可以设置"production"
// 上线环境
{
    const prodConfig = {
        port: 80,
        baseUrl: 'http://localhost:8080/yii2.0/web/index.php?r='
    };
    config = lodash.extend(config, prodConfig);
}

var config$1 = config;

module.exports = config$1;
