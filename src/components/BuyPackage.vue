<template>
     <view class="tg_package"> 
        <view class="title">团购套餐</view>
        <view class="package">超值套餐组合</view>
        <view class="list"> 
            <li v-for="item in menu" :key="item.id" class="li" >
                <view class="left">
                    <view  class="rounds"></view>
                    <text>{{ item.name }}</text>
                    <text> （{{ item.number }}份）</text>
                </view>
                <view class="right"> 
                    <text class="money"> ￥{{ item.money }}</text>
                </view>
            </li>
        </view>
    </view>
</template>
<script setup>
const props = defineProps({
    menu: {
        type: Array,
        default: [],
    }
});
</script>
<style lang="scss">
.tg_package{
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
    
.rounds{
    content:'';
      display: block;
      width:4px;
      height:4px;
      background:#333333;
      border-radius: 50%;
      margin-right:6px;
}
    
}
</style>
