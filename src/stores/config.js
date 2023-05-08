import { defineStore } from 'pinia'
import { getSystemInfo } from "@tarojs/taro";
// import { sysinfo } from '@/api/index';

export const useConfigStore = defineStore('config', {
  state: () => ({
    tabIndex: 0,
    statusBar: 0, // 状态栏的高度
    capsule: 40, // 微信胶囊的高度
    safeAreaBot: 0, // 底部安全距离
    shareInfo: {
      title: '', // 分享的标题
      imageUrl: '', // 分享的图片
    },
    sysinfo: null,
    ios: false,
  }),
  actions: {
    setSelecTab(i) {
      this.tabIndex = i
    },
    setShareInfo(obj){
      this.shareInfo = obj
    },
    async getHeaderHeight(){
      getSystemInfo().then((result) => {
        const { statusBarHeight, system, screenHeight, safeArea } = result;
        console.log(222, result)
        const { height, top } = wx.getMenuButtonBoundingClientRect();
        this.statusBar = statusBarHeight;
        this.capsule = (top - statusBarHeight) * 2 + height;
        this.safeAreaBot = screenHeight-safeArea.bottom;
        // 判断是否是IOS系统
        if(system.includes('iOS')){
          this.ios = true
        }
      })
    },
    async getSystemConf(){
      try {
          // const res = await sysinfo()
          // if(res&&res.data){
          //   this.sysinfo = res.data
          // }
          // return res;
          return true
      } catch (error) {
          throw error
      }
    },
  }
})

export default useConfigStore