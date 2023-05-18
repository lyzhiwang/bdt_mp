<template>
    <view class="customer-tab-bar" :style="{'padding-bottom': `${config.safeAreaBot}px`}">
        <view class="tab" v-for="(item, i) in tabs" :key="item.icon" @click="tabSwitch(i)">
            <cdn-img :src="item.active" class="tabicon" mode="aspectFit" v-if="config.tabIndex===i"/>
            <cdn-img :src="item.unactive" class="tabicon" mode="aspectFit" v-else/>
            <view :class="['name', config.tabIndex===i ? 'a': 'ua']">{{item.title}}</view>
        </view>
    </view>
    <view class="tabBarholder"></view>
</template>

<script setup>
import { ref } from 'vue'
// import { switchTab } from '@/router'
import { switchTab } from '@tarojs/taro'
import { useConfigStore } from '@/stores'

const config = useConfigStore()

const tabs = ref([
    { title: '首页', icon: 'home', path: '/pages/home/index', active: '/static/tabBar/home_h.png', unactive: '/static/tabBar/home.png'},
    { title: '我的', icon: 'me', path: '/pages/ucenter/index' , active: '/static/tabBar/me_h.png', unactive: '/static/tabBar/me.png'}
])

const tabSwitch = (index) => {
    try {
        config.setSelecTab(index)
        const url = tabs.value[index].path
        switchTab({ url })
    } catch (error) {
        
    }
}
</script>

<style lang="scss">
.customer-tab-bar{
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    box-sizing: content-box;
    box-shadow: -1px 0 5px #E5E5E5;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    .tab{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .tabicon{
        width: 23px;
        height: 23px;
        transition: all 1s;
        .cdn{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        margin-top: 2px;
        font-size: 12px;
        color: #323333;
    }
}
.tabBarholder{
    width: 100%;
    height: 50px;
}
</style>