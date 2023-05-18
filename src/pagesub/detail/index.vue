<template>
<SafeAreaView>
  <view class="page detailContent">
    <view class="content">
      <view class="swiperBox">
        <nut-swiper :init-page="1" :loop="true" auto-play="3000" @change="changeSwiper">
          <nut-swiper-item v-for="(item,index) in imgsList" :key="index">
            <cdn-img class="swiper-img" :src="item" mode="aspectFill"/>
          </nut-swiper-item>
          <template v-slot:page>
            <div class="pagination"> {{ current_swiper }}/{{imgsList.length>0?imgsList.length: 0 }} </div>
          </template>
        </nut-swiper>
      </view>

      <!-- 商品信息 -->
      <view class="outBox mt-10">
        <nut-ellipsis content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" rows="1" direction="end" class="goodsTitle" ></nut-ellipsis>
        <view class="goods-info">
          <view>
            <view class="priceBox">
              <view class="price">¥10.99</view>
              <view class="old_price">¥16.99</view>
              <view class="discount">8.5折</view>
            </view>
            <view class="text-sub">随时退 | 免预约 | 自动退</view>
          </view>

          <view class="btn" @click="focus">
            <cdn-img src="/static/img/detail/attention.png" class="attention"></cdn-img>
            关注抖音
          </view>
        </view>
      </view>
      <!-- 适用门店 -->
      <BuyDetail />
      <!-- 套餐详情 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">套餐详情</view>
        <view class="goodsSubTitle">超值套餐组合</view>
        <view class="item">
          <view class="leftBox">
            <view class="circle"></view>
            <view class="title">招牌豌杂小面<text class="dw">(1份)</text></view>
          </view>
          <view class="price">¥16</view>
        </view>
        <view class="item">
          <view class="leftBox">
            <view class="circle"></view>
            <view class="title">汽水<text class="dw">(1份)</text></view>
          </view>
          <view class="price">¥2</view>
        </view>
      </view>

      <!-- 图片详情 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">图片详情</view>
        <cdn-img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" class="detailImg"></cdn-img>
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
      <view class="t-btn" @click="goToSub('payment/index')">立即抢购</view>
    </SafeAreaView>
  </view>
</SafeAreaView>
</template>

<script setup>
  import { goToSub } from '@/utils/nav'
  import { ref, onBeforeMount } from 'vue'
  import "./index.scss";
  import { switchTab } from "@/router/index";

  const imgsList = ref(['https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg', 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'])
  const current_swiper = ref(2)
  const Instructions = ref({effective_time:'365',use_time:'全天',suit_range:'123',})   //使用须知

  const changeSwiper = index =>{
    console.log('index',index)
    current_swiper.value = index+1
  }

  const toHome = ()=>{
    switchTab({url: '/pages/home/index'})
  }

  const toMine = ()=>{
    switchTab({url: '/pages/ucenter/index'})
  }

  // 关注
  const focus = ()=>{

  }
</script>
<script>
export default {
  onShareAppMessage(res){ // 点击右上角转发
		console.log(111, res)
	}
}
</script>
