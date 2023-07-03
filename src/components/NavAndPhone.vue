<template>
<view class="navAndPhone flex">
    <view class="item" @click="goToSub(`credentials/index?shop_id=${shop_id}`)">
        <view class="fcenter">
            <cdn-img src="/static/img/icon/aptitude.png" class="icon" mode="aspectFit"/>
        </view>
        <view class="name">资质</view>
    </view>
    <view class="item">
        <view class="fcenter" @click="makePhoneCall({phoneNumber: phone})">
            <IconFont font-class-name="iconfont" class-prefix="icon" name="phone"/>
        </view>
        <view class="name">电话</view>
    </view>
</view>
</template>

<script setup>
import { IconFont } from '@nutui/icons-vue-taro';
import { openLocation, makePhoneCall } from '@tarojs/taro'
import { goToSub } from '@/utils/nav'

const props = defineProps({
    phone: {
        type: String,
        default: '',
    },
    address: {
        type: Object,
        default: {
            lat: '',
            lng: '',
        }
    },
    shop_id:{
        type:String,
        default: '',
    }
});
// console.log(shop_id,'shop_id')

function viewLocation(){
    const { lat, lng } = props.address
    openLocation({
        latitude: Number(lat),
        longitude: Number(lng),
        success: function () {
            console.log('success');
        }
    });
}
</script>

<style lang="scss">
.navAndPhone{
    .item{
        width: 23px;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .name{
        font-size: 10px;
        color: #666;
        margin-top: 3px;
    }
    .fcenter{
        background-color: #FFF7ED;
        border-radius: 50%;
        overflow: hidden;
        width: 23px;
        height: 23px;
    }
    .iconfont{
        color: #f0d5b5;
        font-size: 14px;
    }
    .imgBox .cdn, .imgBox .placeholder, .imgBox .cdn, .imgBox .placeholder{
        width: 20px;
        height: 20px;
    }
}
</style>