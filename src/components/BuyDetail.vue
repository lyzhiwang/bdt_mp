<template>
<view class="stores" >
    <view class="between topstate" >
        <view class="left">
            <view class="h3 title">适用门店</view>
            <!-- {{ shopInfo }} -->
        </view>
        <view class="s_store fcenter" @click="goToSub('seller/store')">全部门店<Right color="#666" /></view>
    </view>
    <view class="BoxCard" v-if="shopInfo">
        <cdn-img :src="shopInfo.image"  class="pic" mode="aspectFill"/>  
        <view class="info">
            <view class="range ells">{{ shopInfo.name}}</view>
            <view class="location" >
                <Location2  color="#e6c69f"/>
                <text class="ells address">{{shopInfo.address}}</text>
            </view>
        </view>
        <NavAndPhone :phone="shopInfo.contact_phone" :shop_id="shopInfo.id"/>
    </view>
</view>
</template>

<script setup>
import { ref,   } from 'vue'
import { Location2, Right } from '@nutui/icons-vue-taro';
import { goToSub } from '@/utils/nav'
import { ShopList } from '@/api/index'
import { useOrderStore } from '@/stores'

const props = defineProps({
    product_id: {
        type: Number,
        require: true,
    }
});

const order = useOrderStore()
const shopInfo = ref(null)
console.log(props.product_id,'props.product_id')
// let paging = { page: 1, size: 20}
    // 适用门店
    ShopList({product_id:props.product_id,  page: 1, size: 1}).then(res=>{
        if(res&&res.data){ 
            if(res.data.length>0){
                shopInfo.value = {
                    ...res.data[0],
                    shopLen: res.data.length,
                    // store_id: props.store_id,
                }
                  console.log(shopInfo.value)
                order.setShopList(res.data)
            }
        }
    })

</script>

<style lang="scss">
.stores{
    width: 355px;
    display: flex;
    margin: 0 auto 8px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 12px 5px 13px;
    flex-direction: column;
    .BoxCard{
            display: flex;
            align-items: center;
    }
    .topstate{
            padding: 0px 5px;
            margin-bottom: 6px;
    }
    .title{
        font-size: 15px;
        font-weight: 700;
        color: #000000;
    }
    .s_store{
        font-size: 13px;
        color: #666666;
        .nut-icon {
            font-size: 12px;
            margin-top: 1px;
        }
    }
    .pic{
        border-radius: 5px;
        background-color: #ccc;
        position: relative;
        margin-right: 8px;
        width: 54px;
        height: 54px;
        align-self: flex-start;
    }
    .info{
        flex: 1;
    }
    .range{
        font-size: 15px;
        color: #333333;
        font-weight: 700;
    }
    .tagRow{
        flex-wrap: wrap;
        // margin: 5px 0;
    }
    .tag{
        padding: 0px 5px;
        border: solid 0.5px  #E2E0E1;
        margin: 5px 6px 0 0;
        font-size: 9px;
        color: #666666;
        flex-wrap: wrap;
        border-radius: 2.5px;
        height: 16px;
        &:last-child{
            margin-right: 0!important;
        }
    }
    .position{
        font-size: 12px;
        color: #444444;
        margin-top: 5px;
    }
    .location{
        margin-top: 8px;
        display: flex;
        .address{
            font-size: 12px;
            color: #444444;
            font-weight: 500;
            margin-top: 2px;
        }
    }
}
</style>