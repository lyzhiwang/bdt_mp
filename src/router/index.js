import { Router, NavigateType  } from 'tarojs-router-next'

export function switchTab({url}){
    Router.navigate({ url }, { type: NavigateType.switchTab })
}
export function navigateTo({url, params}){
    Router.navigate({ url }, { type: NavigateType.navigateTo, params })
}
export function redirectTo({url, params}){
    Router.navigate({ url }, { type: NavigateType.redirectTo, params })
}
export function reLaunch({url}){
    Router.navigate({ url }, { type: NavigateType.reLaunch })
}
export function back(){
    Router.back()
}