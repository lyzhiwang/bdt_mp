<template>
<SafeAreaView class="page2 refundPage">
    <BuyCard :data="orderInfo"/>
    <view class="msg_info block">
        <view class="message"  @click="showRound = true">
            <view>退款原因</view>
            <view class="region">
                 <nut-cell :title="form.radioVal ? form.radioVal : defautSex" ></nut-cell>
                <Right />
            </view>
        </view>
        <view class="message">
            <view>退款份数</view>
            <!-- <text>{{ orderInfo.can_number }}</text> -->
            <nut-input-number v-model="form.number" input-width="15" :max="orderInfo.can_number"/>
        </view>
        <view class="message">
            <view>退款金额</view>
            <!-- <view class="money">￥{{ orderInfo.unit_price*form.number}}</view> -->
            <view class="money">￥{{ orderInfo.total_price }}</view>
        </view>
        <view class="message">
            <view>退款方式</view>
            <view>原路退回</view>
        </view>
        <view class="message tips"> 仅退还您实际支付的金额，具体以退款结果为准。</view>
    </view>
    <!-- 退款原因 -->
    <!-- <view class="msg_info block"> 
        <view class="h3">退款原因</view>
        <nut-radio-group v-model="form.radioVal" text-position="left" @change="radioChange">
            <nut-radio :label="item.id" v-for="item in reason" :key="item.id">
                <text>{{ item.text }}</text>
                <template #checkedIcon><Success/></template>
                <template #icon> <Check-normal color="#D5D5D5"/> </template>
            </nut-radio>
        </nut-radio-group>
    </view> -->
    <!-- 退款说明 -->
    <view class="msg_info block" >
        <view class="h3">退款说明</view>
        <!-- <nut-textarea v-model="form.refund_desc" placeholder="请输入退款说明" /> -->
        <TextareaBox class="desc" v-model="form.refund_desc" placeholder="请输入退款说明" :cursor-spacing="11"/>
    </view>
    <!-- 按钮 -->
    <view class="btn">
        <view class="tip"><view class="etc">*</view>申请退款后不可撤销，退款成功后款项原路退回。</view>
        <view class="btn-blue4 bot fcenter" @click="baseClick">申请退款</view>
    </view>
    <nut-popup position="bottom"  round  v-model:visible="showRound">
            <view class="msg_info block"> 
                <view class="h3 cause">退款原因</view>
                <nut-radio-group v-model="form.radioVal" text-position="left" @change="radioChange(item)">
                    <nut-radio :label="item.text" v-for="item in reason" :key="item.id">
                        <text>{{ item.text }}</text>
                        <template #checkedIcon><Success/></template>
                        <template #icon> <Check-normal color="#D5D5D5"/> </template>
                    </nut-radio>
                    <view class="btn-blue4 bot fcenter" @click="showRound = false">确定</view>
                </nut-radio-group>
            </view>
        </nut-popup> 
</SafeAreaView>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { Success, CheckNormal, Right } from '@nutui/icons-vue-taro';
import { useLoad, showToast, showModal } from '@tarojs/taro'

// import { reactive, toRefs } from 'vue';
import { redirectTo } from '@/router'
import "./index.scss";

const form = reactive({
    number: 1,
    radioVal: 0,
    refund_desc: '',
})
const orderInfo = ref({can_number:'1',total_price:'0.99'}) // 订单详情

const showRound = ref(false)
const defautSex = '至少选择一项'
const pickerSex = ref([])
const reason = [
    {id: 1, text: '预约问题'},
    {id: 2, text: '不需要了，没时间消费'},
    {id: 3, text: '价格不划算'},
    {id: 4, text: '商家服务不满意'},
    {id: 5, text: '买多了'},
    {id: 6, text: '更多原因'},
]

function radioChange(item){
    console.log(item,form.radioVal,'item')
    // form.refund_desc = '';
}
function baseClick(){
    if(!form.radioVal) return showToast({title: '退款原因还未选择', icon: 'none', duration: 2000})
    if(!form.refund_desc) return showToast({title: '退款说明还未填写', icon: 'none', duration: 2000})
    showModal({
        title: '申请退款',
        content: '退款申请一旦提交，将不能撤销， 是否确认继续退款？',
        confirmTextL: '确认退款',
        success: function (res) {
            if (res.confirm) {
                onOk()
            }
        }
    })
};
const confirmSex = ({ selectedValue, selectedOptions }) => {
    // 选择性别确认回调
    pickerSex.value = selectedOptions
    form.sex = selectedValue[0]
}
const onOk = () =>{
    // if(form.radioVal!=6){
    //     form.refund_desc = reason[form.radioVal-1].text
    // }
   
    // console.log(this.form,'form')
    console.log(form,'form')
    // refund({order_id: orderInfo.value.order_id, ...form}).then(res=>{
    //     if(res&&res.data){
    //         // navigateTo({ url: '/pagesub/results/index' })
    //         showToast({title: '退款申请提交成功', icon: 'success', duration: 2000})
    //         setTimeout(()=> redirectTo({url: '/pagesub/orders/index?type=3'}), 2000)
    //     }
    // })
}

useLoad((option) => {
    // getOrderShow({order_id: option.order_id}).then(res=>{
    //     if(res&&res.data){ 
    //         orderInfo.value = res.data
    //         form.number = orderInfo.value.can_number
    //     }
    // })
})
</script>
