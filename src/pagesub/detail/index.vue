<template>
  <view class="page">
    <view class="content">
      <view class="swiperBox">
        <nut-swiper :init-page="1" :loop="true" auto-play="3000" @change="changeSwiper">
          <nut-swiper-item v-for="(item,index) in imgsList" :key="index">
            <cdn-img class="swiper-img" :src="item"/>
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

          <view class="btn">
            <cdn-img src="/static/img/detail/attention.png" class="attention"></cdn-img>
            关注抖音
          </view>
        </view>
      </view>

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

      <!-- 价格说明 -->
      <view class="outBox mt-10">
        <view class="goodsTitle">价格说明</view>
        <view class="price-des"><view class="circle"></view>划线价格</view>
        <view class="sub">本页面展示的商品信息来自卡惠生活，并由卡惠生活或间接合作第三方（具体以核销页面展示为准）为您提供核销服务。</view>
      </view>

    </view>
    <view class="footerBox safeArea">
      <view class="tabList">
        <view class="tabItem">
          <cdn-img src="/static/img/detail/home.png" class="t-icon"></cdn-img>
          <view>首页</view>
        </view>
        <view class="tabItem">
          <cdn-img src="/static/img/detail/mine.png" class="t-icon"></cdn-img>
          <view>我的</view>
        </view>
        <view class="tabItem">
          <cdn-img src="/static/img/detail/share.png" class="t-icon"></cdn-img>
          <view>分享</view>
        </view>
      </view>
      <view class="t-btn">立即抢购</view>
    </view>
  </view>
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'
  import "./index.scss";

  const imgsList = ref(['https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg', 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'])
  const current_swiper = ref(2)

  const changeSwiper = index =>{
    console.log('index',index)
    current_swiper.value = index+1
  }
</script>
