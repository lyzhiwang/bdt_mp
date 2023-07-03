<template>
<SafeAreaView>
  <view class="page detailContent" v-for="(item,index) in List">
    <view class="content">
      <view class="swiperBox">
        <nut-swiper :init-page="1" :loop="true" auto-play="3000" @change="changeSwiper">
          <nut-swiper-item v-for="(i,index) in item.image_list" :key="index">
            <cdn-img class="swiper-img" :src="i" mode="aspectFill"/>
          </nut-swiper-item>
          <template v-slot:page>
            <div class="pagination"> {{ current_swiper }}/{{item.image_list.length>0?item.image_list.length: 0 }} </div>
          </template>
        </nut-swiper>
      </view>

      <!-- 商品信息 -->
      <view class="outBox mt-10">
        <nut-ellipsis :content= item.product_name rows="1" direction="end" class="goodsTitle" ></nut-ellipsis>
        <view class="goods-info">
          <view>
            <view class="priceBox">
              <view class="price">¥{{ item.sku.actual_amount }}</view>
              <view class="old_price">¥{{ item.sku.origin_amount }}</view>
              <view class="discount">{{item.sku.discount}}折</view>
            </view>
            <view class="text-sub">随时退 | 免预约 | {{item.subtitle}}</view>
          </view>

          <view class="btn" @click="focus">
            <cdn-img src="/static/img/detail/attention.png" class="attention"></cdn-img>
            <view v-if="!followed">关注抖音</view>
            <view v-else>已关注</view>
          </view>
        </view>
      </view>
      <!-- 适用门店 -->
      <BuyDetail v-if="product_id" :product_id="product_id"/>
      <!-- 套餐详情 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">套餐详情</view>
        <view class="goodsSubTitle">超值套餐组合</view>
        <view  v-for="items in item.sku.commodity">
            <view class="">{{ items.group_name }}</view>
            <view v-for="detail in items.item_list" class="item">
                <view class="leftBox" >
                    <view class="circle"></view>
                    <view class="title" >{{ detail.name }}<text class="dw">({{detail.count}}{{ detail.unit}})</text></view>
                </view>
                <view class="price">¥{{ detail.price }}</view>
            </view>
        </view>
        <!-- <view class="item">
          <view class="leftBox">
            <view class="circle"></view>
            <view class="title">汽水<text class="dw">(1份)</text></view>
          </view>
          <view class="price">¥2</view>
        </view> -->
      </view>

      <!-- 图片详情 -->
      <view class="outBox mt-10" v-if="item.dishes_image_list || item.environment_image_list" >
        <view class="goodsTitle">图片详情</view>
        <cdn-img :src="item.dishes_image_list" class="detailImg" style="height: 175px;"></cdn-img>
         <view v-for="l in item.environment_image_list">
            <cdn-img :src="l" class="detailImg" style="height: 175px;"></cdn-img>
         </view>
      </view>

      <!-- 使用须知 -->
      <BuyNotice  :data="Instructions"/>

      <!-- 价格说明 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">价格说明</view>
        <view class="price-des"><view class="circle"></view>划线价格</view>
        <view class="sub">本页面展示的商品信息来自卡惠生活，并由卡惠生活或间接合作第三方（具体以核销页面展示为准）为您提供核销服务。</view>
      </view>

      <!-- 套餐推荐 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">套餐推荐</view>
        <view class="recList">
          <view class="recBox" v-for="i in 3">
            <cdn-img class="goodsImg" src="/static/img/home/hot-title.png" mode="aspectFill" lazyLoad/>
            <view class="recBoxInfo">
              <nut-ellipsis content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" rows="2" direction="end" class="goodsTitle" ></nut-ellipsis>
                <view class="recPriceBox">
                  <view class="recleftP">
                    <view class="price">¥10.99</view>
                    <view class="old_price">¥16.99</view>
                  </view> 
                  <view class="buyBtn">抢购</view>
                </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 评价 -->
      <view class="block evaluate">
        <view class="h3">用户评价</view>
        <view class="list" v-for="item in msgList" :key="item.id">
            <view class="user">
                <!-- <cdn-img :src="item.user.avatar" class="avatar" mode="aspectFill" lazyLoad/> -->
                <text class="name">{{ item.nickname }}</text>
            </view>
            <nut-ellipsis direction="end" :rows="2" expandText="展开" collapseText="收起" :content="item.content" ></nut-ellipsis>
            <view class="flex userShare" >
                <cdn-img v-for="img in item.image" :src="img" class="userShareImg" mode="aspectFill" lazyLoad/>
            </view>
            <view class="time">{{ item.created_at }}</view>
        </view>
        <!-- <ListStatus :listLen="msgList.length" :listStatus="listStatus" :page="page"/> -->
    </view>

      <view class="tabBarholder"></view>
    </view>
    <SafeAreaView class="footerBox">
      <view class="tabList">
        <view class="tabItem">
          <cdn-img src="/static/img/detail/home.png" class="t-icon" @click="toHome"></cdn-img>
          <view>首页</view>
        </view>
        <view class="tabItem">
          <cdn-img src="/static/img/detail/mine.png" class="t-icon" @click="toMine"></cdn-img>
          <view>我的</view>
        </view>
        <view class="tabItem">
          <button open-type="share" class="shareButton">00</button>
          <cdn-img src="/static/img/detail/share.png" class="t-icon"></cdn-img>
          <view open-type="share">分享</view>
        </view>
      </view>
      <view class="t-btn" @click="goToSub(`payment/index?id=${item.id}`)">立即抢购</view>
      <!-- <pay-button :goodsId="135" @click="goToSub(`payment/index?id=${item.id}`)"></pay-button> -->
    </SafeAreaView>
  </view>
</SafeAreaView>
</template>

<script setup>
  import { goToSub } from '@/utils/nav'
  import { ref, onBeforeMount } from 'vue'
  import "./index.scss";
  import { switchTab } from "@/router/index";
  import { useLoad } from '@tarojs/taro'
  import { getGoodListShow } from "@/api/index";


  const imgsList = ref(['https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg', 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'])
  const current_swiper = ref(2)
  const product_id = ref(null)
  const Instructions = ref(null)   //使用须知
  const goods = ref(null)
  const followed =ref(false)
  const msgList =ref([{nickname:'123',created_at:'2022.0.12'}])
  const changeSwiper = index =>{
    current_swiper.value = index+1
  }
  const List = ref([])
  const goodsId = ref(null)

  useLoad((option) => {
    getGoodListShow({id:option.id}).then(res=>{
                    if(res.meta){
                        last_page = res.meta.last_page
                    }
                    if(res.data){
                        List.value = List.value.concat(res.data)
                        const { use_date,suit_range,use_time,appointment,private_room,superimposed_discounts,free_pack,description_rich_text } = res.data
                        Instructions.value = { use_date,suit_range,use_time,appointment,private_room,superimposed_discounts,free_pack,description_rich_text }
                        goods.value = res.data
                        product_id.value = res.data.id
                        console.log(res.data,12,product_id.value)
                    }
                })
    })
  const toHome = ()=>{
    switchTab({url: '/pages/home/index'})
  }

  const toMine = ()=>{
    switchTab({url: '/pages/ucenter/index'})
  }

  // 关注
  const focus = ()=>{
    tt.openAwemeUserProfile({
  success: (res) => {
    console.log(res);
  },
});
  }
</script>
<script>
export default {
  onShareAppMessage(res){ // 点击右上角转发
		console.log(111, res)
	}
}
</script>
