<template>
<SafeAreaView class="page noticePage">
    <view class="h1">一、到店服务预订</view>
    <view class="desc">部分到店服务商家需要你提供手机号才可完成预订。你的手机号将可能接收到与服务相关的信息或电话，例如消息告知、安全验证、客服反馈、用户使用体验调研。</view>
    <view class="h1">二、票务、酒旅预订</view>
    <view class="desc">如你购买的是票务、酒旅类产品，需要你提供身份信息(含真实姓名、身份证号及其他所需信息) 才可完成预订。为了核验订单，你的订单详情和身份信息也可能需要提供给票务、酒旅服务的实际提供方。</view>
    <view class="h1">三、抖音订单中心</view>
    <view class="desc">你可以在抖音中的[我]- [=]-[我的订单]中查询并管理各类订单，你也可以在[我的订单]中关闭部分类型的订单同步，关闭后，你将只能在下单的小程序中查看订单。</view>
</SafeAreaView>
</template>
    
<script setup>
import "./notice.scss";
definePageConfig({
    navigationBarTitleText: '购买须知',
})
</script>