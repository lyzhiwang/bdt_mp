<template>
    <SafeAreaView class="page2 orderdetail">
        <!-- 待支付 -->
        <view class="box notice" v-if="orderInfo.order_status==='INIT'">
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
        <view class="box notice" v-if="!orderInfo.order_status==='INIT'">
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
        <view class="box notice" v-if="orderInfo.order_status==='SUCCESS'">
            <view class="top"> 
                <view class="time">
                    <text>待使用</text>
                </view>          
                <view class="type">请在<text class="times">{{orderInfo.deadline}}</text>（含）前到店消费</view>
            </view>
        </view>
        <BuyCard :data="goods"/>
        <!-- 二维码 -->
        <view v-if="orderInfo.order_status==='SUCCESS'" class="starBoxCard ">
            <ziji-consume-card  :orderId="orderInfo.out_order_no"></ziji-consume-card>
        </view>
        <!--适用门店 -->
        <BuyDetail   :product_id="135" v-if="orderInfo.order_status==='SUCCESS'"/>
        <!-- 团购详情 -->
        <BuyPackage v-if="orderInfo.order_status==='SUCCESS'" :menu="bundleInfo"/>
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
                    <view class="text">{{orderInfo.out_order_no}}</view>
                    <view class="text">{{orderInfo.create_order_time  }}</view>    
                    <view class="text">{{goods.quantity}}(份)</view> 
                    <view class="text">￥{{ goods.price }}</view>   
                    <view class="text" v-if="orderInfo.order_status==='INIT'">合计￥<span class="span">{{ orderInfo.total_amount }}</span></view>
                </view>
            </view>
        </view>
         <!-- 使用须知 -->
         <BuyNotice v-if="orderInfo.order_status==='SUCCESS'"  :data="Instructions"/>
        <!-- 继续付款 -->
        <!-- <button v-if="orderInfo.order_status==='INIT'" class="btn">继续付款</button> -->
        <zijie-keep-button  :orderId="2023070551101555" ></zijie-keep-button>
</SafeAreaView>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores'
import { useLoad, requestPayment, showToast, setClipboardData } from '@tarojs/taro'
import { Success, Right } from '@nutui/icons-vue-taro';
import QR from '@/utils/qrcode2.js';
import { getOrderShow, getGoodListShow } from "@/api/index";
import {  goToSub } from '@/utils/nav'
import { redirectTo } from '@/router'
import { getTimeTemp } from '@/utils/helper';
import "./detail.scss";

definePageConfig({
navigationBarTitleText: '订单详情',
})
const Instructions = ref({})   //使用须知
const orderInfo = ref({})    // 订单详情
const goods = ref({})  //订单商品详情
const id = ref(null) //单ID
const showBasic = ref(false)
const number =ref({number:'2234 5678 2234 '},{number:'2234 5678 2234 '})
const bundleInfo = ref(null)    //团购详情
const product_id = ref(null)  //适应门店id
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
useLoad((option) => {
product_id.value = option.id
id.value = option.id
getOrderShow({id: option.id}).then(res=>{
    if(res&&res.data){ 
        orderInfo.value = res.data
        goods.value = res.data.goods
        state.end = getTimeTemp(orderInfo.value.create_order_time) + (9600 * 1000)

        getGoodListShow({id:res.data.goods.goods_id}).then(res=>{
            if(res&&res.data){ 
                const { use_date,suit_range,use_time,appointment,private_room,superimposed_discounts,free_pack,description_rich_text } = res.data
                Instructions.value = { use_date,suit_range,use_time,appointment,private_room,superimposed_discounts,free_pack,description_rich_text }
                bundleInfo.value = res.data.sku.commodity
                //使用须知
               
            }
})

        // 核销二维码
        // qrCodeImg.value = QR.drawImg(orderInfo.value.out_trade_no, {
        //     size: 140
        // })
    }
})
// 套餐详情

})


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
<!-- <script>
	return {
			...toRefs(state),
			applyRefund,
		}
</script> -->