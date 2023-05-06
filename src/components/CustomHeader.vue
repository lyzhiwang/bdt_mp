<template>
  <view :class="['CustomHeader',{'fixed': fixed}]" :style="{'background-color': bgColor}">
    <view class="statusBar" :style="{ height: config.statusBar + 'px' }"></view>
    <view class="capsule" :style="{ height: config.capsule + 'px' }" v-if="!onlyStatus">
      <!-- 插槽位置自定义 -->
      <slot name="capsule"></slot>
      <Left class="backBtn" @click="back" v-if="hasBack" color="#fff" />
    </view>
  </view>
  <!-- 占位 -->
  <view class="headerPlace" v-if="fixed&&hasPlaceholder" :style="{ height: (config.statusBar+config.capsule) + 'px' }"></view>
</template>

<script setup>
import { back } from '@/router'
import { Left } from '@nutui/icons-vue-taro';
import { useConfigStore } from "@/stores";
const config = useConfigStore();
const props = defineProps({
  bgColor: {
    type: String,
    defalut: 'transparent',
  },
  fixed: {
    type: Boolean,
    defalut: false,
  },
  hasBack: {
    type: Boolean,
    defalut: false,
  },
  hasPlaceholder: {
    type: Boolean,
    defalut: false,
  },
  onlyStatus: {
    type: Boolean,
    defalut: false,
  }
})
</script>
<style lang="scss">
.CustomHeader {
  width: 100%;
  &.fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    overflow: hidden;
  }
  .statusBar,
  .capsule {
    width: 100%;
  }
  .capsule{
    display: flex;
    align-items: center;
    position: relative;
  }
  .backBtn{
    width: 50px!important;
    height: 50px!important;
    font-size: 20px!important;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 2;
  }
}
.headerPlace{
  width: 100%;
}
</style>
