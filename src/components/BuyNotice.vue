<template>
     <view class="use_less"> 
        <view class="h3">使用须知</view>
        <view class="date">
            <text class="t_title">有效期</text>
            <view class="left">
                <view class="round"></view>
                <view>购买后{{data.effective_time}}天有效期</view>
            </view>
        </view>
        <view class="date">
            <text class="t_title">可用时间</text>
            <view class="left">
                <view class="round"></view>
                <view>{{data.use_time}}</view>
            </view>
        </view>
        <view class="date">
            <text class="t_title">预约规则</text>
            <view class="left">
                <view class="round"></view>
                <!-- <view>除酒水饮料外全场通用</view> -->
                <view>{{data.suit_range}}</view>
            </view>
            
        </view>
        <view class="date">
            <text class="t_title">其他规则</text>
            <!-- <li v-for="item in menu" :key="item.id" class="li" >
                <view class="left">
                    <view  class="round_two"></view>
                    <text>{{ item.text }}</text>
                </view>
            </li> -->
            <rich-text :nodes="data.rules" class="desc"></rich-text>
        </view>
        <view class="date">
            <text class="t_title">其他说明</text>
            <view class="left">
                <view class="round"></view>
                <!-- <view>除酒水饮料外全场通用</view> -->
                <view>其他说明</view>
            </view>
            
        </view>
        <view class="date">
            <text class="t_title">使用方式</text>
            <view class="left">
                <view class="round"></view>
                <!-- <view>除酒水饮料外全场通用</view> -->
                <view>使用方式</view>
            </view>
            
        </view>
    </view>
</template>

<script setup>
import { ref  } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default: {
            effective_time: '',
            use_time: '',
            suit_range: '',
            rules: '',
        },
    }
});
</script>

<style lang="scss">
.use_less{
    width: 355px;
    display: flex;
    margin: 0 auto 8px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 12px 10px 13px;
    flex-direction: column;

    .title{
    font-size: 14px;
    color: #000000;
    font-weight: 700;
    }
    .left{
        display: flex;
        align-items: center;
    }
    .li{
        flex-direction: row;
       display: flex;
       justify-content: space-between;
       padding: 5px 0 0;
    }
    .package{
        font-size: 12px;
        font-weight: 500;
        margin: 11px 0;
    }
    .date{
    flex-direction: column;
    display: flex;
    margin-top: 15px;
    .t_title{
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 5px;
    }
}

.round{
    content:'';
      display: block;
      width:4px;
      height:4px;
      background:#333333;
      border-radius: 50%;
      margin-right:6px;
}
.round_two{
    content:'';
      display: block;
      width:5px;
      height:5px;
      background:#333333;
      border-radius: 50%;
      margin-right:6px;
}
    
}
</style>