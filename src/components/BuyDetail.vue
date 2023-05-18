<template>
<view class="stores" >
    <view class="between topstate" >
        <view class="left">
            <view class="h3">适用门店</view>
        </view>
        <view class="s_store fcenter" >全部门店<Right color="#666" /></view>
    </view>
    <view class="BoxCard">
        <cdn-img src="src"  class="pic" mode="aspectFill"/>  
        <view class="info">
            <view class="range ells">重庆小面（纱厂路店）</view>
            
            <view class="position ells"><Location2  color="#666"/>
                <text>西工区纱厂路245号1幢7层701</text>
            </view>
        </view>
        <NavAndPhone />
    </view>
</view>
</template>

<script setup>
import { ref, onBeforeMount  } from 'vue'
import { Location2, Right } from '@nutui/icons-vue-taro';
import { goToSub } from '@/utils/nav'
// import { shopList } from '@/api/index'
import { useOrderStore } from '@/stores'

const props = defineProps({
    activity_id: {
        type: [Number,String],
        require: true,
    }
});

const order = useOrderStore()
const shopInfo = ref(null)

onBeforeMount(()=>{
    // 适用门店
    // shopList(props.activity_id, { page: 1,size: 999}).then(res=>{
    //     if(res&&res.data){ 
    //         if(res.data.length>0){
    //             shopInfo.value = {
    //                 ...res.data[0],
    //                 shopLen: res.data.length,
    //                 // store_id: props.store_id,
    //             }
    //             order.setShopList(res.data)
    //         }
    //     }
    // })
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
        font-size: 13px;
        color: #333333;
        font-weight: 600;
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
    .Location{
        margin-top: 2px;
        color: #f0d5b5;
    }
}
</style>