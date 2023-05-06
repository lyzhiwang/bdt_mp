<template>
    <view class="customer-tab-bar">
        <view class="tab" v-for="(item, i) in tabs" :key="item.icon" @click="tabSwitch(i)">
            <cdn-img :src="item.active" class="tabicon" mode="aspectFit" v-if="config.tabIndex===i"/>
            <cdn-img :src="item.unactive" class="tabicon" mode="aspectFit" v-else/>
            <view :class="['name', config.tabIndex===i ? 'a': 'ua']">{{item.title}}</view>
        </view>
    </view>
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
    height: 65px;
    background: #161616;
    display: flex;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    box-sizing: content-box;
    box-shadow: -1px 0 5px #E5E5E5;
    position: fixed;
    bottom: 0;
    left: 0;
    .tab{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .tabicon{
        width: 25px;
        height: 25px;
        .cdn{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        margin-top: 5px;
        font-size: 13px;
        &.ua{
            color: #999;
        }
        &.a{
            color: #fff;
        }
    }
}
</style>