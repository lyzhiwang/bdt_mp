<template>
<view class="imgBox">
  <image
    v-if="src&&!fail"
    class="cdn"
    :mode="mode"
    :lazyLoad="lazyLoad"
    :showMenuByLongpress="showMenuByLongpress"
    :src="cdnUrl"
    @error="errorHandle"
  />
  <view v-else class="placeholder"></view>
  <!-- 默认插槽 -->
  <slot></slot>
</view>
</template>

<script setup>
import { ref, watch, inject, onBeforeMount } from "vue";

const props = defineProps({
  src: {
    type: [String],
    default: "",
  },
  mode: {
    type: String,
    default: "scaleToFill",
  },
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  showMenuByLongpress: {
    type: Boolean,
    default: false,
  }
});
const cdnUrl = ref("");
const cdn = inject("cdn");
const fail = ref(false);
async function getCdnUrl (newVal) {
  if (newVal.includes("http")) {
    cdnUrl.value = newVal;
  } else if (process.env.NODE_ENV === "development") {
    const img = await import("@/utils/img");
    cdnUrl.value = img.default[newVal];
  } else {
    // 拿到全局注入的cdn地址 拼接起来
    cdnUrl.value = cdn + newVal;
  }
}
onBeforeMount(() => {
  if (props.src) getCdnUrl(props.src);
});
watch(
  () => props.src,
  (src) => {
    getCdnUrl(src);
  }
);
function errorHandle(e){
  fail.value = true
}
</script>

<style lang="scss">
.imgBox{
  display: block;
  overflow: hidden;
  position: relative;
  .cdn,
  .placeholder {
    display: block;
    width: 100%;
    height: 100%;
  }
  .placeholder {
    background-color: #ccc;
  }
}
</style>
