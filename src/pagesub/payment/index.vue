<template>
<SafeAreaView class="page2 payment">
    <view class="block orderInfo" v-if="orderInfo">
        <view class="h3">{{ orderInfo.product_name }}</view>
        <GoodsItem :item="orderInfo" :store_id="orderInfo.store_id" :showBuyBtn="false"/>
        <!-- <view v-if="orderInfo.limit>0" class="buyNum">每人限制购买{{ orderInfo.limit }} 份</view> -->
        <view class="between">
            <text class="buyNum">购买数量</text>
            <nut-input-number v-if="orderInfo.limit>0" v-model="state.number" :max="orderInfo.limit"/>
            <nut-input-number v-else v-model="state.number"/>
        </view>
        <view class="textRight">
            <text class="count">小计</text>
            <text class="r unit">￥</text>
            <text class="r price">{{ }}</text>
        </view>
    </view>
    <nut-cell title="联系方式（必填）" class="phone"> 
        <view class="title">联系方式（必填）</view>
        <nut-input style="   display: contents;"
          
            placeholder="输入手机号（仅用于商家确认)" clearable>
        <template #left> <Ask></Ask> </template>
        <template #right> <nut-button type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" size="small">一键填写</nut-button> </template>
   
    </nut-input>
    </nut-cell>
    
    

    <nut-cell title="购买须知" is-link @click="goToSub('payment/notice')"></nut-cell>
    <!-- <view class="block payWay between">
        <view class="fcenter">
            <cdn-img src="/static/img/wechat.png" class="wechat"/>
            <text>微信支付</text>
        </view>
        <nut-checkbox v-model="checkbox"></nut-checkbox>
    </view> -->
    <!-- 底部购买Bar -->
    <!-- <Pay btnText="立即支付" :mode="2" :current="total" @payHandle="firstLogin(submit)"/> -->
   <!-- <pay-button order-status="{{0}}" order-id="1" bind:pay="handleContinutePay"  @click="handleContinutePay()"/> -->
  <!-- 立即抢购 -->
        <pay-button
            mode="2"
            goods-id= "7248881168261679104"
            goods-type="1" 
            bind:getgoodsinfo="getGoodsInfo"
            bind:placeorder="userLogin"
            bind:pay="onPay"
            bind:error="onError"
            order-status="{{0}}" order-id="1"
        />
</SafeAreaView>
</template>

<script>
import { showToast, requestPayment, getStorageSync, useLoad } from '@tarojs/taro'
import { ref, reactive, computed, toRefs } from 'vue';
import { useOrderStore, useUserStore } from '@/stores'
// import { storeToRefs } from 'pinia';
import { createOrder,getGoodListShow } from '@/api/index'
import { firstLogin, goToSub } from '@/utils/nav'
import { redirectTo } from '@/router'
import "./index.scss";
export default {
    name: 'login',
	// components: { IconFont },
    properties: {
    mode: Number,
    goodsId: {
      type: String,
      value: "7248881168261679104",
    },
  },

    setup() {
definePageConfig({
    navigationBarTitleText: '确认订单',
})
const user = useUserStore()
const order = useOrderStore()
// const { orderInfo } = storeToRefs(order);
const orderInfo = ref({
    // end_time: '2023-06-20',
    // icon_path: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    // price: '20.11',
    // original_price: '30.11',
    // order_number: 20,
    // holiday_currency: 1,
    // exempt_reservation: 1,
    // limit: 1,
    // store_name: '重庆小面（纱厂路店）',
    // title: '正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！',
})
function getGoodsInfo(goodsId) {
      return new Promise((resolve) => {
        console.log("user goodsId", goodsId);
        resolve({
          currentPrice: 1,
          minLimits: 2,
          maxLimits: 10,
          dateRule: "",
          goodsName: "循礼门M+丨【释集烤肉】99元  原价206.4元超值套餐",
          goodsPhoto:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.ibaotu.com%2Fgif%2F19%2F48%2F47%2F76Z888piCd6W.gif%21fwpaa50%2Ffw%2F700&refer=http%3A%2F%2Fpic.ibaotu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644654365&t=5fc9b5fdad0a16264a9a9c09c14b3af9",
          goodsLabels: [
            { type: "REFUND_ANYTIME" },
            { type: "BOOK_IN_ADVANCE", value: 98 },
          ],
          extra: { test: 123 },
        });
      });
    }

const checkbox = ref(true);
const state = reactive({
    number: '1',
    phone: null,

});
useLoad((option) => {
console.log(option,'option')
getGoodListShow({id:option.id}).then(res=>{
                    if(res.meta){
                        last_page = res.meta.last_page
                    }
                    if(res.data){
                        orderInfo.value = res.data
                        console.log(res.data,1111112)
                    }
                })

})
const total = computed(()=> {
    return (Number(state.number)*Number(orderInfo.value.sku_name)).toFixed(2)
})

function useSelfPhone(){
    state.phone = user.info
   
}
function onError(e) {
      console.log(e.detail);
      const { errNo, errMsg } = e.detail;
      console.log("errNo", errNo, "errMsg", errMsg);
      if (errNo === 21514) {
        tt.showToast({
          title: "失败", // 内容
          icon: "none", // 图标
        });
      } else if (errNo === 21513) {
        tt.showToast({
          title: "获取中", // 内容
          icon: "none", // 图标
        });
      }
    }
function onPay(options) {
      const { status, orderId, outOrderNo, result } = options.detail;
      console.log("onPay", status, orderId, outOrderNo, result);
      tt.navigateBack();
    }
    function handleContinutePay(event) {
        console.log(44444444444444444)
    const { status, outOrderNo, result } = event.detail;
    if (status === 'success') {
        const { code } = result;
        if (code === 0) {
            // 继续支付成功
        }
    } else {
        // 继续支付失败
    }
}
    
    function   handleRefund(event) {
      const { status, result } = event.detail;
      if (status === 'success') {
        const { refundId, outRefundNo } = result;
        console.log('发起退款成功', refundId, outRefundNo);
      } else {
        const { errMsg } = result;
        console.log('发起退款失败', errMsg);
      }
    }

    function userLogin(event) {
      console.log("place order", event);
      return new Promise((resolve) => {
        tt.login({
          success() {
            tt.getUserInfo({
              success(res) {
                console.log("login success", res);
                resolve();
              },
              fail(res) {
                console.log("fail", res);
                tt.openSetting({
                  success: (res) => {
                    console.log("打开设置页面成功: ", res.errMsg);
                  },
                  fail: (res) => {
                    console.log("打开设置页面失败: ", res.errMsg);
                  },
                  complete: (res) => {
                    console.log("接口已调用: ", res.errMsg);
                  },
                });
              },
            });
          },
          // setTimeout(() => {
          //   resolve();
          // }, 0);
        });
      });
    }
// function getPhoneNumber(e){
//     // getters.value = user.getters
//     console.log(state.phone,'state.phone')
//     // wxPhone
// }
function getPhoneNumber({ params, success, fail }) {
    const { iv, encryptedData } = params;
    console.log(iv,encryptedData,'123')
    // ...
    // 开发者服务端解密 encryptedData，得到手机号
    // ...
    const result = {
        phoneNumber: '13580006666',
    }
    // 回调前端模板
    success(result)
}
function handlePay(event) {
    const { status , orderId , outOrderNo , result } = event.detail;
    if (status === 'success') {
        const { code } = result;
        if (code === 0) {
            // 支付成功
        } else {
            // 支付失败（超时、取消、关闭）
        }
    } else {
        const { errMsg } = result;
    }
}
return {
            ...toRefs(state),
            orderInfo,
            goToSub,
            onPay,
            handlePay,
            handleRefund,
            userLogin,
            onError,
            state,
            total,
            getPhoneNumber,
            handleContinutePay,
            getGoodsInfo,
        }

    }
}




// 调起微信支付
// function openPayment(payData){
//     requestPayment({
//         ...payData,
//         success:()=> {
// 			// 支付成功
//             showToast({title: '支付成功', icon: 'success', duration: 2000})
//             setTimeout(()=> redirectTo({url: '/pagesub/orders/index'}), 2000)
//         },
//         fail:()=> {
//             showToast({title: '支付失败', icon: 'none', duration: 2000})
//             setTimeout(()=> redirectTo({url: '/pagesub/orders/index?type=1'}), 2000)
//         }
//     });
// }

// function submit(){
//     if(!checkbox.value) return showToast({ title: '您还未选择支付方式', icon: 'none', duration: 3000})
//     // 先获取 share_user_id
//     const share_user_id = getStorageSync('share_user_id')
//     // 然后获取 activity_id 和 set_meal_id
//     const { activity_id, set_meal_id } = orderInfo.value
//     // 发起订单请求
//     createOrder({ ...state, share_user_id, activity_id, set_meal_id}).then(res=>{
//         if(res&&res.data){
//             openPayment(res.data)
//         }
//     })
// }


</script>