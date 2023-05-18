<script setup>
import { ref } from "vue";

const props = defineProps({
  type: {
    type: Number,
    default: 1 // 1竖版 2横版
  },
  item: {
    type: Object,
    default: ()=>{
      return{
        img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
        title: '正宗四川豌豆小面唇齿留香……',
        price: '10.99',
        old_price: '16.00'
      }
    }
  }
})
</script>

<template>
<view class="goodsBox">
  <cdn-img class="goods-img" :src="item.img"/>
  <nut-ellipsis 
    :content="item.title" 
    direction="end"
    class="titleBox" 
    rows="3"></nut-ellipsis>
  <view class="priceBox">
    <view class="c-p">¥{{item.price}}</view>
    <view class="o-p">¥{{item.old_price}}</view>
  </view>
</view>
</template>

<style lang="scss">
.goodsBox{
  width: 98px;
  font-size: 12px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  color: #212121;
  margin-right: 10px;
  .goods-img{
    width: 97.5px;
    height: 97.5px;
    border-radius: 6px;
  }
  .titleBox{ 
    padding: 5px 0px;
  }
  .priceBox{
    display: flex;
    align-items: center;
    font-size: 11px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #fe3234;
    .o-p{
      font-size: 10px;
      color: #666666;
      text-decoration: dashed;
      margin-left: 10px;
    }
  }
}
</style>