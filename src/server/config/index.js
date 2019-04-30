import { extend } from "lodash";
import { join } from 'path';
let config = {
    // 模板路径
    "viewDir": join(__dirname, '..', 'views'),
    // 静态资源路径
    "staticDir": join(__dirname, '..', 'assets')
};
//开发环境
//cross-env可以设置process.env.NODE_ENV
if (process.env.NODE_ENV == "development") {
    const localConfig = {
        port: 3000,
        baseUrl: 'http://localhost:8080/yii2.0/web/index.php?r='
    }
    config = extend(config, localConfig);
}
// 上线环境
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        port: 80,
        baseUrl: 'http://localhost:8080/yii2.0/web/index.php?r='
    }
    config = extend(config, prodConfig);
}

export default config;