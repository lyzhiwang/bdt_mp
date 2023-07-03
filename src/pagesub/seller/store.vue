<template>
<view class="page2 store">
    <view class="h1">全部适用门店</view>
    <view class="li" v-for="shop in order.shopList" :key="shop.id">
        <view class="between">
            <view class="leftInfo">
                <view class="shopName">{{ shop.name }}</view>
                <!-- <view class="address"> <Location2  color="#e6c69f"/>{{ shop.address }}</view> -->
                <view class="location">
                    <Location2  color="#e6c69f"/>
                    <view class="address">{{ shop.address }}</view>
                </view>
            </view>
            <NavAndPhone :phone="shop.contact_phone" :shop_id="shop.id" :address="shop.location"/>
        </view>
    </view>
</view>
</template>

<script setup>
import NavAndPhone from "@/components/NavAndPhone.vue";
import { useOrderStore } from '@/stores'
import { Location2 } from '@nutui/icons-vue-taro';
import "./store.scss";

definePageConfig({
    navigationBarTitleText: '全部门店',
})
const order = useOrderStore()
</script>