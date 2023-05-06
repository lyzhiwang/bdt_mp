<template>
<view class="page ucenter">
    <cdn-img class="bg1" src="/static/img/me/bg1.png"/>
    <CustomHeader onlyStatus/>
    <view class="con">
        <view class="info" v-if="user.isLogin"  @click="goToSub('profile/index')">
            <cdn-img class="avatar" :src="info.avatarUrl"/>
            <view class="nickname">{{ info.nickName }}</view>
            <view class="phone">{{ info.phone }}</view>
        </view>
        <view class="info noLogin" v-else  @click="goToLogin">
            <cdn-img src="/static/img/me/default.png" class="avatar" mode="aspectFit"/>
            <view class="nickname">点击登录</view>
        </view>
        <view class="panel">
            <view class="commissionBox between">
                <view class="balance">可提现佣金：￥{{ info.balance }}</view>
                <view class="cashout fcenter" @click="goToSub('cashout/index')">立即提现</view>
            </view>
            <view class="detail_tit" @click="goToSub('income/index')">收益明细<RectRight color="#666" class="icon-right"/></view>
            <view class="flexBox">
                <view class="li"><view class="num">{{info.total_income}}元</view><view class="label">累计收益</view></view>
                <view class="li"><view class="num">{{info.to_be_paid}}元</view><view class="label">待入账</view></view>
                <view class="li"><view class="num">{{info.already_cash}}元</view><view class="label">已提现</view></view>  
            </view>
        </view>
        <cdn-img class="apply" src="/static/img/me/apply.png" @click="switchTaBar('star/index',1)"/>
        <view class="block">
            <view class="h2">我的订单</view>
            <nut-row>
                <nut-col :span="6" class="fcenter" v-for="(item, i) in myOrder" :key="i" @click="goToSub(item.url) ">
                    <cdn-img class="icon" :src="item.icon"/>
                    <view class="name">{{ item.name }}</view>
                </nut-col>
            </nut-row>
        </view>
        <nut-row class="block" flex-wrap="wrap">
            <nut-col :span="6" class="fcenter item" v-for="(item, i) in other" :key="i" @click="goToSub(item.url)">
                <cdn-img class="icon" :src="item.icon"/>
                <view class="name">{{ item.name }}</view>
            </nut-col>
        </nut-row>
    </view>
    <CustomTabBar/>
</view>
</template>
    
<script setup>
import CustomHeader from "@/components/CustomHeader"
import { ref } from 'vue'
import { RectRight } from '@nutui/icons-vue-taro';
import { useDidShow, makePhoneCall, showToast, showModal } from '@tarojs/taro'
import { useUserStore, useConfigStore } from '@/stores'
import { switchTaBar } from '@/utils/nav'
import { navigateTo } from '@/router'
import { storeToRefs } from 'pinia';
import "./index.scss";

const myOrder = [
    {icon: '/static/img/me/order.png', name: '全部订单', url: 'orders/index'},
    {icon: '/static/img/me/payment.png', name: '待付款', url: 'orders/index?type=1'},
    {icon: '/static/img/me/nouse.png', name: '待使用', url: 'orders/index?type=2'},
    {icon: '/static/img/me/saleAfter.png', name: '退款/售后', url: 'orders/index?type=3'}
]
const other = ref([
    {icon: '/static/img/me/cs.png', name: '联系客服', url: ''},
    {icon: '/static/img/me/follow.png', name: '我的关注', url: 'concern/index'},
    {icon: '/static/img/me/favorites.png', name: '我的收藏', url: 'favorites/index'},
    {icon: '/static/img/me/love.png', name: '我的点赞', url: 'favorites/index?type=2'},
    {icon: '/static/img/me/feedback.png', name: '投诉反馈', url: 'feedback/index'},
    {icon: '/static/img/me/seller.png', name: '商家入驻', url: 'settled/index'},
])

const user = useUserStore()
const { info } = storeToRefs(user);
const config = useConfigStore()
const { sysinfo } = storeToRefs(config)

function CellCs(){
    if(!sysinfo.value.phone) return showToast({title: '客服电话还未配置，暂时无法拨打',icon: 'none'})
    makePhoneCall({phoneNumber: sysinfo.value.phone})
}
function goToSub(url){
    if(!url) return CellCs()
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
    }
    navigateTo({ url: '/pagesub/'+url })
}
function goToLogin(){
   navigateTo({ url: '/pages/login/index' })
}
useDidShow(()=>{
    // config.setSelecTab(2)
    user.getUserInfo()
})
</script>