<template>
<view class="goodsItem">
    <cdn-img :src="item.icon_path" class="pic" mode="aspectFill" :lazyLoad="true">
        <view class="endBox fcenter" v-if="flashSale||item.type===2">
            <text class="b">距结束</text>
            <nut-countdown :end-time="getTimeTemp(item.end_time)" ></nut-countdown>
        </view>
    </cdn-img>
    <view class="rightCon">
        <nut-ellipsis :content="item.title" :rows="2" class="gName"></nut-ellipsis>
        <view class="time vcenter">
            <text>周一至周日</text> 
            <Ask class="ask"/>
        </view>
        <view class="tagRow">
            <view class="vcenter">
                <Checked class="icon" color="#fe582a"/>
                <text>过期退</text>
            </view>
            <view class="vcenter">
                <Checked class="icon" color="#fe582a"/>
                <text>随时退</text>
            </view>
            <view class="vcenter">
                <Checked class="icon" color="#fe582a"/>
                <text>免预约</text>
            </view>
        </view>
        <!-- <view class="bot flex">
            <view>
                <text class="r unit" v-if="flashSale||item.type===2">秒杀</text>
                <text class="r unit">￥</text><text class="r price">{{ item.price }}</text>
			    <text class="origin">￥{{ item.original_price }}</text>
            </view>
            <view v-if="showBuyBtn">
                <view class="salesNum">已售{{ item.order_number }}</view>
                <nut-button shape="square" type="primary" class="buy" @click="goToDetail">抢购</nut-button>
            </view>
        </view> -->
    </view>
</view>
</template>

<script setup>
// import { reactive, onBeforeMount } from 'vue';
import { Ask, Checked } from '@nutui/icons-vue-taro';
import { getTimeTemp } from '@/utils/helper'
import { goToSub } from '@/utils/nav'

const props = defineProps({
    flashSale: {
        type: Boolean,
        default: false,
    },
    item: {
        type: Object,
        default: {},
    },
    store_id: {
        type: [String, Number],
    },
    showBuyBtn: {
        type: Boolean,
        default: true,
    }
});

function goToDetail(){
    const { activity_id, set_meal_id } = props.item
    return goToSub(`seller/detail?id=${activity_id}&meal_id=${set_meal_id}&store_id=${props.store_id}`)
}
</script>

<style lang="scss">
.goodsItem{
    margin: 10px 0;
    display: flex;
    .pic{
        width: 80px;
        height: 80px;
        border-radius: 4px;
        margin-right: 10px;
    }
    .rightCon{
        flex: 1;
    }
    .gName{
        color: #222;
        font-size: 14px;
        line-height: 23px;
        font-weight: 700;
        margin-bottom: 3px;
    }
    .tagRow {
        display: flex;
        font-size: 12px;
        color: #666;
        .vcenter{
            margin-right: 20px;
        }
        .icon{
            font-size: 14px;
            margin-right: 4px;
        }
    }
    .origin{
        font-size: 10px;
        color: #808080;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .unit{
        font-size: 12px;
    }
    .price{
        font-weight: 700;
        font-size: 14px;
    }
    .bot{
        align-items: flex-end;
        justify-content: space-between;
    }
    .buy{
        width: 54px;
        height: 21px;
        border-radius: 2.5px;
        font-size: 11px;
        padding: 0;
    }
    .salesNum{
        font-size: 10px;
        color: #999;
        margin-bottom: 4px;
        text-align: center;
    }
    .endBox{
        width: 80px;
        height: 18px;
        background-image: linear-gradient(to right,#FF1D42,#ff3463);
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 9px;
        color: #FFF;
        .b{
            font-weight: 700;
            margin-right: 4px;
        }
        .nut-countdown__content{
            font-size: 9px;
        }
    }
    .time{
        font-size: 12px;
        color: #666;
        .ask{
            margin-left: 3px;
            font-size: 12px;
        }
    }
}
</style>