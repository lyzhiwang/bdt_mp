<template>
<SafeAreaView class="page ucenter">
    <cdn-img class="bg1" src="/static/img/me/bg1.png"/>
    <view class="con">
        <CustomHeader onlyStatus/>
        <view class="info" v-if="user.isLogin"  @click="goToSub('profile/index')">
            <cdn-img class="avatar" :src="info.avatarUrl"/>
            <view class="nickname">{{ info.nickName }}</view>
            <!-- <view class="phone">{{ info.phone }}</view> -->
        </view>
        <view class="info noLogin" v-else  @click="goToLogin">
            <cdn-img src="/static/img/me/default.png" class="avatar" mode="aspectFit"/>
            <view class="nickname">未登录</view>
            <view class="loginBtn fcenter">一键登录<RectRight class="rightIcon"/></view>
        </view>
        <view class="block">
            <nut-row>
                <nut-col :span="6" class="fcenter" v-for="(item, i) in myOrder" :key="i" @click="goToSub(item.url, true) ">
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
        <view class="desc fcenter" :style="{'padding-bottom': `${config.safeAreaBot}px`}">
            <view>V1.0.3</view>
            <view>北抖团提供技术支持 copyright 2019-{{ now }}</view>
            <view>提供云计算服务</view>
        </view>
    </view>
    <CustomTabBar/>
</SafeAreaView>
</template>
    
<script setup>
import CustomHeader from "@/components/CustomHeader"
import { ref } from 'vue'
import { useDidShow, makePhoneCall, showToast } from '@tarojs/taro'
import { useUserStore, useConfigStore } from '@/stores'
import { goToSub } from '@/utils/nav'
import { navigateTo } from '@/router'
import { storeToRefs } from 'pinia';
import { RectRight } from '@nutui/icons-vue-taro';
import "./index.scss";

const now = new Date().getFullYear()
const myOrder = [
    {icon: '/static/img/me/unpaid.png', name: '待付款', url: 'orders/index?type=1'},
    {icon: '/static/img/me/nouse.png', name: '待使用', url: 'orders/index?type=2'},
    {icon: '/static/img/me/completed.png', name: '已完成', url: 'orders/index?type=3'},
    {icon: '/static/img/me/refunded.png', name: '已退款', url: 'orders/index'},
]
const other = ref([
    {icon: '/static/img/me/cs.png', name: '联系客服', url: ''},
    {icon: '/static/img/me/credential.png', name: '服务资质', url: 'credentials/index'},
])

const user = useUserStore()
const { info } = storeToRefs(user);
const config = useConfigStore()
const { sysinfo } = storeToRefs(config)

function CellCs(){
    if(!sysinfo.value.phone) return showToast({title: '客服电话还未配置，暂时无法拨打',icon: 'none'})
    makePhoneCall({phoneNumber: sysinfo.value.phone})
}
function goToLogin(){
   navigateTo({ url: '/pages/login/index' })
}
useDidShow(()=>{
    // config.setSelecTab(2)
    user.getUserInfo()
})
</script>