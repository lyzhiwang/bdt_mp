<template>
     <view class="use_less"> 
        <view class="h3">使用须知</view>
        <view class="date">
            <text class="t_title">有效期</text>
            <view class="left">
                <view class="round"></view>
                <view>{{data.use_date}}</view>
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
                <view>{{data.appointment}}</view>
            </view>
            
        </view>
        <view class="date">
            <text class="t_title">其他规则</text>
            <view class="left" v-if="private_room">
                <view class="round"></view>
                <view>{{data.private_room}}</view>
            </view>
            <view class="left" v-if="superimposed_discounts">
                <view class="round"></view>
                <view>{{data.superimposed_discounts}}</view>
            </view>
            <view class="left" v-if="free_pack">
                <view class="round"></view>
                <view>{{data.free_pack}}</view>
            </view>
            <!-- <view>{{data.private_room}}</view> -->
            <!-- <rich-text :nodes="data.rules" class="desc"></rich-text> -->
        </view>
        <view class="date">
            <text class="t_title">其他说明</text>
            <view class="left" v-if="description_rich_text">
                <view class="round"></view>
                <!-- <view>除酒水饮料外全场通用</view> -->
                <view v-for="item in data.description_rich_text">
                    <view>{{item }}</view>
                </view>
                <!-- <view>{{ data.description_rich_text }}</view> -->
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
            use_date: '',
            suit_range: '',
            use_time: '',
            appointment:'',
            private_room:'',
            superimposed_discounts:'',
            free_pack:'',
            description_rich_text:'',

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