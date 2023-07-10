<template>
     <view class="tg_package"> 
        <view class="title">团购套餐</view>
        <view class="package">超值套餐组合</view>
        <view  v-for="items in menu">
            <view class="">{{ items.group_name }}</view>
            <view v-for="detail in items.item_list" class="item">
                <view class="leftBox" >
                    <view class="circle"></view>
                    <view class="title" >{{ detail.name }}<text class="dw">({{detail.count}}{{ detail.unit}})</text></view>
                </view>
                <view class="price">¥{{ detail.price }}</view>
            </view>
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
    .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #333;
  line-height: 20px;
  .leftBox{
    display: flex;
    align-items: center;
    .circle{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #000000;
      margin-right: 5px;
    }
    .dw{
      color: #999999;
    }
  }
}
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
