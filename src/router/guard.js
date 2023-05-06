import { registerMiddleware } from 'tarojs-router-next'
import { getCurrentPages } from '@tarojs/taro'
import { useUserStore } from "@/stores";

registerMiddleware(
    async (ctx, next) => {
        // console.log(3333, '中间件执行：', ctx)
        if(ctx.route.url=='/pages/login/index'){
            const pageArr = getCurrentPages();
            // const prevRoute = pageArr[ pageArr.length - 1].route;
            const prevRoute = pageArr[ pageArr.length - 1].$taroPath;
            useUserStore().setBeforeLoginUrl('/'+prevRoute)
        }
        next()
    }
)