<template>
<SafeAreaView class="PayfixedBottom between">
    <view class="total" v-if="mode===1">
        <!-- 现价 -->
        <text class="unit r">￥</text>
        <text class="amt">{{ current }}</text>
        <!-- 原价 -->
        <text class="origin">￥{{ originPrice }}</text>
        <!-- 折扣 -->
        <view class="discount" v-if="showDiscount">{{ discount }}折</view>
    </view>
    <view class="realPrice" v-else>
        <text class="realtext">合计</text>
        <text class="unit r">￥</text>
        <text class="amt r">{{ current }}</text>
    </view>
    <view class="btn-blue4 bot fcenter" @click="emit('payHandle')">{{ btnText }}</view>
</SafeAreaView>
<!-- 占位 -->
<view class="PayPlaceholder"></view>
</template>
<script setup>
import { computed } from "vue";
const emit = defineEmits(['payHandle']);
const props = defineProps({
  btnText: {
    type: String,
    default: "去支付",
  },
  originPrice:{ //原价
    type: Number,
    default: 1,
  },
  current:{ //现价
    type: [Number, String],
    default: 1,
  },
  showDiscount: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: Number,
    default: 1,
  }
});
const discount = computed(()=> ((props.current/props.originPrice)*10).toFixed(2))
</script>
<style lang="scss">
.PayfixedBottom{
    width: 355px;
    height: 47px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    box-sizing: content-box;
    box-shadow: 0 0 10px #ccc;
    padding-left: 10px;
    padding-right: 10px;
    .origin{
        font-size: 10px;
        color: #808080;
        text-decoration: line-through;
        margin-left: 4px;
    }
    .bot{
        height: 36px;
        width: 150px;
        border-radius: 18px;
        font-size: 15px;
        padding: 0 10px;
        color: #FFFFFF;
        background-image: linear-gradient(to right, #ff962f 0%, #fd6a29 100%);
        font-weight: bold;
    }
    .total{
        font-size: 12px;
        color: #FF1D42;
        display: flex;
        align-items: baseline;
    }
    .amt{
        font-size: 18px;
        font-weight: bold;
    }
    .discount{
        height: 13.5px;
        background: rgba(254,50,52,0.15);
        border-radius: 7px 7px 7px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        padding: 5px;
        font-size: 9px;
        color: #FE3234;
    }
    .unit{
        font-size: 12px;
    }
    .realtext{
        font-size: 10px;
        color: #808080;
        margin-right: 3px;
    }
}
.PayPlaceholder{
    width: 100%;
    height: 47px;
}
</style>
