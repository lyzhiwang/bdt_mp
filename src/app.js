import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setGlobalDataPlugin } from '@tarojs/taro'
import CdnImg from "@/components/CdnImg";
import './router/guard'
import './app.scss'
import './assets/font/iconfont.css';
import { useConfigStore } from '@/stores'
import { getPhone } from "@/api/index.js";

const cdn = 'https://zwklt.zwwltkl.com';

const App = createApp({
  onShow (options) {
    const config = useConfigStore()
    // 获取系统配置
    // config.getSystemConf();
    // 获取自定义公共头部的高度
    config.getHeaderHeight();
  },
  onLaunch(options){
    if(options){
      console.log(111, options)
    }
  },
  onHide(){
    // console.log(2222, '隐藏到后台')
  },
  onBeforeUnmount(){
    console.log(3333, '销毁前')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖

  
})

App.use(setGlobalDataPlugin, {
  getPhoneNumber(e) {
    console.log(123123213, e)
    // const params = {

    // }
    
    
    // ...
    // 开发者服务端解密 encryptedData，得到手机号
    // ...
    // const result = {
    //   phoneNumber: "1755555599",
    // };
    // // 回调交易模版
    // success(result);
  }
})

App.use(createPinia())
App.component('cdn-img', CdnImg)
// 全局注入
App.provide('cdn', cdn)
export default App
