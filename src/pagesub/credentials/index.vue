<template>
<SafeAreaView class="page credentials">
    <view class="title">{{ typeStr }}资质展示</view>
    <view class="list">
        <view class="item fcenter">
            <cdn-img src="" lazyLoad class="pic"/>
        </view>
    </view>    
</SafeAreaView>
</template>
    
<script setup>
import { ref } from 'vue'
import { useLoad, setNavigationBarTitle } from '@tarojs/taro'
import "./index.scss";
const typeStr = ref('')
useLoad((option) => {
    typeStr.value = option.id ? '门店': '服务'
    setNavigationBarTitle({
        title: `${typeStr.value}资质`
    })
})
</script>