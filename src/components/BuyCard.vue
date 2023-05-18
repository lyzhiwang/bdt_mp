<template>
    <view class="BuyCard">
        <view class="starBoxCard" >   
            <cdn-img src="src"  class="mealImg" mode="aspectFill"/>  
            <view class="BoxCard_info">
                <view class="s_title">正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！</view>
                <view class="money">周一至周日</view>
                <view class="tagRow flex">
                    <view class="tag fcenter"><Success  color="#fe7049"></Success>过期退</view>
                    <view class="tag fcenter" ><Success  color="#fe7049"></Success>随时退</view>
                    <view class="tag fcenter"><Success  color="#fe7049"></Success>免预约</view>
                </view>
            </view>
        </view>  
         </view>
</template>
<script setup>
import { Success } from '@nutui/icons-vue-taro';
</script>
<style lang="scss">
.BuyCard{
    .starBoxCard{
        width: 355px;
        display: flex;
        margin: 10px auto 8px;
        background-color: #FFFFFF;
        border-radius: 10px;
        padding: 12px 5px 13px;
        align-items: center;
    }
    .mealImg {
        width: 71px;
        height: 71px;
        margin-right: 10px;
    }
    .BoxCard_info{
        flex: 1;
        height: 71px;
        .money{
        color: #666666;
        font-size: 12px;
        font-weight: 400;
    }
        .s_title{
        font-size: 14px;
        color: #222222;
        font-weight: 700;
    }
        .tagRow{
            flex-wrap: wrap;
            margin: 6px 0;
            .tag{
                margin: 2px 17px 0 0;
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                flex-wrap: wrap;
            }
        }
    }
}
 
    
</style>
