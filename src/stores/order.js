import { defineStore } from 'pinia'
// import { showToast } from '@tarojs/taro'
// import { switchTab } from '@/router'

export const useOrderStore = defineStore('order', {
  state: () => ({
    shopList: [],
    orderInfo: null,
  }),
  actions: {
    setShopList(list){
      this.shopList = list
    },
    setOrderInfo(data){
      this.orderInfo = data
    }
  }
})

export default useOrderStore