<template>
<view class="page2 loginPage fcenter">
    <cdn-img :src="config.sysinfo.logo" class="logo-box" mode="aspectFit"/>
    <view class="row"><text class="oemName">{{config.sysinfo.name}}</text>申请使用</view>
    <view class="power fcenter">
        <view class="g6">您的账号信息</view>
        <view v-if="step===1">（昵称，头像，地区及性别）</view>
        <view v-else>（手机号码）</view>
    </view>
    <nut-button type="primary" v-if="step===1" @click="wxLogin" class="btn auth">获取头像昵称</nut-button>
    <!-- 获取微信手机号 -->
    <nut-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn auth" v-else-if="step===2">授权手机号</nut-button>
    <!-- 返回 -->
    <nut-button plain type="primary" @click="back" class="btn back">取消登录</nut-button>
</view>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { showLoading, hideLoading, login, getUserInfo, showToast } from '@tarojs/taro'
import { useUserStore, useConfigStore } from "@/stores";
import { back, redirectTo, switchTab } from '@/router'
import { wxAuthLogin } from '@/api/index' 
import './login.scss'

definePageConfig({
    navigationStyle: 'default', // custom
})

const user = useUserStore()
const config = useConfigStore()
const step = ref(1)
let login_data = {}

function userInfoFun(parame){
    return getUserInfo({provider: 'weixin',withCredentials: true, ...parame});
    // return canIUse('getUserProfile')
    //     ? getUserProfile({desc: '用于完善账户信息', ...parame}) 
    //     : getUserInfo({provider: 'weixin', withCredentials: true, ...parame});
}

function wxLogin(){
    showLoading({title: '加载中', mask: true});
    login({
        provider: 'weixin',
        success : loginRes => {
            login_data.login_code = loginRes.code
            userInfoFun({
                success: infoRes => {
                    step.value = 2
                    login_data.login_iv = infoRes.iv;
                    login_data.login_encryptedData = infoRes.encryptedData;
                    const { nickName, avatarUrl } = infoRes.userInfo;
                    if(!user.info.avatarUrl&&!user.info.nickName){
                        user.setUserInfo({ nickName, avatarUrl });
                    }
                },
                fail(){
                    showToast({ title: '获取资料失败', icon: 'none', duration: 3000})
                },
                complete: hideLoading,
            })
        },
        fail: hideLoading,
    })
}
function getPhoneNumber(e){
    // 获取微信返回的数据，在传给后端
    const { code, encryptedData, iv } = e.detail;
    if(!code || !encryptedData || !iv) return showToast({ title: '获取手机号失败', icon: 'none', duration: 3000})
    wxAuthLogin({ ...login_data, code, encryptedData, iv } ).then(res=>{
        if(res.data){
            const { token, id } = res.data;
            user.setUserToken(token);
            user.setUserInfo({id});
            const url = user.beforeLoginUrl ? user.beforeLoginUrl : '/pages/ucenter/index';
            const path = url.split("?")[0]
            if(path !== '/pages/ucenter/index') user.getUserInfo()
            if(['/pages/home/index','/pages/ucenter/index','/pages/task/index'].indexOf(path)>-1){
                switchTab({ url })
            }else{
                redirectTo({ url })
            }
        }
    })
}
onBeforeUnmount(()=>{
    if(user.beforeLoginUrl) user.setBeforeLoginUrl('')
})
</script>
