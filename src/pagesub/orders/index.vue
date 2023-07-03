<template>
<SafeAreaView class="page myOrder">
    <nut-tabs title-scroll v-model="state.tab4value" name="tab4value">
        <nut-tab-pane v-for="item in tabs" :title="item.name" :key="item.id" :pane-key="item.id" class="tab">
            <template v-if="state.tab4value == item.id">
                <view class="starBoxCard" v-for="l in list" :key="l.id">   
                <view @click="goToSub('orders/detail')">
                    <view class="between topstate">
                        <view class="left">
                            <text class="text">{{ l.store_name }}</text>
                        </view>
                        <view :class="['status',{'red': [1,2].indexOf(l.status)===1}]">{{status[l.status]}}</view>
                    </view>
                    <view class="cardBoxInfo">
                        <view class="flex price_t">
                            <cdn-img src="src"  class="pic" mode="aspectFill" lazyLoad/> 
                            <view class="info">
                                <view class="s_title">{{ l.title }}</view>
                                <view class="money">
                                    <view class="prices">￥10.99</view>
                                    <view class="number">x1</view>
                                </view>
                            </view>
                        </view>
                        <view class="time">
                                <view class="order_time">订单时间：2022-12-02   14:20:18</view>
                                <view class="price">合计<span class="span">￥10.99</span></view>
                        </view>
                    </view>
                </view>
                <view class="bottom">
                    <view  class="btn fcenter" @click="goToSub('appraise/index')">去评价</view>
                </view>
            </view>
            </template>
        </nut-tab-pane>
    </nut-tabs>
</SafeAreaView>
</template>
    
<script setup>
import { ref, reactive } from 'vue'
// import { Right } from '@nutui/icons-vue-taro';
import { useReachBottom, useLoad } from '@tarojs/taro'
// import { getOrder } from "@/api/index";
// import { useOrderStore } from '@/stores'
import { goToSub } from '@/utils/nav'
import "./index.scss";
// const order = useOrderStore()
const state = reactive({
    tab4value: 0,
});
const status = { 1:'已完成', 2:'待付款' , 3:'待使用' ,4:'已退款', }
const tabs = [
    {id: 0, name: '全部'},
    {id: 1, name: '待付款'},
    {id: 2, name: '待使用'},
    {id: 3, name: '退款/售后'}, 
]
const list = ref([
    {store_name:'重庆小面（纱厂路店）',status:'1',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    {store_name:'重庆小面（纱厂路店）',status:'2',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    {store_name:'重庆小面（纱厂路店）',status:'3',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    {store_name:'重庆小面（纱厂路店）',status:'4',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    
])
const listStatus = ref('loadmore')
const page = ref(1)
let last_page = 1
let paging = { page: 1, size: 20}

function queryList(){
    paging = {page: page.value, size: 20}
    paging.type = state.tab4value==0 ? null : state.tab4value
    // getOrder(paging).then(res=>{
    //     if(res.meta){
    //         last_page = res.meta.last_page
    //     }
    //     if(res.data){
    //         list.value = list.value.concat(res.data)
    //     }
    // })
}

useLoad((option) => {
    if(option&&option.type){
        // paging.type = option.type
        // state.tab4value = Number(option.type)
    }
    queryList()
})

// function changeTab(tab){
//     const id = Number(tab.paneKey)
//     // tab切换重新请求数据
//     if(paging.type==id) return
//     list.value = []
//     page.value = 1
//     queryList()
// }

// function buyAgain(item){ //再次购买
//     const { activity_id, set_meal_id, store_id } = item;
//     // 套餐详情
//     bundleDetail({activity_id, set_meal_id}).then(res=>{
//         if(res&&res.data){ 
//             const { store_name, title, type, end_time, holiday_currency, exempt_reservation, price, original_price, order_number, icon_path, limit } = res.data
//             // 订单确认界面需要的数据
//             order.setOrderInfo({ store_name, title, type, end_time, holiday_currency, exempt_reservation, price, original_price, order_number,store_id, activity_id, set_meal_id, icon_path, limit })
//             goToSub('orders/payment')
//         }
//     })
// }

useReachBottom(() => {
    // 触底加载更多
    if(page.value >= last_page) return listStatus.value = 'nomore';
    listStatus.value = 'loading'
    console.log('useReachBottom')
    if(page.value < last_page){
        page.value++
        // queryList()
    }
})
</script>
    