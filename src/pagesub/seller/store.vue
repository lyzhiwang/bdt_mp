<template>
<view class="page2 store">
    <view class="h1">全部适用门店</view>
    <view class="li" v-for="shop in order.shopList" :key="shop.id">
        <view class="between">
            <view class="leftInfo">
                <view class="shopName">{{ shop.name }}</view>
                <view class="address">地址：{{ shop.address }}</view>
            </view>
            <NavAndPhone :phone="shop.phone" :address="shop.location"/>
        </view>
    </view>
</view>
</template>

<script setup>
import NavAndPhone from "@/components/NavAndPhone.vue";
import { useOrderStore } from '@/stores'
import "./store.scss";

definePageConfig({
    navigationBarTitleText: '全部门店',
})
const order = useOrderStore()
</script>