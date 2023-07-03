<template>
<SafeAreaView class="page credentials">
    <view class="title">{{ typeStr }}资质展示</view>
    <view class="list" >
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
import { ShopAptitude } from '@/api/index'
const typeStr = ref('')
const licenses = ref('')
useLoad((option) => {
    // console.log(option.shop_id,option,'123')
    typeStr.value = option.shop_id ? '门店': '服务'
    setNavigationBarTitle({
        title: `${typeStr.value}资质`
    })
    
    ShopAptitude({shop_id:option.shop_id}).then(res=>{
        if(res&&res.data){ 
           console.log(res.data)
           licenses.value = res.data
        }
    })
})
</script>