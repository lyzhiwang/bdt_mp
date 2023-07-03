<template>
    <SafeAreaView class="page2 orderdetail">
        <!-- 待支付 -->
        <view class="box notice" v-if="orderInfo.status===2">
            <view class="top"> 
                <view class="time">
                    <text>订单待支付</text>
                </view>
                <view class="type">
                <text>请在</text>
                 <nut-countdown 
                        class="countdown"
                        v-model="state.resetTime" 
                        :endTime="state.end" 
                        @on-end="EndHandle()"
                        format="mm : ss ">
                    </nut-countdown>
                    <text>内支付，超时将自动取消订单</text>
                </view>
            </view>
                <view class="cancel">取消订单</view>
        </view>
        <!-- 订单完成 -->
        <view class="box notice" v-if="orderInfo.status===3">
            <view class="top"> 
                <view class="time">
                    <text>交易成功</text>
                </view>
                <view class="type">
                <text>感谢购买，期待下次光临</text>
                </view>
            </view>
        </view>
        <!-- 待使用（核销）-->
        <view class="box notice" v-if="orderInfo.status===4">
            <view class="top"> 
                <view class="time">
                    <text>待使用</text>
                </view>
                <view class="type">
                <text>请在</text>
                 <nut-countdown 
                        class="countdown"
                        v-model="state.resetTime" 
                        :endTime="state.end" 
                        @on-end="EndHandle()"
                        format="mm : ss ">
                    </nut-countdown>
                    <text>（含）前到店消费</text>
                </view>
            </view>
        </view>
        <!-- 优惠(套餐信息) -->
        <!-- <view class="starBoxCard" >   
            <cdn-img src="src"  class="mealImg" mode="aspectFill"/>  
            <view class="BoxCard_info">
                <view class="s_title">正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！</view>
                <view class="money">周一至周日</view>
                <view class="tagRow flex">
                    <view class="tag fcenter"><Success  color="#fe7049"></Success>过期退</view>
                    <view class="tag fcenter" ><Success  color="#fe7049"></Success>随时退</view>
                    <view class="tag fcenter"><Success  color="#fe7049"></Success>免预约</view>
                </view>
               
            </view>
        </view> -->
        <BuyCard />
        <!-- 二维码 -->
        <view v-if="orderInfo.status===4" class="starBoxCard ">
            <view class="Verification">
                <image src="/static/img/me/bg1.png" class=" qrCode" :showMenuByLongpress="true"/>
                <view class='Qr'>
                <view class="left"> 
                    <!-- <view class="h3" >券号：2234 5678 2234 <cdn-img src="/static/img/copy.png"  class="copy"  @click="setClipboard('123')"/></view> -->
                    <view class="s_store fcenter" @click="showBasic = true">2份可用 · 查看卷码<Right color="#666" size="16"/></view>
                    <view class="validity">有效期至2023.12.30  23:59</view>
                </view>
                <view class="refund" @click="goToSub(`refund/index`)">申请退款</view>
            </view>
            </view>
            
        </view>
        <!--适用门店 -->
        <BuyDetail  v-if="orderInfo.status!==2"/>
        <!-- 团购详情 -->
        <BuyPackage v-if="orderInfo.status!==2" :menu="bundleInfo.group"/>
        <!-- 订单信息 -->
        <view class="block msg">
            <view class="h3 message">订单信息</view>
            <view class="list">
                <view class="left">
                    <view class="text">订单号</view>
                    <view class="text"> 下单时间</view>
                    <view class="text"> 购买份数</view>
                    <view class="text">商品金额</view>
                </view>
                <view class="right">
                    <view class="text">1</view>
                    <view class="text">2</view>    
                    <view class="text">3(份)</view> 
                    <view class="text">￥4</view>   
                    <view class="text" v-if="orderInfo.status===2">合计￥<span class="span">180</span></view>
                </view>
            </view>
        </view>
         <!-- 使用须知 -->
         <BuyNotice v-if="orderInfo.status!==2"  :data="Instructions"/>
        <!-- 继续付款 -->
        <button v-if="orderInfo.status===2" class="btn">继续付款</button>
        <nut-popup :style="{ width:'300px',height:'168px',BorderRadius:'10px'}" v-model:visible="showBasic">
                    <view class="Coupon">
                        <view class="title">券号</view>
                        <view class="txt" >2234 5678 2234 <cdn-img src="/static/img/copy.png"  class="copy"  @click="setClipboard('123')"/> </view>
                        <view class="txt">2234 5678 2234 <cdn-img src="/static/img/copy.png"  class="copy"  @click="setClipboard('456')"/></view>
                        <nut-divider class="divider"/>
                        <view class="close" @click="showBasic = false">关闭</view>
                    </view>
        </nut-popup>
</SafeAreaView>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores'
import { useLoad, requestPayment, showToast, setClipboardData } from '@tarojs/taro'
import { Success, Right } from '@nutui/icons-vue-taro';
import QR from '@/utils/qrcode2.js';
import { storeToRefs } from "pinia";

import { firstLogin, goToSub } from '@/utils/nav'
import { redirectTo } from '@/router'
import { getTimeTemp } from '@/utils/helper';
import "./detail.scss";

definePageConfig({
navigationBarTitleText: '订单详情',
})
const Instructions = ref({effective_time:'365',use_time:'全天',suit_range:'123',})   //使用须知
const orderInfo = ref({status:4})    // 订单详情
// const id = ref(null) //单ID
const showBasic = ref(false)
const number =ref({number:'2234 5678 2234 '},{number:'2234 5678 2234 '})
const bundleInfo = ref({    //团购详情
    banner: [],
    title: '',
    original_price: 0,
    price: 0,
    group: [
        {name:'招牌豌杂小面',number:'2',unit:'3',money:'16'},
        {name:'汽水',number:'2',unit:'3',money:'2'},
    ],
    detail: '',
})
const id = ref(null)  //适应门店id
const state = reactive({
    end: 0, // Date.now() + 3600 * 1000
    start: 2,
    imgUrl: '/static/img/business.png',
    title: '海底捞会员专享也小卡',
    price: '388',
});
const setClipboard = data => {
      setClipboardData({
        data,
        success: function () {
          showToast({title: '复制成功',icon: 'none'})
        }
      })
    }
const qrCodeImg = ref("https://www.baidu.com");
// useLoad((option) => {

// order_id.value = option.order_id
// // 套餐详情
// bundleDetail({activity_id: option.activity_id, set_meal_id: option.meal_id}).then(res=>{
//     if(res&&res.data){ 
//         bundleInfo.value = res.data
//         const { effective_time, use_time, suit_range, rules } = res.data
//         Instructions.value = { effective_time, use_time, suit_range, rules }
//     }
// })
id.value = 1
// getOrderShow(id).then(res=>{
    // if(res&&res.data){ 
    //     orderInfo.value = res.data
    //     state.end = getTimeTemp(orderInfo.value.place_order_time) + (3600 * 1000)
    //     // 核销二维码
    //     qrCodeImg.value = QR.drawImg(orderInfo.value.out_trade_no, {
    //         size: 140
    //     })
    // }
// })
// })

// function submit(){
// //获取order_id
// console.log(333, order_id.value, orderInfo.value.order_id)
// // 发起重新下单请求
// ReOrder({ order_id: order_id.value}).then(res=>{
//     console.log(res,'res')
//     if(res&&res.data){
//         console.log(res,'res')
//         openPayment(res.data)
//     }
// })
// }
// // 调起微信支付
// function openPayment(payData){
// requestPayment({
//     ...payData,
//     success:()=> {
//         // 支付成功
//         showToast({title: '支付成功', icon: 'success', duration: 2000})
//         setTimeout(()=> redirectTo({url: '/pagesub/orders/index?type=2'}), 2000)
//     },
//     fail:()=> {
//         showToast({title: '支付失败', icon: 'none', duration: 2000})
//         setTimeout(()=> redirectTo({url: '/pagesub/orders/index?type=1'}), 2000)
//     }
// });
// }
function EndHandle() {
// orderInfo.value.status = 3

}
</script>