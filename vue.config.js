// vue.config.js
const UniappToGroup = require('uniapp-to-group')
module.exports = {
    configureWebpack: {
        plugins: [
            new UniappToGroup({
                // 对应 package.json 中引入插件步骤
                package: {
                    'ttPlugins': {
                        'dependencies': {
                            // 注册交易模版插件
                            'microapp-trade-plugin': {
                                'version': '1.0.0',
                                'isDynamic': true
                            }
                        }
                    }
                },
                /**
                 * app 中可以是任何字段，插件会将字段和app.json对比，有就合并字段，没有就添加字段
                 * 合并字段 目前只处理 Array 和 Object 类型(注：[]和{}才会合并， null 类型不会合并)
                 * Object 类型字段合并，在key相同的情况会覆盖value
                 * Array 类型合并 是将两个数组合并
                */
                app: {
                    'pages': [
                        // 下单页
                        "ext://microapp-trade-plugin/order-confirm",
                        // 退款申请页
                        "ext://microapp-trade-plugin/refund-apply",
                        // 退款详情页
                        "ext://microapp-trade-plugin/refund-detail"
                    ]
                }
            })
        ]
    }
}
