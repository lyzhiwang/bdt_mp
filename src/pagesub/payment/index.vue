<template>
<SafeAreaView class="page2 payment">
    <view class="block orderInfo" v-if="orderInfo">
        <view class="h3">{{ orderInfo.store_name }}</view>
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
            <text class="r price">{{ total }}</text>
        </view>
    </view>
    <nut-cell title="购买须知" is-link></nut-cell>
    <!-- <view class="block payWay between">
        <view class="fcenter">
            <cdn-img src="/static/img/wechat.png" class="wechat"/>
            <text>微信支付</text>
        </view>
        <nut-checkbox v-model="checkbox"></nut-checkbox>
    </view> -->
    <!-- 底部购买Bar -->
    <Pay btnText="立即支付" :mode="2" :current="total" @payHandle="firstLogin(submit)"/>
</SafeAreaView>
</template>

<script setup>
import { showToast, requestPayment, getStorageSync } from '@tarojs/taro'
import { ref, reactive, computed } from 'vue';
import { useOrderStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { createOrder } from '@/api/index'
import { firstLogin } from '@/utils/nav'
import { redirectTo } from '@/router'
import "./index.scss";
definePageConfig({
    navigationBarTitleText: '确认订单',
})
const user = useUserStore()
const order = useOrderStore()
// const { orderInfo } = storeToRefs(order);
const orderInfo = ref({
    end_time: '2023-06-20',
    icon_path: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    price: '20.11',
    original_price: '30.11',
    order_number: 20,
    holiday_currency: 1,
    exempt_reservation: 1,
    limit: 1,
    store_name: '重庆小面（纱厂路店）',
    title: '正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！',
})
const checkbox = ref(true);
const state = reactive({
    number: '1',
    // phone: null,
});
const total = computed(()=> {
    return (Number(state.number)*Number(orderInfo.value.price)).toFixed(2)
})

function useSelfPhone(){
    state.phone = user.info.phone
}

// 调起微信支付
function openPayment(payData){
    requestPayment({
        ...payData,
        success:()=> {
			// 支付成功
            showToast({title: '支付成功', icon: 'success', duration: 2000})
            setTimeout(()=> redirectTo({url: '/pagesub/orders/index'}), 2000)
        },
        fail:()=> {
            showToast({title: '支付失败', icon: 'none', duration: 2000})
            setTimeout(()=> redirectTo({url: '/pagesub/orders/index?type=1'}), 2000)
        }
    });
}

function submit(){
    if(!checkbox.value) return showToast({ title: '您还未选择支付方式', icon: 'none', duration: 3000})
    // 先获取 share_user_id
    const share_user_id = getStorageSync('share_user_id')
    // 然后获取 activity_id 和 set_meal_id
    const { activity_id, set_meal_id } = orderInfo.value
    // 发起订单请求
    createOrder({ ...state, share_user_id, activity_id, set_meal_id}).then(res=>{
        if(res&&res.data){
            openPayment(res.data)
        }
    })
}
</script>