<template>
<SafeAreaView class="page myOrder">
    <nut-tabs title-scroll v-model="state.tab4value" name="tab4value" @change="changeTab">
        <nut-tab-pane v-for="item in tabs" :title="item.name" :key="item.id" :pane-key="item.id" class="tab">
            <template v-if="state.tab4value == item.id">
                <view class="starBoxCard" v-for="l in list" :key="l.id">   
                <view @click="goToSub(`orders/detail?id=${l.id}`)">
                    <view class="between topstate">
                        <view class="left">
                            <text class="text">{{ l.goods.poi_name }}</text>
                        </view>
                        <!-- <view :class="['status',{'red': [1,2].indexOf(l.status)===1}]">{{status[l.status]}}</view> -->
                        <view class="status">{{ order_status[l.order_status] }}</view>
                    </view>
                    <view class="cardBoxInfo">
                        <view class="flex price_t">
                            <cdn-img :src="l.goods.img_url"  class="pic" mode="aspectFill" lazyLoad/> 
                            <view class="info">
                                <view class="s_title">{{ l.goods.title }}</view>
                                <view class="money">
                                    <view class="prices">￥{{ l. goods.price}}</view>
                                    <view class="number">x{{ l.goods.quantity }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="time">
                            <view class="order_time" v-if="l.deadline">截止时间：{{ l.deadline }}</view>
                            <view class="order_time" v-else>订单时间：{{ l.create_order_time }}</view>
                                <view class="price">合计<span class="span">￥{{ l. total_amount}}</span></view>
                        </view>
                       
                    </view>
                </view>
                <view class="bottom">
                    <view v-if="l.order_status === 'INIT'"  class="btn fcenter" @click="goToSub(`orders/detail?id=${l.id}`)">去付款</view>
                    <view v-if="l.order_status === 'SUCCESS'" class="btn fcenter" @click="goToSub(`orders/detail?id=${l.id}`)">去使用</view>
                    <!-- <view v-if="l.order_status === 'SUCCESS'" class="btn fcenter" @click="goToSub(`appraise/index?id=${l.id}`)">去评价</view> -->

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
import { getOrder } from "@/api/index";
// import { useOrderStore } from '@/stores'
import { goToSub } from '@/utils/nav'
import "./index.scss";
// const order = useOrderStore()
const state = reactive({
    tab4value: 0,
});
// const status = { 1:'已完成', 2:'待付款' , 3:'待使用' ,4:'已退款', }
const order_status = {INIT:'待付款',FAIL:'订单超时',SUCCESS:'待使用',REFUND_SUCCESS:'已退款'}


const tabs = [
    {id: 0,name:'全部'},
    {id: 1, name: '待付款'},
    {id: 2, name: '待使用'},
    {id: 3, name: '已完成'}, 
    {id: 4, name: '已退款'},
]
const list = ref([
    // {store_name:'重庆小面（纱厂路店）',status:'1',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    // {store_name:'重庆小面（纱厂路店）',status:'2',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    // {store_name:'重庆小面（纱厂路店）',status:'3',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    // {store_name:'重庆小面（纱厂路店）',status:'4',title:'正宗四川豌豆小面，唇齿留香，限量供应，卖完即止！'},
    
])
const listStatus = ref('loadmore')
const page = ref(1)
let last_page = ref(1)
let paging = { page: 1, size: 20,status:null}

function queryList(){
    // paging = {page: page.value, size: 20}
    paging.status = state.tab4value==0 ? null : state.tab4value
    getOrder(paging).then(res=>{
        if(res.meta){
            last_page = res.meta.last
        }
        if(res.data){
            list.value = list.value.concat(res.data)
        }
    })

}

useLoad((option) => {
    if(option&&option.status){
        paging.status = option.status
        state.tab4value = Number(option.status)
    }
    queryList()
})

function changeTab(tab){
    const id = Number(tab.paneKey)
    // tab切换重新请求数据
    if(paging.type==id) return
    list.value = []
    page.value = 1
    queryList()
}

// function buyAgain(item){ //再次购买
//     const { activity_id, set_meal_id, store_id } = item;
//     // 套餐详情
//     bundleDetail({activity_id, set_meal_id}).then(res=>{
//         if(res&&res.data){ 
//             const { store_name, title, status, end_time, holiday_currency, exempt_reservation, price, original_price, order_number, icon_path, limit } = res.data
//             // 订单确认界面需要的数据
//             order.setOrderInfo({ store_name, title, status, end_time, holiday_currency, exempt_reservation, price, original_price, order_number,store_id, activity_id, set_meal_id, icon_path, limit })
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
        queryList()
    }
})
</script>
    