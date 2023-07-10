<template>
    <view class="BuyCard">
        <view class="starBoxCard" >  
           
            <cdn-img :src="data.img_url"  class="mealImg" mode="aspectFill"/>  
            <view class="BoxCard_info">
                <view class="s_title">{{ data.title }}</view>
                <view class="money">{{ data.date_rule }}</view>
                <view class="tagRow " v-for="item in data.labels">
                    <view class="tag"><Success  color="#fe7049"></Success>{{ item }}</view>
                </view>
            </view>
        </view>  
         </view>
</template>
<script setup>
import { Success } from '@nutui/icons-vue-taro';
const props = defineProps({
    data: {
        type: Object,
        require: {},
    },
    // type:{
    //     type: Number,
    //     default: 1,
    // }
});

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
        margin: 10px 0;
    }
        .s_title{
        font-size: 14px;
        color: #222222;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 238px;
    }
        .tagRow{
            // flex-wrap: wrap;
            display: inline-block;
            // margin: 6px 0;
            .tag{
                display: flex;
                margin: 0px 15px 0 0;
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                flex-wrap: wrap;
            }
        }
    }
}
 
    
</style>
