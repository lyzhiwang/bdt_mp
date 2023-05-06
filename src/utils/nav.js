import { navigateTo, switchTab, redirectTo } from '@/router'
import { useUserStore, useConfigStore } from "@/stores";
import { showModal } from '@tarojs/taro'

export function firstLogin(callback){
    const user = useUserStore()
    if(!user.isLogin){
        return showModal({
            title: '提示',
            content: '请先登录',
            success: function (res) {
                if (res.confirm) {
                    navigateTo({ url: '/pages/login/index' })
                }
            }
        })
    }else if(!!callback){
        callback()
    }
}

export function goToSub(url, needLogin){
    if(needLogin) {
        firstLogin(()=>navigateTo({ url: '/pagesub/'+url }))
    }else{
        const pageArr = getCurrentPages();
        const prevRoute = pageArr[ pageArr.length - 1].route;
        const path = `pagesub/${url}`.split("?")[0]
        if(prevRoute===path){
            // 同一个页面之间跳转
            redirectTo({ url: '/pagesub/'+url })
        }else{
            navigateTo({ url: '/pagesub/'+url })
        }
    }
}

export function switchTaBar(url, index){
    const config = useConfigStore()
    config.setSelecTab(index)
    switchTab({ url: '/pages/'+url })
}