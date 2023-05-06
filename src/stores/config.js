import { defineStore } from 'pinia'
import { getSystemInfo } from "@tarojs/taro";
// import { sysinfo } from '@/api/index';

export const useConfigStore = defineStore('config', {
  state: () => ({
    tabIndex: 0,
    statusBar: 0, // 状态栏的高度
    capsule: 40, // 微信胶囊的高度
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
    setIOS(flag) {
      this.ios = flag
    },
    setShareInfo(obj){
      this.shareInfo = obj
    },
    async getHeaderHeight(){
      getSystemInfo().then((result) => {
        const { statusBarHeight } = result;
        const { height, top } = wx.getMenuButtonBoundingClientRect();
        this.statusBar = statusBarHeight;
        this.capsule = (top - statusBarHeight) * 2 + height;
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